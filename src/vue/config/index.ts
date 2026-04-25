export { createGkKit } from './createGkKit'
export { GK_FORM_CONTROL_SIZES } from './gk-kit-types'
export type {
  GkDefaultsInjected,
  GkDisplayBreakpointName,
  GkDisplayResolvedConfig,
  GkDisplayThresholds,
  GkKitAliasEntry,
  GkKitAliases,
  GkFormControlSize,
  GkKitComponentDefaults,
  GkKitFormOptions,
  GkKitOptions,
  GkKitThemeOptions,
  GkThemeBuiltinName,
  GkThemeCustomName,
  GkThemeDefinition,
  GkThemeTokenOverrides,
  GkResolvedThemeName,
  GkKitDisplayOptions,
  GkKitLocaleOptions,
  GkLocaleContext,
  GkLocaleMessages,
  GkThemeContext,
  GkThemeName,
} from './gk-kit-types'
export { resolveGkDisplayConfig, GK_DISPLAY_DEFAULTS } from './gk-display-resolve'

export { useGkTheme, createGkThemeContextForKit } from '../composables/useGkTheme'
export { useGkDisplay } from '../composables/useGkDisplay'
export type { GkDisplayReturn } from '../composables/useGkDisplay'
export { useGkLocale, createGkLocaleContextForKit } from '../composables/useGkLocale'
export { useGkDefaults, mergeGkProps } from '../composables/useGkDefaults'
export type { GkVueI18nAdapter } from '../composables/gk-vue-i18n-adapter'

export { default as GkThemeProvider } from '../components/config/GkThemeProvider.vue'
export { default as GkLocaleProvider } from '../components/config/GkLocaleProvider.vue'
export { default as GkDefaultsProvider } from '../components/config/GkDefaultsProvider.vue'
export { default as GkFormControlsProvider } from '../components/config/GkFormControlsProvider.vue'

export { gkEnMessages } from '../../locale/en'
