import {
  computed,
  getCurrentInstance,
  inject,
  onUnmounted,
  shallowRef,
  ref,
  watchEffect,
} from 'vue'
import type { ComputedRef } from 'vue'
import type {
  GkKitThemeOptions,
  GkResolvedThemeName,
  GkThemeContext,
  GkThemeDefinition,
  GkThemeName,
} from '../config/gk-kit-types'
import { GK_THEME } from '../../injection'

const defaultCycle: GkThemeName[] = ['light', 'dark', 'ocean', 'highContrast', 'system']
const inlineTokenAttr = 'data-gk-theme-inline-tokens'

function normalizeThemeDefinition(
  name: string,
  definition: Omit<GkThemeDefinition, 'name'> | undefined
): GkThemeDefinition {
  return {
    name: name as GkResolvedThemeName,
    extends: definition?.extends,
    tokens: definition?.tokens,
    isDark: definition?.isDark,
  }
}

export function createBuiltinGkThemeRegistry(): Record<string, GkThemeDefinition> {
  return {
    light: normalizeThemeDefinition('light', { isDark: false }),
    dark: normalizeThemeDefinition('dark', { isDark: true }),
    ocean: normalizeThemeDefinition('ocean', {
      extends: 'light',
      isDark: false,
      tokens: {
        '--gk-color-primary': '#0ea5e9',
        '--gk-color-primary-hover': '#0284c7',
        '--gk-color-primary-active': '#0369a1',
        '--gk-color-focus-ring': 'rgba(14, 165, 233, 0.45)',
        '--gk-tabs-slider-color': '#0ea5e9',
      },
    }),
    highContrast: normalizeThemeDefinition('highContrast', {
      extends: 'dark',
      isDark: true,
      tokens: {
        '--gk-color-bg': '#000000',
        '--gk-color-surface': '#000000',
        '--gk-color-surface-elevated': '#0d0d0d',
        '--gk-color-border': '#ffffff',
        '--gk-color-border-strong': '#ffffff',
        '--gk-color-text': '#ffffff',
        '--gk-color-on-surface': '#ffffff',
        '--gk-color-on-surface-muted': '#f5f5f5',
        '--gk-color-text-muted': '#f5f5f5',
        '--gk-color-text-disabled': '#d1d5db',
        '--gk-color-primary': '#38bdf8',
        '--gk-color-primary-hover': '#7dd3fc',
        '--gk-color-primary-active': '#0ea5e9',
        '--gk-color-focus-ring': 'rgba(255, 255, 255, 0.95)',
        '--gk-color-danger': '#fca5a5',
        '--gk-color-danger-surface': '#450a0a',
        '--gk-color-success': '#86efac',
        '--gk-color-success-surface': '#052e16',
        '--gk-color-info': '#93c5fd',
        '--gk-color-info-surface': '#172554',
        '--gk-color-warning': '#fcd34d',
        '--gk-color-warning-surface': '#451a03',
        '--gk-overlay-scrim': 'rgba(0, 0, 0, 0.82)',
        '--gk-tabs-inset-selected-bg': 'rgba(56, 189, 248, 0.22)',
        '--gk-tabs-slider-color': '#38bdf8',
      },
    }),
  }
}

function getSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function isGkThemeDarkName(
  name: string,
  themes: Record<string, GkThemeDefinition>
): boolean {
  const current = themes[name]
  if (!current) return name === 'dark' || name === 'highContrast'
  if (typeof current.isDark === 'boolean') return current.isDark
  if (current.extends && current.extends !== name) return isGkThemeDarkName(current.extends, themes)
  return name === 'dark' || name === 'highContrast'
}

function resolveThemeName(
  name: GkThemeName,
  systemDark: boolean,
  themes: Record<string, GkThemeDefinition>
): GkResolvedThemeName {
  if (name === 'system') {
    if (systemDark && themes.dark) return 'dark'
    if (!systemDark && themes.light) return 'light'
    return (systemDark ? 'dark' : 'light') as GkResolvedThemeName
  }
  return name as GkResolvedThemeName
}

function getThemeRoot(scope?: HTMLElement | null | (() => HTMLElement | null)): HTMLElement | null {
  if (typeof scope === 'function') return scope()
  if (scope !== undefined) return scope
  if (typeof document !== 'undefined') return document.documentElement
  return null
}

function resolveThemeTokens(
  name: string,
  themes: Record<string, GkThemeDefinition>,
  seen = new Set<string>()
): Record<string, string> {
  if (seen.has(name)) return {}
  seen.add(name)
  const definition = themes[name]
  if (!definition) return {}
  const parentTokens = definition.extends ? resolveThemeTokens(definition.extends, themes, seen) : {}
  return {
    ...parentTokens,
    ...(definition.tokens ?? {}),
  }
}

