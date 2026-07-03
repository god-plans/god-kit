/**
 * Parses `src/tokens/tokens.css` into per-theme token maps plus CSS value
 * helpers (var() chains, color parsing, color-mix resolution).
 * Pure string → data: callers (scripts, specs) read the file themselves.
 */

export const GK_THEME_NAMES = ['light', 'dark', 'ocean', 'highContrast'] as const
export type GkThemeName = (typeof GK_THEME_NAMES)[number]

export interface GkParsedTokensCss {
  /** `:root` declarations — light theme values and all theme-independent tokens. */
  root: Record<string, string>
  /** Raw theme override blocks (light is always empty). */
  overrides: Record<GkThemeName, Record<string, string>>
  /** Cascade-resolved per-theme maps: `:root` merged with the theme's overrides. */
  themes: Record<GkThemeName, Record<string, string>>
  /** `.gk-form-control--<size>` blocks keyed by size (xs–xl), in source order. */
  formControlSizes: Record<string, Record<string, string>>
  /** `.gk-density-compact` overrides. */
  densityCompact: Record<string, string>
}

function parseDeclarations(body: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const decl of body.split(';')) {
    const idx = decl.indexOf(':')
    if (idx === -1) continue
    const prop = decl.slice(0, idx).trim()
    if (!prop.startsWith('--gk-')) continue
    out[prop] = decl
      .slice(idx + 1)
      .trim()
      .replace(/\s+/g, ' ')
  }
  return out
}

type GkBlockTarget =
  | { kind: 'root' }
  | { kind: 'theme'; theme: Exclude<GkThemeName, 'light'> }
  | { kind: 'formControl'; size: string }
  | { kind: 'densityCompact' }

function classifySelector(selector: string): GkBlockTarget {
  const s = selector.trim()
  if (/data-gk-theme=['"]dark['"]/.test(s) || /(^|,)\s*(html)?\.dark(\s|,|$)/.test(s)) {
    return { kind: 'theme', theme: 'dark' }
  }
  if (/data-gk-theme=['"]ocean['"]/.test(s)) return { kind: 'theme', theme: 'ocean' }
  if (/data-gk-theme=['"]highContrast['"]/.test(s)) return { kind: 'theme', theme: 'highContrast' }
  if (s.includes('.gk-density-compact')) return { kind: 'densityCompact' }
  const fc = /\.gk-form-control--([a-z]+)/.exec(s)
  if (fc) return { kind: 'formControl', size: fc[1] }
  if (s.includes(':root')) return { kind: 'root' }
  throw new Error(`parse-tokens-css: unrecognized selector "${s}" — update the parser`)
}

export function parseGkTokensCss(css: string): GkParsedTokensCss {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const root: Record<string, string> = {}
  const overrides: GkParsedTokensCss['overrides'] = {
    light: {},
    dark: {},
    ocean: {},
    highContrast: {},
  }
  const formControlSizes: Record<string, Record<string, string>> = {}
  let densityCompact: Record<string, string> = {}

  const blockRe = /([^{}]+)\{([^{}]*)\}/g
  let match: RegExpExecArray | null
  while ((match = blockRe.exec(source)) !== null) {
    const target = classifySelector(match[1])
    const declarations = parseDeclarations(match[2])
    if (target.kind === 'root') Object.assign(root, declarations)
    else if (target.kind === 'theme') Object.assign(overrides[target.theme], declarations)
    else if (target.kind === 'formControl') formControlSizes[target.size] = declarations
    else densityCompact = declarations
  }

  const themes = {
    light: { ...root },
    dark: { ...root, ...overrides.dark },
    ocean: { ...root, ...overrides.ocean },
    highContrast: { ...root, ...overrides.highContrast },
  }

  return { root, overrides, themes, formControlSizes, densityCompact }
}

/* -------------------------------------------------------------------------- */
/* CSS value helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Matches values that are exactly a single `var(--gk-…)` reference. */
export const GK_VAR_RE = /^var\((--gk-[a-z0-9-]+)\)$/

/** Follows `var(--gk-…)` chains until a non-var value; throws on unknown names. */
export function resolveVarChain(value: string, map: Record<string, string>): string {
  let current = value.trim()
  const seen = new Set<string>()
  let match: RegExpExecArray | null
  while ((match = GK_VAR_RE.exec(current)) !== null) {
    const name = match[1]
    if (seen.has(name)) throw new Error(`resolveVarChain: circular reference at ${name}`)
    if (!(name in map)) throw new Error(`resolveVarChain: ${name} is not declared in tokens.css`)
    seen.add(name)
    current = map[name].trim()
  }
  return current
}

/** Splits a value on a separator, ignoring separators inside parentheses. */
export function splitTopLevel(value: string, separator: ' ' | ','): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (const ch of value) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === separator && depth === 0) {
      if (current.trim()) parts.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

export interface GkRgba {
  r: number
  g: number
  b: number
  /** 0–1 */
  a: number
}

/** Parses hex / rgb(a) / `transparent` literals; returns null for anything else. */
export function parseCssColor(value: string): GkRgba | null {
  const v = value.trim().toLowerCase()
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 }
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(v)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) h = h.split('').map((c) => c + c).join('')
    const int = (offset: number) => parseInt(h.slice(offset, offset + 2), 16)
    return { r: int(0), g: int(2), b: int(4), a: h.length === 8 ? int(6) / 255 : 1 }
  }
  const fn = /^rgba?\(([^)]+)\)$/.exec(v)
  if (fn) {
    const parts = fn[1].split(',').map((p) => parseFloat(p.trim()))
    if (parts.length < 3 || parts.some(Number.isNaN)) return null
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 }
  }
  return null
}

