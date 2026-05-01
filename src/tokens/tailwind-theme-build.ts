/**
 * Builds Tailwind theme mappings from `gkTokens` (single source of truth).
 * Used by the publish script and Vitest drift checks.
 */

import { gkTokens } from './tokens'

function camelToKebab(key: string): string {
  return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Tailwind v3 `theme.extend`-compatible shapes */
export type GodKitTailwindPresetExtend = {
  colors: Record<string, string>
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  boxShadow: Record<string, string>
  fontFamily: Record<string, string[]>
  fontSize: Record<string, string | [string, { lineHeight?: string; fontWeight?: string }]>
  lineHeight: Record<string, string>
  transitionDuration: Record<string, string>
  zIndex: Record<string, string>
}

function wrapVar(cssVar: string): string {
  return `var(${cssVar})`
}

/** Semantic + palette + opacity + selected component color tokens */
export function buildGodKitTailwindColors(): Record<string, string> {
  const colors: Record<string, string> = {}

  for (const [k, v] of Object.entries(gkTokens.color)) {
    colors[`gk-${camelToKebab(k)}`] = wrapVar(v)
  }

  for (const [family, scale] of Object.entries(gkTokens.palette)) {
    if (typeof scale === 'string') {
      colors[`gk-${camelToKebab(family)}`] = wrapVar(scale)
      continue
    }
    for (const [step, cssVar] of Object.entries(scale)) {
      colors[`gk-${family}-${step}`] = wrapVar(cssVar)
    }
  }

  for (const [k, v] of Object.entries(gkTokens.opacity)) {
    colors[`gk-opacity-${camelToKebab(k)}`] = wrapVar(v)
  }

  colors['gk-overlay-scrim'] = wrapVar(gkTokens.overlay.scrim)
  colors['gk-menu-scrim'] = wrapVar(gkTokens.menu.scrim)
  colors['gk-tabs-slider'] = wrapVar(gkTokens.tabs.sliderColor)
  colors['gk-tabs-bg'] = wrapVar(gkTokens.tabs.bgColor)
  colors['gk-tabs-fg'] = wrapVar(gkTokens.tabs.color)
  colors['gk-pagination-active'] = wrapVar(gkTokens.pagination.activeColor)
  colors['gk-density-control-disabled-surface'] = wrapVar(gkTokens.density.controlDisabledSurface)

  colors['gk-table-border'] = wrapVar(gkTokens.table.border)
  colors['gk-table-header-bg'] = wrapVar(gkTokens.table.headerBg)
  colors['gk-table-header-text'] = wrapVar(gkTokens.table.headerText)
  colors['gk-table-row-hover'] = wrapVar(gkTokens.table.rowHover)
  colors['gk-table-stripe'] = wrapVar(gkTokens.table.stripe)

  return colors
}

export function buildGodKitTailwindExtend(): GodKitTailwindPresetExtend {
  const spacing: Record<string, string> = {}
  for (const [k, v] of Object.entries(gkTokens.space)) {
    spacing[`gk-${k}`] = wrapVar(v)
  }

  const borderRadius: Record<string, string> = {}
  for (const [k, v] of Object.entries(gkTokens.radius)) {
    borderRadius[`gk-${k}`] = wrapVar(v)
  }

  const boxShadow: Record<string, string> = {}
  for (const [k, v] of Object.entries(gkTokens.elevation)) {
    boxShadow[`gk-elev-${k}`] = wrapVar(v)
  }
  boxShadow['gk-card'] = wrapVar(gkTokens.card.shadow)
  boxShadow['gk-card-hover'] = wrapVar(gkTokens.card.shadowHover)
  boxShadow['gk-dialog'] = wrapVar(gkTokens.dialog.shadow)
  boxShadow['gk-menu'] = wrapVar(gkTokens.menu.shadow)
  boxShadow['gk-tooltip'] = wrapVar(gkTokens.tooltip.shadow)
  boxShadow['gk-snackbar'] = wrapVar(gkTokens.snackbar.shadow)
  boxShadow['gk-bottom-sheet'] = wrapVar(gkTokens.bottomSheet.shadow)

  const fontFamily = {
    'gk-sans': [wrapVar(gkTokens.font.sans)],
    'gk-heading': [wrapVar(gkTokens.font.heading)],
  }

  const fontSize: GodKitTailwindPresetExtend['fontSize'] = {
    'gk-sm': wrapVar(gkTokens.font.sizeSm),
    'gk-md': wrapVar(gkTokens.font.sizeMd),
    'gk-body-s': [
      wrapVar(gkTokens.text.bodySSize),
      {
        lineHeight: wrapVar(gkTokens.text.bodySLineHeight),
        fontWeight: wrapVar(gkTokens.text.bodySWeight),
      },
    ],
    'gk-heading-m': [
      wrapVar(gkTokens.text.headingMSize),
      {
        lineHeight: wrapVar(gkTokens.text.headingMLineHeight),
        fontWeight: wrapVar(gkTokens.text.headingMWeight),
      },
    ],
  }

  const lineHeight = {
    'gk-tight': wrapVar(gkTokens.font.lineHeightTight),
    'gk-normal': wrapVar(gkTokens.font.lineHeightNormal),
  }

  const transitionDuration = {
    'gk-fast': wrapVar(gkTokens.motion.durationFast),
    'gk-normal': wrapVar(gkTokens.motion.durationNormal),
  }

  const zIndex = {
    'gk-overlay': wrapVar(gkTokens.overlay.zIndex),
    'gk-dialog': wrapVar(gkTokens.dialog.zIndex),
    'gk-bottom-sheet': wrapVar(gkTokens.bottomSheet.zIndex),
    'gk-menu': wrapVar(gkTokens.menu.zIndex),
    'gk-tooltip': wrapVar(gkTokens.tooltip.zIndex),
    'gk-snackbar': wrapVar(gkTokens.snackbar.zIndex),
  }

  return {
    colors: buildGodKitTailwindColors(),
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize,
    lineHeight,
    transitionDuration,
    zIndex,
  }
}

/** Tailwind v4 `@theme` fragment (no `@import`; consumers import after `tokens.css`). */
export function buildGodKitTailwindThemeCss(): string {
  const ext = buildGodKitTailwindExtend()
  const lines: string[] = [
    '/**',
    ' * God Kit — Tailwind v4 @theme fragment.',
    ' * Generated from src/tokens/tokens.ts — do not edit by hand.',
    ' * Import after god-kit/tokens.css:',
    ' *   @import "god-kit/tokens.css";',
    ' *   @import "god-kit/tailwind/theme.css";',
    ' *   @import "tailwindcss";',
    ' */',
    '',
    '@theme {',
  ]

  const pushColor = (key: string, val: string) => {
    lines.push(`  --color-${key}: ${val};`)
  }
  for (const [k, v] of Object.entries(ext.colors).sort(([a], [b]) => a.localeCompare(b))) {
    pushColor(k, v)
  }

  for (const [k, v] of Object.entries(ext.spacing).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --spacing-${k}: ${v};`)
  }

  for (const [k, v] of Object.entries(ext.borderRadius).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --radius-${k}: ${v};`)
  }

  for (const [k, v] of Object.entries(ext.boxShadow).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --shadow-${k}: ${v};`)
  }

  for (const [k, v] of Object.entries(ext.fontFamily).sort(([a], [b]) => a.localeCompare(b))) {
    const stack = v.join(', ')
    lines.push(`  --font-${k}: ${stack};`)
  }

  for (const [k, v] of Object.entries(ext.fontSize).sort(([a], [b]) => a.localeCompare(b))) {
    if (typeof v === 'string') {
      lines.push(`  --text-${k}: ${v};`)
    } else {
      const [size] = v
      lines.push(`  --text-${k}: ${size};`)
    }
  }

  for (const [k, v] of Object.entries(ext.lineHeight).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --leading-${k}: ${v};`)
  }

  for (const [k, v] of Object.entries(ext.transitionDuration).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --duration-${k}: ${v};`)
  }

  for (const [k, v] of Object.entries(ext.zIndex).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  --z-index-${k}: ${v};`)
  }

  lines.push('}', '')
  return lines.join('\n')
}
