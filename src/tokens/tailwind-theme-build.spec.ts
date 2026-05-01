import { describe, expect, it } from 'vitest'

import {
  buildGodKitTailwindColors,
  buildGodKitTailwindExtend,
  buildGodKitTailwindThemeCss,
} from './tailwind-theme-build'

describe('tailwind-theme-build', () => {
  it('maps semantic and palette colors from gkTokens', () => {
    const colors = buildGodKitTailwindColors()
    expect(colors['gk-primary']).toBe('var(--gk-color-primary)')
    expect(colors['gk-gray-500']).toBe('var(--gk-palette-gray-500)')
    expect(colors['gk-on-surface']).toBe('var(--gk-color-on-surface)')
    expect(colors['gk-pagination-active']).toBe('var(--gk-pagination-active-color)')
  })

  it('maps spacing from gkTokens.space', () => {
    const ext = buildGodKitTailwindExtend()
    expect(ext.spacing['gk-4']).toBe('var(--gk-space-4)')
  })

  it('matches stable snapshot for @theme CSS fragment', () => {
    expect(buildGodKitTailwindThemeCss()).toMatchSnapshot()
  })
})