/** Formats as lowercase hex, with an alpha byte only when translucent. */
export function formatCssColor(color: GkRgba): string {
  const byte = (n: number) =>
    Math.min(255, Math.max(0, Math.round(n))).toString(16).padStart(2, '0')
  const base = `#${byte(color.r)}${byte(color.g)}${byte(color.b)}`
  return color.a >= 1 ? base : `${base}${byte(color.a * 255)}`
}

const COLOR_MIX_RE =
  /^color-mix\(in srgb,\s*(.+?)\s+(\d+(?:\.\d+)?)%\s*,\s*(.+?)(?:\s+(\d+(?:\.\d+)?)%)?\s*\)$/

/**
 * Resolves a color value (literal, var() chain, or `color-mix(in srgb, …)`)
 * to a concrete color within a theme map. color-mix uses premultiplied-alpha
 * interpolation per the CSS spec.
 */
export function resolveCssColorValue(value: string, map: Record<string, string>): GkRgba | null {
  const resolved = resolveVarChain(value, map)
  const mix = COLOR_MIX_RE.exec(resolved)
  if (mix) {
    const c1 = resolveCssColorValue(mix[1], map)
    const c2 = resolveCssColorValue(mix[3], map)
    if (!c1 || !c2) return null
    let p1 = parseFloat(mix[2]) / 100
    let p2 = mix[4] !== undefined ? parseFloat(mix[4]) / 100 : 1 - p1
    const sum = p1 + p2
    if (sum !== 1 && sum > 0) {
      p1 /= sum
      p2 /= sum
    }
    const a = c1.a * p1 + c2.a * p2
    if (a === 0) {
      return { r: c1.r * p1 + c2.r * p2, g: c1.g * p1 + c2.g * p2, b: c1.b * p1 + c2.b * p2, a: 0 }
    }
    return {
      r: (c1.r * c1.a * p1 + c2.r * c2.a * p2) / a,
      g: (c1.g * c1.a * p1 + c2.g * c2.a * p2) / a,
      b: (c1.b * c1.a * p1 + c2.b * c2.a * p2) / a,
      a,
    }
  }
  return parseCssColor(resolved)
}
