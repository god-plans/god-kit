/**
 * Typed token names for CSS variables (use with getComputedStyle or documentation).
 */
export const gkTokens = {
  color: {
    bg: '--gk-color-bg',
    surface: '--gk-color-surface',
    surfaceElevated: '--gk-color-surface-elevated',
    border: '--gk-color-border',
    borderStrong: '--gk-color-border-strong',
    text: '--gk-color-text',
    textMuted: '--gk-color-text-muted',
    textOnPrimary: '--gk-color-text-on-primary',
    textDisabled: '--gk-color-text-disabled',
    onSurface: '--gk-color-on-surface',
    onSurfaceMuted: '--gk-color-on-surface-muted',
    primary: '--gk-color-primary',
    primaryHover: '--gk-color-primary-hover',
    primaryActive: '--gk-color-primary-active',
    focusRing: '--gk-color-focus-ring',
    danger: '--gk-color-danger',
    dangerSurface: '--gk-color-danger-surface',
    success: '--gk-color-success',
    successSurface: '--gk-color-success-surface',
    info: '--gk-color-info',
    infoSurface: '--gk-color-info-surface',
    warning: '--gk-color-warning',
    warningSurface: '--gk-color-warning-surface',
    overlay: '--gk-color-overlay',
  },
  opacity: {
    disabled: '--gk-opacity-disabled',
    overlay: '--gk-opacity-overlay',
  },
  overlay: {
    scrim: '--gk-overlay-scrim',
    zIndex: '--gk-overlay-z-index',
  },
  dialog: {
    zIndex: '--gk-dialog-z-index',
    maxWidth: '--gk-dialog-max-width',
    scrollMaxHeight: '--gk-dialog-scroll-max-height',
    shadow: '--gk-dialog-shadow',
  },
  density: {
    controlMinHeightSm: '--gk-control-min-height-sm',
    controlMinHeightMd: '--gk-control-min-height-md',
    controlPaddingX: '--gk-control-padding-x',
    controlPaddingY: '--gk-control-padding-y',
  },
  focus: {
    offset: '--gk-focus-offset',
    width: '--gk-focus-width',
    ringWidth: '--gk-focus-ring-width',
  },
  radius: {
    sm: '--gk-radius-sm',
    md: '--gk-radius-md',
    lg: '--gk-radius-lg',
  },
  space: {
    1: '--gk-space-1',
    2: '--gk-space-2',
    3: '--gk-space-3',
    4: '--gk-space-4',
    5: '--gk-space-5',
    6: '--gk-space-6',
  },
  font: {
    sans: '--gk-font-sans',
    sizeSm: '--gk-font-size-sm',
    sizeMd: '--gk-font-size-md',
  },
} as const

export type GkTokenPath = keyof typeof gkTokens.color
