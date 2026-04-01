import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type {
  GkDefaultsInjected,
  GkDisplayResolvedConfig,
  GkLocaleContext,
  GkThemeContext,
} from './vue/config/gk-kit-types'

export type GkFieldContext = {
  inputId: string
  errorId: string
  errorMessage: ComputedRef<string | undefined>
}

export const GK_FIELD: InjectionKey<GkFieldContext> = Symbol('gk-field')

export type GkRadioGroupContext = {
  name: ComputedRef<string>
  modelValue: Ref<string | number | undefined>
  setValue: (v: string | number) => void
  /** Group-level disabled (combined with each radio’s `disabled`) */
  isDisabled: ComputedRef<boolean>
  /** Group-level readonly: selections cannot change */
  isReadonly: ComputedRef<boolean>
}

export const GK_RADIO_GROUP: InjectionKey<GkRadioGroupContext> = Symbol('gk-radio-group')

export type GkExpansionPanelsContext = {
  /** When `false`, at most one panel is expanded (accordion) */
  multiple: ComputedRef<boolean>
  isExpanded: (value: string | number) => boolean
  toggle: (value: string | number) => void
  isDisabled: ComputedRef<boolean>
}

export const GK_EXPANSION_PANELS: InjectionKey<GkExpansionPanelsContext> =
  Symbol('gk-expansion-panels')

export type GkExpansionPanelContext = {
  panelValue: ComputedRef<string | number>
  isExpanded: ComputedRef<boolean>
  toggle: () => void
  disabled: ComputedRef<boolean>
  titleId: string
  contentId: string
}

export const GK_EXPANSION_PANEL: InjectionKey<GkExpansionPanelContext> = Symbol('gk-expansion-panel')

export type GkTabsContext = {
  /** Selected tab value */
  modelValue: Ref<string | number | undefined>
  setValue: (v: string | number) => void
  isDisabled: ComputedRef<boolean>
  /** Prefix for stable `id` / `aria-controls` pairs */
  groupId: string
  tabId: (value: string | number) => string
  panelId: (value: string | number) => string
  direction: ComputedRef<'horizontal' | 'vertical'>
  stacked: ComputedRef<boolean>
  fixedTabs: ComputedRef<boolean>
  grow: ComputedRef<boolean>
  hideSlider: ComputedRef<boolean>
  sliderColor: ComputedRef<string | undefined>
  sliderTransition: ComputedRef<'fade' | 'grow' | 'shift'>
  inset: ComputedRef<boolean>
  alignTabs: ComputedRef<'start' | 'title' | 'center' | 'end'>
  /** Ordered tab values for keyboard roving */
  orderedValues: Ref<(string | number)[]>
  isValueDisabled: (value: string | number) => boolean
  registerValue: (value: string | number) => void
  unregisterValue: (value: string | number) => void
  focusNeighbor: (value: string | number, delta: -1 | 1) => void
  focusFirst: () => void
  focusLast: () => void
  /** When `true`, tab order comes from `items` (GkTab should not register for slot order) */
  itemsMode: ComputedRef<boolean>
}

export const GK_TABS: InjectionKey<GkTabsContext> = Symbol('gk-tabs')

/** God Kit global theme (`createGkKit` / `useGkTheme`) */
export const GK_THEME: InjectionKey<GkThemeContext> = Symbol('gk-theme')

/** Resolved display thresholds from `createGkKit` */
export const GK_DISPLAY_CONFIG: InjectionKey<GkDisplayResolvedConfig> = Symbol('gk-display-config')

/** Locale + `t` from `createGkKit` / `useGkLocale` */
export const GK_LOCALE: InjectionKey<GkLocaleContext> = Symbol('gk-locale')

/** Merged component defaults (`GkDefaultsProvider` chain) */
export const GK_DEFAULTS: InjectionKey<GkDefaultsInjected> = Symbol('gk-defaults')
