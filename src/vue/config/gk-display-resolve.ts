import type { GkDisplayResolvedConfig, GkDisplayThresholds, GkKitDisplayOptions } from './gk-kit-types'

export const GK_DISPLAY_DEFAULTS: GkDisplayThresholds = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
}

export function resolveGkDisplayConfig(
  display?: GkKitDisplayOptions
): GkDisplayResolvedConfig {
  const thresholds = {
    ...GK_DISPLAY_DEFAULTS,
    ...display?.thresholds,
  }
  return {
    ...thresholds,
    mobileBreakpoint: display?.mobileBreakpoint ?? 'md',
  }
}
