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
    primary: '--gk-color-primary',
    primaryHover: '--gk-color-primary-hover',
    primaryActive: '--gk-color-primary-active',
    focusRing: '--gk-color-focus-ring',
    danger: '--gk-color-danger',
    dangerSurface: '--gk-color-danger-surface',
    success: '--gk-color-success',
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
