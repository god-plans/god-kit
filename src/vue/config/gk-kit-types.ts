import type { Component, ComputedRef, Ref } from 'vue'

/** Theme mode: `system` follows `prefers-color-scheme`. */
export type GkThemeBuiltinName = 'light' | 'dark' | 'system' | 'ocean' | 'highContrast'
export type GkThemeCustomName = string & {}
export type GkThemeName = GkThemeBuiltinName | GkThemeCustomName
export type GkResolvedThemeName = Exclude<GkThemeBuiltinName, 'system'> | GkThemeCustomName

export type GkThemeTokenOverrides = Record<`--${string}`, string>

export interface GkThemeDefinition {
  /** Unique registry key, written to `data-gk-theme` when active. */
  name: GkResolvedThemeName
  /** Optional parent theme name this definition semantically extends. */
  extends?: GkResolvedThemeName
  /**
   * Optional CSS variable overrides applied inline to the theme root.
   * Enables TS-driven theme values while still allowing CSS-file overrides.
   */
  tokens?: GkThemeTokenOverrides
  /** Optional dark flag used for helper classes and `isDark`. */
  isDark?: boolean
}

export interface GkKitThemeOptions {
  /** Initial theme (default `light`) */
  defaultTheme?: GkThemeName
  /**
   * Root element for `data-gk-theme` (default `document.documentElement`).
   * Use for micro-frontends or scoped document roots.
   */
  scope?: HTMLElement | null | (() => HTMLElement | null)
  /**
   * Additional named themes merged with built-in presets.
   * Keys are used as theme names in `change()` and `data-gk-theme`.
   */
  themes?: Record<string, Omit<GkThemeDefinition, 'name'>>
  /**
   * Include shipped presets in registry. Defaults to true.
   * Current presets: `ocean`, `highContrast`.
   */
  includePresets?: boolean
}

export type GkDisplayBreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/** Pixel lower bounds for named breakpoints (Vuetify-style). */
export interface GkDisplayThresholds {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export interface GkKitDisplayOptions {
  /**
   * Viewport width strictly below this threshold counts as mobile
   * (default `md` → &lt; 960px, matching legacy `max-width: 959px`).
   */
  mobileBreakpoint?: GkDisplayBreakpointName | number
  /** Override default breakpoint pixel values */
  thresholds?: Partial<GkDisplayThresholds>
}

/** Merged display config after `createGkKit` */
export type GkDisplayResolvedConfig = GkDisplayThresholds & {
  mobileBreakpoint: GkDisplayBreakpointName | number
}

export type GkLocaleMessages = Record<string, string>

export interface GkKitLocaleOptions {
  locale?: string
  fallback?: string
  /** Map locale code → flat key → message */
  messages?: Record<string, GkLocaleMessages>
}

/** Preset for `GkInput`, `GkSelect` (with string `size`), `GkTextarea`, and related controls */
export const GK_FORM_CONTROL_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type GkFormControlSize = (typeof GK_FORM_CONTROL_SIZES)[number]

export interface GkKitFormOptions {
  /**
   * Default control scale for the app (`GkFormControlsProvider` and per-component
   * `useGkDefaults` can override; explicit `size` on a control wins).
   */
  defaultControlSize?: GkFormControlSize
}

/** Flat component defaults: `GkButton` → prop defaults */
export type GkKitComponentDefaults = Record<string, Record<string, unknown>>

export interface GkKitOptions {
  theme?: GkKitThemeOptions
  display?: GkKitDisplayOptions
  locale?: GkKitLocaleOptions
  /** Form control defaults (see `defaultControlSize` in `GkKitFormOptions`) */
  form?: GkKitFormOptions
  /** Global defaults merged with per-component keys */
  defaults?: GkKitComponentDefaults
  /**
   * Register component aliases at install.
   * Pass a component, or `{ extends, defaults }` to wrap with default props.
   */
  aliases?: GkKitAliases
}

export type GkKitAliasEntry = {
  extends: Component
  defaults?: Record<string, unknown>
}

export type GkKitAliases = Record<string, Component | GkKitAliasEntry>

/** Injected theme API from `createGkKit` / `useGkTheme` */
export type GkThemeContext = {
  name: Ref<GkThemeName>
  /** Concrete active theme name (never `system`). */
  resolved: ComputedRef<GkResolvedThemeName>
  isDark: ComputedRef<boolean>
  change: (name: GkThemeName) => void
  toggle: () => void
  cycle: (names?: GkThemeName[]) => void
  /** Runtime theme registry helpers. */
  themes: ComputedRef<Record<string, GkThemeDefinition>>
  hasTheme: (name: string) => boolean
  registerTheme: (name: string, definition: Omit<GkThemeDefinition, 'name'>) => void
  registerThemes: (themes: Record<string, Omit<GkThemeDefinition, 'name'>>) => void
  unregisterTheme: (name: string) => void
}

/** Injected locale API */
export type GkLocaleContext = {
  locale: Ref<string>
  fallback: Ref<string>
  t: (key: string, params?: Record<string, string | number>) => string
}

/** Merged defaults map (global + optional provider layers) */
export type GkDefaultsInjected = ComputedRef<GkKitComponentDefaults>
