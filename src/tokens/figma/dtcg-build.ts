/**
 * Builds the W3C DTCG design-token document (god-kit.tokens.json) from
 * tokens.css. Mirrors tailwind-theme-build.ts: pure build functions used by
 * scripts/generate-design-tokens.ts and the Vitest drift checks.
 *
 * Structure: primitives (palette/space/radius/elevation/font), semantic
 * (color/opacity/motion/focus/density), component namespaces, and typography
 * composites. Theme-dependent tokens carry all four theme values under
 * `$extensions["org.godplans.modes"]`; `$value` is always the light theme.
 */

import {
  GK_THEME_NAMES,
  GK_VAR_RE,
  formatCssColor,
  parseCssColor,
  parseGkTokensCss,
  resolveCssColorValue,
  resolveVarChain,
  splitTopLevel,
  type GkParsedTokensCss,
  type GkThemeName,
} from './parse-tokens-css'

export const GK_MODES_EXTENSION = 'org.godplans.modes'
export const GK_CSS_VAR_EXTENSION = 'org.godplans.cssVar'

export type GkDtcgType =
  | 'color'
  | 'dimension'
  | 'number'
  | 'duration'
  | 'cubicBezier'
  | 'shadow'
  | 'fontFamily'
  | 'typography'
  | 'string'

export interface GkDtcgToken {
  $type: GkDtcgType
  $value: unknown
  $description?: string
  $extensions?: Record<string, unknown>
}

export interface GkDtcgStats {
  total: number
  themed: number
  groups: Record<string, number>
}

/* -------------------------------------------------------------------------- */
/* Naming: --gk-* → DTCG path                                                  */
/* -------------------------------------------------------------------------- */

const COMPONENT_PREFIXES = [
  'navigation-drawer',
  'skeleton-loader',
  'bottom-sheet',
  'pagination',
  'tooltip',
  'overlay',
  'snackbar',
  'dialog',
  'button',
  'alert',
  'table',
  'menu',
  'card',
  'tabs',
]

/**
 * Maps a CSS variable to its DTCG path. Trailing name parts stay as one flat
 * kebab segment (e.g. `color/primary-hover`) so a token never collides with a
 * group of the same name (`color/primary`).
 */
export function classifyGkVar(cssVar: string): string[] {
  const name = cssVar.replace(/^--gk-/, '')

  if (name.startsWith('palette-base-')) return ['palette', 'base', name.slice('palette-base-'.length)]
  if (name.startsWith('palette-')) {
    const [family, ...step] = name.slice('palette-'.length).split('-')
    return ['palette', family, step.join('-')]
  }
  if (name.startsWith('elevation-')) return ['elevation', name.slice('elevation-'.length)]
  if (name === 'font-sans' || name === 'font-heading') return ['font', 'family', name.slice('font-'.length)]
  if (name.startsWith('font-size-')) return ['font', 'size', name.slice('font-size-'.length)]
  if (name.startsWith('line-height-')) return ['font', 'line-height', name.slice('line-height-'.length)]
  if (name.startsWith('color-')) return ['color', name.slice('color-'.length)]
  if (name.startsWith('opacity-')) return ['opacity', name.slice('opacity-'.length)]
  if (name.startsWith('radius-')) return ['radius', name.slice('radius-'.length)]
  if (name.startsWith('space-')) return ['space', name.slice('space-'.length)]
  if (name.startsWith('duration-')) return ['motion', 'duration', name.slice('duration-'.length)]
  if (name.startsWith('easing-')) return ['motion', 'easing', name.slice('easing-'.length)]
  if (name === 'input-focus-ring-spread') return ['focus', 'input-ring-spread']
  if (name.startsWith('focus-')) return ['focus', name.slice('focus-'.length)]
  if (name === 'density') return ['density', 'mode']
  if (name.startsWith('control-')) return ['density', 'control', name.slice('control-'.length)]
  if (name.startsWith('fc-')) return ['component', 'fc', name.slice('fc-'.length)]
  for (const prefix of COMPONENT_PREFIXES) {
    if (name.startsWith(`${prefix}-`)) return ['component', prefix, name.slice(prefix.length + 1)]
  }
  throw new Error(`dtcg-build: cannot classify ${cssVar} — extend classifyGkVar`)
}

/* -------------------------------------------------------------------------- */
/* Value conversion                                                            */
/* -------------------------------------------------------------------------- */

interface GkShadowLayer {
  color: string
  offsetX: string
  offsetY: string
  blur: string
  spread: string
}

function normalizeLength(value: string): string {
  return /^-?\d*\.?\d+$/.test(value) && parseFloat(value) === 0 ? '0px' : value
}

