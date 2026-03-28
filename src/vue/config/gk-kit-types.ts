import type { Component, ComputedRef, Ref } from 'vue'

/** Theme mode: `system` follows `prefers-color-scheme`. */
export type GkThemeName = 'light' | 'dark' | 'system'

export interface GkKitThemeOptions {
  /** Initial theme (default `light`) */
  defaultTheme?: GkThemeName
  /**
   * Root element for `data-gk-theme` (default `document.documentElement`).
   * Use for micro-frontends or scoped document roots.
   */
  scope?: HTMLElement | null | (() => HTMLElement | null)
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

/** Flat component defaults: `GkButton` → prop defaults */
export type GkKitComponentDefaults = Record<string, Record<string, unknown>>

export interface GkKitOptions {
  theme?: GkKitThemeOptions
  display?: GkKitDisplayOptions
  locale?: GkKitLocaleOptions
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
  /** Always `light` or `dark` (never `system`) */
  resolved: ComputedRef<'light' | 'dark'>
  isDark: ComputedRef<boolean>
  change: (name: GkThemeName) => void
  toggle: () => void
  cycle: (names?: GkThemeName[]) => void
}

/** Injected locale API */
export type GkLocaleContext = {
  locale: Ref<string>
  fallback: Ref<string>
  t: (key: string, params?: Record<string, string | number>) => string
}

/** Merged defaults map (global + optional provider layers) */
export type GkDefaultsInjected = ComputedRef<GkKitComponentDefaults>