function clearInlineThemeTokens(root: HTMLElement): void {
  const prev = root.getAttribute(inlineTokenAttr)
  if (!prev) return
  for (const name of prev.split(',').map((x) => x.trim()).filter(Boolean)) {
    root.style.removeProperty(name)
  }
  root.removeAttribute(inlineTokenAttr)
}

function applyInlineThemeTokens(root: HTMLElement, tokens: Record<string, string>): void {
  clearInlineThemeTokens(root)
  const names = Object.keys(tokens).filter((name) => name.startsWith('--'))
  for (const name of names) {
    root.style.setProperty(name, tokens[name]!)
  }
  if (names.length) {
    root.setAttribute(inlineTokenAttr, names.join(','))
  }
}

function applyThemeDom(
  resolved: GkResolvedThemeName,
  root: HTMLElement | null,
  themes: Record<string, GkThemeDefinition>
): void {
  if (!root) return
  root.setAttribute('data-gk-theme', resolved)
  if (isGkThemeDarkName(resolved, themes)) {
    root.classList.add('gk-theme-dark')
  } else {
    root.classList.remove('gk-theme-dark')
  }
  applyInlineThemeTokens(root, resolveThemeTokens(resolved, themes))
}

function createLocalThemeContext(
  initial: GkThemeName,
  options: GkKitThemeOptions = {}
): GkThemeContext {
  const builtins = createBuiltinGkThemeRegistry()
  const includePresets = options.includePresets !== false
  const initialThemes: Record<string, GkThemeDefinition> = {
    light: builtins.light,
    dark: builtins.dark,
    ...(includePresets ? { ocean: builtins.ocean, highContrast: builtins.highContrast } : {}),
  }
  if (options.themes) {
    for (const [name, definition] of Object.entries(options.themes)) {
      initialThemes[name] = normalizeThemeDefinition(name, definition)
    }
  }

  const themesRef = shallowRef<Record<string, GkThemeDefinition>>(initialThemes)
  const name = ref<GkThemeName>(initial)
  const systemDark = shallowRef(getSystemDark())

  let media: MediaQueryList | null = null
  const onSystemChange = () => {
    systemDark.value = getSystemDark()
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onSystemChange)
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      media?.removeEventListener('change', onSystemChange)
    })
  }

  const resolved = computed(() => resolveThemeName(name.value, systemDark.value, themesRef.value))

  const isDark = computed(() => isGkThemeDarkName(resolved.value, themesRef.value))
  const themeRoot = () => options.scope

  watchEffect(() => {
    applyThemeDom(resolved.value, getThemeRoot(themeRoot()), themesRef.value)
  })

  const change = (next: GkThemeName) => {
    name.value = next
  }

  const toggle = () => {
    const r = resolved.value
    name.value = r === 'dark' ? 'light' : 'dark'
  }

  const cycle = (names: GkThemeName[] = defaultCycle) => {
    const usable = names.filter((candidate) => candidate === 'system' || !!themesRef.value[candidate])
    if (!usable.length) return
    const i = usable.indexOf(name.value)
    name.value = usable[(i + 1) % usable.length]!
  }

  const hasTheme = (themeName: string) => !!themesRef.value[themeName]

  const registerTheme = (themeName: string, definition: Omit<GkThemeDefinition, 'name'>) => {
    themesRef.value = {
      ...themesRef.value,
      [themeName]: normalizeThemeDefinition(themeName, definition),
    }
  }

  const registerThemes = (themes: Record<string, Omit<GkThemeDefinition, 'name'>>) => {
    let next = themesRef.value
    for (const [themeName, definition] of Object.entries(themes)) {
      next = {
        ...next,
        [themeName]: normalizeThemeDefinition(themeName, definition),
      }
    }
    themesRef.value = next
  }

  const unregisterTheme = (themeName: string) => {
    if (themeName === 'light' || themeName === 'dark') return
    const { [themeName]: _removed, ...rest } = themesRef.value
    themesRef.value = rest
  }

  return {
    name,
    resolved: resolved as ComputedRef<GkResolvedThemeName>,
    isDark,
    change,
    toggle,
    cycle,
    themes: computed(() => themesRef.value),
    hasTheme,
    registerTheme,
    registerThemes,
    unregisterTheme,
  }
}

/**
 * Global theme API. Prefer registering **`createGkKit`** once; without it, uses local state
 * and syncs **`document.documentElement`** when possible.
 */
export function useGkTheme(): GkThemeContext {
  const injected = inject(GK_THEME, null)
  if (injected) return injected
  return createLocalThemeContext('light')
}

export function createGkThemeContextForKit(
  options: GkKitThemeOptions = {}
): GkThemeContext {
  return createLocalThemeContext(options.defaultTheme ?? 'light', options)
}
