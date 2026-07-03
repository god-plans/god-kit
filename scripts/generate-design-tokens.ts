/// <reference types="node" />

/**
 * Writes src/tokens/generated/god-kit.tokens.json (W3C DTCG document) from
 * src/tokens/tokens.css. postbuild-copy.mjs ships it as dist/tokens.json.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { buildGodKitDtcgTokens } from '../src/tokens/figma/dtcg-build'

const root = fileURLToPath(new URL('..', import.meta.url))
const generatedDir = join(root, 'src', 'tokens', 'generated')

const css = readFileSync(join(root, 'src', 'tokens', 'tokens.css'), 'utf8')
const { document, stats } = buildGodKitDtcgTokens(css)

mkdirSync(generatedDir, { recursive: true })
const outFile = join(generatedDir, 'god-kit.tokens.json')
writeFileSync(outFile, `${JSON.stringify(document, null, 2)}\n`, 'utf8')

const groups = Object.entries(stats.groups)
  .map(([group, count]) => `${group} ${count}`)
  .join(', ')
console.log(
  `god-kit.tokens.json — ${stats.total} tokens (${stats.themed} theme-dependent): ${groups}`
)