/** Parses a (possibly multi-layer) box-shadow, inlining `var()` shadow layers. */
export function parseGkShadowList(
  value: string,
  map: Record<string, string>
): GkShadowLayer[] | null {
  const layers: GkShadowLayer[] = []
  for (const layerRaw of splitTopLevel(value, ',')) {
    const varMatch = GK_VAR_RE.exec(layerRaw)
    if (varMatch) {
      const target = map[varMatch[1]]
      if (!target) return null
      const nested = parseGkShadowList(target, map)
      if (!nested) return null
      layers.push(...nested)
      continue
    }
    let color: string | null = null
    const lengths: string[] = []
    for (const part of splitTopLevel(layerRaw, ' ')) {
      const parsed = parseCssColor(part)
      if (parsed) {
        color = formatCssColor(parsed)
        continue
      }
      if (/^-?\d*\.?\d+(px|rem)?$/.test(part)) {
        lengths.push(normalizeLength(part))
        continue
      }
      return null
    }
    if (!color || lengths.length < 2 || lengths.length > 4) return null
    const [offsetX, offsetY, blur = '0px', spread = '0px'] = lengths
    layers.push({ offsetX, offsetY, blur, spread, color })
  }
  return layers.length > 0 ? layers : null
}

function inferType(path: string[], raw: string, map: Record<string, string>): GkDtcgType {
  if (path[0] === 'font' && path[1] === 'family') return 'fontFamily'
  const resolved = resolveVarChain(raw, map)
  if (resolved.startsWith('color-mix(') || parseCssColor(resolved)) return 'color'
  if (/^-?\d*\.?\d+(ms|s)$/.test(resolved)) return 'duration'
  if (/^-?\d*\.?\d+(px|rem)$/.test(resolved)) return 'dimension'
  if (/^-?\d*\.?\d+$/.test(resolved)) return 'number'
  if (resolved.startsWith('cubic-bezier(')) return 'cubicBezier'
  if (parseGkShadowList(resolved, map)) return 'shadow'
  return 'string'
}

interface GkConvertedValue {
  value: unknown
  description?: string
}

