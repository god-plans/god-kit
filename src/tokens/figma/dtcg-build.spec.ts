import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { gkTokens } from '../tokens'
import { GK_MODES_EXTENSION, buildGodKitDtcgTokens, type GkDtcgToken } from './dtcg-build'
import { GK_THEME_NAMES, parseGkTokensCss } from './parse-tokens-css'

const css = readFileSync(join(process.cwd(), 'src', 'tokens', 'tokens.css'), 'utf8')
const parsed = parseGkTokensCss(css)
const { document, stats } = buildGodKitDtcgTokens(css)

/** All CSS variable names referenced anywhere in the gkTokens name map. */
function collectGkTokenVars(node: unknown, out: string[] = []): string[] {
  if (typeof node === 'string') out.push(node)
  else if (node && typeof node === 'object') {
    for (const value of Object.values(node)) collectGkTokenVars(value, out)
  }
  return out
}

/** All CSS variables declared in tokens.css (any block). */
function collectDeclaredVars(): Set<string> {
  const declared = new Set(Object.keys(parsed.root))
  for (const theme of GK_THEME_NAMES) {
    for (const name of Object.keys(parsed.overrides[theme])) declared.add(name)
  }
  for (const block of Object.values(parsed.formControlSizes)) {
    for (const name of Object.keys(block)) declared.add(name)
  }
  for (const name of Object.keys(parsed.densityCompact)) declared.add(name)
  return declared
}

function isToken(node: unknown): node is GkDtcgToken {
  return typeof node === 'object' && node !== null && '$value' in node
}

function collectTokens(
  node: unknown,
  path: string[] = [],
  out: Array<{ path: string[]; token: GkDtcgToken }> = []
): Array<{ path: string[]; token: GkDtcgToken }> {
  if (isToken(node)) {
    out.push({ path, token: node })
    return out
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) continue
      collectTokens(value, [...path, key], out)
    }
  }
  return out
}

function tokenAt(path: string): GkDtcgToken {
  let node: unknown = document
  for (const segment of path.split('.')) {
    node = (node as Record<string, unknown>)[segment]
  }
  if (!isToken(node)) throw new Error(`no token at ${path}`)
  return node
}

function modesOf(token: GkDtcgToken): Record<string, unknown> {
  return (token.$extensions?.[GK_MODES_EXTENSION] ?? {}) as Record<string, unknown>
}

const ALIAS_RE = /^\{([a-z0-9.-]+)\}$/i

function collectAliases(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    const match = ALIAS_RE.exec(value)
    if (match) out.push(match[1])
  } else if (Array.isArray(value)) {
    for (const item of value) collectAliases(item, out)
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) collectAliases(item, out)
  }
  return out
}

describe('dtcg-build', () => {
  const allTokens = collectTokens(document)

  it('classifies every declared CSS variable (build does not throw)', () => {
    expect(stats.total).toBeGreaterThan(280)
    expect(allTokens.length).toBe(stats.total)
  })

  it('drift: every gkTokens name is declared in tokens.css', () => {
    const declared = collectDeclaredVars()
    const missing = collectGkTokenVars(gkTokens).filter((name) => !declared.has(name))
    expect(missing).toEqual([])
  })

  it('drift: CSS variables not yet exposed in gkTokens (curated subset)', () => {
    const known = new Set(collectGkTokenVars(gkTokens))
    const unexposed = [...collectDeclaredVars()].filter((name) => !known.has(name)).sort()
    expect(unexposed).toMatchSnapshot()
  })

  it('theme-dependent tokens carry values for all four modes', () => {
    for (const { path, token } of allTokens) {
      const modes = token.$extensions?.[GK_MODES_EXTENSION]
      if (modes === undefined) continue
      for (const theme of GK_THEME_NAMES) {
        expect(modes, path.join('.')).toHaveProperty(theme)
      }
    }
    expect(stats.themed).toBeGreaterThan(30)
  })

  it('every {alias} points at an existing token', () => {
    const paths = new Set(allTokens.map(({ path }) => path.join('.')))
    for (const { path, token } of allTokens) {
      const refs = [
        ...collectAliases(token.$value),
        ...collectAliases(token.$extensions?.[GK_MODES_EXTENSION]),
      ]
      for (const ref of refs) {
        expect(paths.has(ref), `${path.join('.')} → {${ref}}`).toBe(true)
      }
    }
  })

  it('preserves var() aliases per theme (color/primary)', () => {
    const primary = tokenAt('color.primary')
    expect(primary.$type).toBe('color')
    expect(primary.$value).toBe('{palette.primary.600}')
    expect(modesOf(primary)).toEqual({
      light: '{palette.primary.600}',
      dark: '{palette.primary.500}',
      ocean: '#0ea5e9',
      highContrast: '#38bdf8',
    })
  })

  it('cascade-resolves themes that inherit from light (ocean color/bg)', () => {
    expect(modesOf(tokenAt('color.bg')).ocean).toBe('{palette.gray.50}')
  })

  it('resolves color-mix() to static colors (dark danger-surface, tabs inset bg)', () => {
    expect(modesOf(tokenAt('color.danger-surface')).dark).toBe('#58221a')
    expect(tokenAt('component.tabs.inset-selected-bg').$value).toBe('#4f00d01f')
  })

  it('converts rgba() to hex with alpha (focus ring)', () => {
    expect(tokenAt('color.focus-ring').$value).toBe('#4f00d073')
  })

  it('emits dimensions, numbers, and easings', () => {
    expect(tokenAt('space.4')).toMatchObject({ $type: 'dimension', $value: '1rem' })
    expect(tokenAt('component.overlay.z-index')).toMatchObject({ $type: 'number', $value: 2000 })
    expect(tokenAt('motion.easing.standard')).toMatchObject({
      $type: 'cubicBezier',
      $value: [0.4, 0, 0.2, 1],
    })
  })

  it('parses shadows, flattening var() layers (dialog shadow)', () => {
    expect(tokenAt('elevation.2').$value).toEqual({
      offsetX: '0px',
      offsetY: '4px',
      blur: '8px',
      spread: '0px',
      color: '#0000000a',
    })
    const dialog = tokenAt('component.dialog.shadow')
    expect(dialog.$type).toBe('shadow')
    expect(dialog.$value).toHaveLength(2)
    expect((dialog.$value as Array<{ offsetY: string }>)[1].offsetY).toBe('6px')
  })

  it('assembles typography composites from text triplets', () => {
    expect(tokenAt('typography.heading-m').$value).toEqual({
      fontFamily: '{font.family.heading}',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.35,
    })
    expect(tokenAt('typography.body-s').$value).toMatchObject({
      fontFamily: '{font.family.sans}',
    })
  })

  it('scopes form-control sizes and density-compact overrides', () => {
    expect(tokenAt('component.fc.md.min-height').$value).toBe('{density.control.min-height-md}')
    expect(tokenAt('component.fc.xl.radius').$value).toBe('{radius.lg}')
    expect(tokenAt('density.compact.control.min-height-sm').$value).toBe('1.75rem')
  })

  it('matches stable snapshot for the full DTCG document', () => {
    expect(document).toMatchSnapshot()
  })
})
