#!/usr/bin/env node
/**
 * Scaffolds a God Kit primitive folder: SFC + unit + a11y + docs + VitePress checklist.
 * Usage: node scripts/new-component.mjs <kebab-name> [form|layout|containment|navigation]
 * Examples:
 *   node scripts/new-component.mjs combobox form
 *   node scripts/new-component.mjs breadcrumbs navigation
 *   node scripts/new-component.mjs toolbar
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const name = process.argv[2]
const category = process.argv[3]

if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Usage: node scripts/new-component.mjs <kebab-name> [form|layout|containment|navigation]')
  process.exit(1)
}

if (category && !['form', 'layout', 'containment', 'navigation'].includes(category)) {
  console.error('Optional second argument must be "form", "layout", "containment", or "navigation".')
  process.exit(1)
}

const pascal = name
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('')

const dir = category
  ? join(root, 'src/vue/components', category, name)
  : join(root, 'src/vue/components', name)
await mkdir(dir, { recursive: true })

const testUtilsImport = category ? '../../../test-utils/axe' : '../../test-utils/axe'

const vue = `<script setup lang="ts">
// TODO: props, emits, a11y
</script>

<template>
  <div class="gk-${name}">
    <slot />
  </div>
</template>

<style scoped>
.gk-${name} {
  font-family: var(--gk-font-sans);
  color: var(--gk-color-on-surface);
}
</style>
`

const spec = `import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Gk${pascal} from './Gk${pascal}.vue'

describe('Gk${pascal}', () => {
  it('renders slot', () => {
    const w = mount(Gk${pascal}, { slots: { default: 'x' } })
    expect(w.text()).toContain('x')
  })
})
`

const a11y = `import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '${testUtilsImport}'
import Gk${pascal} from './Gk${pascal}.vue'

describe('Gk${pascal} a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(Gk${pascal}, { attachTo: document.body })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
`

const demo = `<script setup lang="ts">
import { Gk${pascal} } from '@god-plan/god-kit/vue'
</script>

<template>
  <div class="gk-doc-demo">
    <Gk${pascal}>
      Hello
    </Gk${pascal}>
  </div>
</template>
`

const doc = `---
title: Gk${pascal}
description: TODO
outline: [2, 3]
---

# Gk${pascal}

TODO: description.

## Live demo

<DemoGk${pascal} />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | — |

## Example

\`\`\`vue
<script setup lang="ts">
import { Gk${pascal} } from '@god-plan/god-kit/vue'
</script>

<template>
  <Gk${pascal} />
</template>
\`\`\`
`

await writeFile(join(dir, `Gk${pascal}.vue`), vue)
await writeFile(join(dir, `Gk${pascal}.spec.ts`), spec)
await writeFile(join(dir, `Gk${pascal}.a11y.spec.ts`), a11y)

const demoDir = category
  ? join(root, 'docs/.vitepress/components/demos', category, name)
  : join(root, 'docs/.vitepress/components/demos', name)
await mkdir(demoDir, { recursive: true })
await writeFile(join(demoDir, `DemoGk${pascal}.vue`), demo)

const docPath = category
  ? join(root, 'docs/components', category, `${name}.md`)
  : join(root, 'docs/components', `${name}.md`)
await mkdir(dirname(docPath), { recursive: true })
await writeFile(docPath, doc)

const srcRel = category ? join('src/vue/components', category, name) : join('src/vue/components', name)
const demoRel = category
  ? join('docs/.vitepress/components/demos', category, name)
  : join('docs/.vitepress/components/demos', name)
const docRel = category ? join('docs/components', category, `${name}.md`) : join('docs/components', `${name}.md`)

console.log(`\
Created:
  ${join(srcRel, `Gk${pascal}.vue`)}
  ${join(srcRel, `Gk${pascal}.spec.ts`)}
  ${join(srcRel, `Gk${pascal}.a11y.spec.ts`)}
  ${join(demoRel, `DemoGk${pascal}.vue`)}
  ${docRel}

Next steps:
  1. Export Gk${pascal} from src/vue/index.ts (and form.ts / layout.ts / navigation.ts as applicable).
  2. Register DemoGk${pascal} in docs/.vitepress/theme/index.ts
  3. Add sidebar entry in docs/.vitepress/config.ts and a row in docs/components/index.md
  4. Add CHANGELOG.md under [Unreleased]
  5. npm run test && npm run build && npm run docs:build
`)
