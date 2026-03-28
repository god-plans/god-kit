import {
  computed,
  getCurrentInstance,
  inject,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import type { ComputedRef } from 'vue'
import type { GkThemeContext, GkThemeName } from '../config/gk-kit-types'
import { GK_THEME } from '../../injection'

const defaultCycle: GkThemeName[] = ['light', 'dark', 'system']

function getSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveThemeName(name: GkThemeName, systemDark: boolean): 'light' | 'dark' {
  if (name === 'system') return systemDark ? 'dark' : 'light'
  return name === 'dark' ? 'dark' : 'light'
}

function getThemeRoot(scope?: HTMLElement | null | (() => HTMLElement | null)): HTMLElement | null {
  if (typeof scope === 'function') return scope()
  if (scope !== undefined) return scope
  if (typeof document !== 'undefined') return document.documentElement
  return null
}

function applyThemeDom(resolved: 'light' | 'dark', root: HTMLElement | null): void {
  if (!root) return
  root.setAttribute('data-gk-theme', resolved)
  if (resolved === 'dark') {
    root.classList.add('gk-theme-dark')
  } else {
    root.classList.remove('gk-theme-dark')
  }
}

function createLocalThemeContext(
  initial: GkThemeName,
  themeRoot: HTMLElement | null | (() => HTMLElement | null) | undefined
): GkThemeContext {
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

  const resolved = computed(() => resolveThemeName(name.value, systemDark.value))

  const isDark = computed(() => resolved.value === 'dark')

  watch(
    [resolved, () => themeRoot],
    () => {
      applyThemeDom(resolved.value, getThemeRoot(themeRoot))
    },
    { immediate: true }
  )

  const change = (next: GkThemeName) => {
    name.value = next
  }

  const toggle = () => {
    const r = resolved.value
    name.value = r === 'dark' ? 'light' : 'dark'
  }

  const cycle = (names: GkThemeName[] = defaultCycle) => {
    const i = names.indexOf(name.value)
    name.value = names[(i + 1) % names.length]!
  }

  return {
    name,
    resolved: resolved as ComputedRef<'light' | 'dark'>,
    isDark,
    change,
    toggle,
    cycle,
  }
}

/**
 * Global theme API. Prefer registering **`createGkKit`** once; without it, uses local state
 * and syncs **`document.documentElement`** when possible.
 */
export function useGkTheme(): GkThemeContext {
  const injected = inject(GK_THEME, null)
  if (injected) return injected
  return createLocalThemeContext('light', undefined)
}

export function createGkThemeContextForKit(
  initial: GkThemeName,
  themeRoot: HTMLElement | null | (() => HTMLElement | null) | undefined
): GkThemeContext {
  return createLocalThemeContext(initial, themeRoot)
}