/** Converts one raw CSS value for one theme into a DTCG value (or `{alias}`). */
function convertValue(
  raw: string,
  type: GkDtcgType,
  map: Record<string, string>
): GkConvertedValue {
  const varMatch = GK_VAR_RE.exec(raw)
  if (varMatch) return { value: `{${classifyGkVar(varMatch[1]).join('.')}}` }

  switch (type) {
    case 'color': {
      const direct = parseCssColor(raw)
      if (direct) return { value: formatCssColor(direct) }
      const resolved = resolveCssColorValue(raw, map)
      if (!resolved) throw new Error(`dtcg-build: cannot resolve color "${raw}"`)
      return { value: formatCssColor(resolved), description: `Resolved from CSS: ${raw}` }
    }
    case 'shadow': {
      const layers = parseGkShadowList(raw, map)
      if (!layers) throw new Error(`dtcg-build: cannot parse shadow "${raw}"`)
      return {
        value: layers.length === 1 ? layers[0] : layers,
        description: raw.includes('var(') ? `Flattened from CSS: ${raw}` : undefined,
      }
    }
    case 'number':
      return { value: Number(raw) }
    case 'cubicBezier': {
      const inner = /^cubic-bezier\(([^)]+)\)$/.exec(raw)
      if (!inner) throw new Error(`dtcg-build: cannot parse easing "${raw}"`)
      return { value: inner[1].split(',').map((n) => Number(n.trim())) }
    }
    case 'fontFamily':
      return { value: splitTopLevel(raw, ',').map((f) => f.replace(/^['"]|['"]$/g, '')) }
    default:
      return { value: raw }
  }
}

/* -------------------------------------------------------------------------- */
/* Document assembly                                                           */
/* -------------------------------------------------------------------------- */

function setAtPath(doc: Record<string, unknown>, path: string[], token: GkDtcgToken): void {
  let node = doc
  for (const segment of path.slice(0, -1)) {
    const existing = node[segment]
    if (existing !== undefined && (typeof existing !== 'object' || '$value' in (existing as object))) {
      throw new Error(`dtcg-build: group/token collision at "${path.join('.')}"`)
    }
    node = (node[segment] ??= {}) as Record<string, unknown>
  }
  const leaf = path[path.length - 1]
  if (node[leaf] !== undefined) throw new Error(`dtcg-build: duplicate token "${path.join('.')}"`)
  node[leaf] = token
}

function buildToken(
  cssVar: string,
  path: string[],
  rawByTheme: Record<GkThemeName, string>,
  mapByTheme: Record<GkThemeName, Record<string, string>>
): GkDtcgToken {
  const type = inferType(path, rawByTheme.light, mapByTheme.light)
  const perMode = {} as Record<GkThemeName, GkConvertedValue>
  for (const theme of GK_THEME_NAMES) {
    perMode[theme] = convertValue(rawByTheme[theme], type, mapByTheme[theme])
  }

  const light = perMode.light
  const token: GkDtcgToken = {
    $type: type,
    $value: light.value,
    $extensions: { [GK_CSS_VAR_EXTENSION]: cssVar },
  }
  if (light.description) token.$description = light.description

  const themed = GK_THEME_NAMES.some(
    (theme) => JSON.stringify(perMode[theme].value) !== JSON.stringify(light.value)
  )
  if (themed) {
    const modes = {} as Record<GkThemeName, unknown>
    for (const theme of GK_THEME_NAMES) modes[theme] = perMode[theme].value
    token.$extensions![GK_MODES_EXTENSION] = modes
  }
  return token
}

const TEXT_STYLE_RE = /^--gk-text-(.+)-size$/

function buildTypographyComposites(
  parsed: GkParsedTokensCss,
  doc: Record<string, unknown>
): number {
  let count = 0
  for (const cssVar of Object.keys(parsed.root)) {
    const match = TEXT_STYLE_RE.exec(cssVar)
    if (!match) continue
    const style = match[1]
    const weightVar = `--gk-text-${style}-weight`
    const lineHeightVar = `--gk-text-${style}-line-height`
    if (!(weightVar in parsed.root) || !(lineHeightVar in parsed.root)) {
      throw new Error(`dtcg-build: incomplete text style triplet for "${style}"`)
    }
    const family = style.startsWith('heading') ? '{font.family.heading}' : '{font.family.sans}'
    setAtPath(doc, ['typography', style], {
      $type: 'typography',
      $value: {
        fontFamily: family,
        fontSize: parsed.root[cssVar],
        fontWeight: Number(parsed.root[weightVar]),
        lineHeight: Number(parsed.root[lineHeightVar]),
      },
      $description: `Assembled from --gk-text-${style}-{size,weight,line-height}; font family assumed ${
        style.startsWith('heading') ? 'heading' : 'sans'
      }.`,
      $extensions: { [GK_CSS_VAR_EXTENSION]: `--gk-text-${style}-*` },
    })
    count++
  }
  return count
}

export function buildGodKitDtcgTokens(css: string): {
  document: Record<string, unknown>
  stats: GkDtcgStats
} {
  const parsed = parseGkTokensCss(css)
  const document: Record<string, unknown> = {
    $description:
      'God Kit design tokens (W3C DTCG). Generated from src/tokens/tokens.css — do not edit by hand. ' +
      `Theme-dependent tokens carry per-theme values under $extensions["${GK_MODES_EXTENSION}"] ` +
      '(light | dark | ocean | highContrast); $value is the light theme.',
  }
  const stats: GkDtcgStats = { total: 0, themed: 0, groups: {} }

  const track = (path: string[], token: GkDtcgToken) => {
    setAtPath(document, path, token)
    stats.total++
    stats.groups[path[0]] = (stats.groups[path[0]] ?? 0) + 1
    if (token.$extensions?.[GK_MODES_EXTENSION]) stats.themed++
  }

  const mapByTheme = parsed.themes
  for (const cssVar of Object.keys(parsed.root)) {
    if (cssVar.startsWith('--gk-text-')) continue
    const rawByTheme = {} as Record<GkThemeName, string>
    for (const theme of GK_THEME_NAMES) rawByTheme[theme] = mapByTheme[theme][cssVar]
    track(classifyGkVar(cssVar), buildToken(cssVar, classifyGkVar(cssVar), rawByTheme, mapByTheme))
  }

  stats.total += buildTypographyComposites(parsed, document)
  stats.groups.typography = Object.keys(
    (document.typography as Record<string, unknown>) ?? {}
  ).length

  for (const [size, block] of Object.entries(parsed.formControlSizes)) {
    const context = { ...parsed.root, ...block }
    const contextByTheme = {
      light: context,
      dark: context,
      ocean: context,
      highContrast: context,
    }
    for (const [cssVar, raw] of Object.entries(block)) {
      const base = classifyGkVar(cssVar)
      const path = [base[0], base[1], size, ...base.slice(2)]
      const rawByTheme = { light: raw, dark: raw, ocean: raw, highContrast: raw }
      track(path, buildToken(cssVar, path, rawByTheme, contextByTheme))
    }
  }

  {
    const context = { ...parsed.root, ...parsed.densityCompact }
    const contextByTheme = {
      light: context,
      dark: context,
      ocean: context,
      highContrast: context,
    }
    for (const [cssVar, raw] of Object.entries(parsed.densityCompact)) {
      const base = classifyGkVar(cssVar)
      const path = ['density', 'compact', ...base.slice(1)]
      const rawByTheme = { light: raw, dark: raw, ocean: raw, highContrast: raw }
      track(path, buildToken(cssVar, path, rawByTheme, contextByTheme))
    }
  }

  return { document, stats }
}
