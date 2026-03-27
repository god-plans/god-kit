---
title: Getting started
description: Install God Kit, import tokens and components, and run the playground or Nuxt app.
outline: [2, 3]
---

# Getting started

## Requirements

- **Node.js** 20+
- **Vue** 3.5+ (peer dependency)

## Install

In the monorepo, depend on `@god-plan/god-kit` from the package root (see workspace / `file:` link in consumer `package.json`).

```json
{
  "dependencies": {
    "@god-plan/god-kit": "file:../../god-kit"
  }
}
```

Run `npm install` from the repo root or the consuming app.

Read **[Architecture and tiers](./architecture)** for how primitives, patterns, and app-level blocks differ—important as the component count grows.

## CSS import order

1. `@god-plan/god-kit/tokens.css` — semantic `--gk-*` variables  
2. (Optional) `@god-plan/god-kit/bridge/vuetify.css` — map Vuetify `--v-theme-*` while migrating  
3. `@god-plan/god-kit/vue.css` — styles for `Gk*` components  

Then your application CSS.

See **[RTL and i18n](./rtl)** for `dir="rtl"` and bilingual apps.

## Composables

For custom field layouts or headless wiring, use **`useFieldIds`** and **`useFormControl`** — see **[Composables](./composables)**.

## Use components

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <GkField label="Email">
    <GkInput v-model="email" type="email" autocomplete="email" />
  </GkField>
  <GkButton type="button" variant="primary">Save</GkButton>
</template>
```

## Local development

| Tool | Command | Purpose |
|------|---------|---------|
| **Docs** (this site) | `npm run docs:dev` | VitePress (default port `5173`) |
| **Playground** | `npm run playground` | Vite app (default port `5174`) |
| **Tests** | `npm run test` | Vitest (includes `*.a11y.spec.ts` with axe-core) |
| **Library build** | `npm run build` | Output in `dist/` |

The playground and these docs both resolve `@god-plan/god-kit/vue` to **`src/`** so you can edit components without rebuilding the library.

## Nuxt

`god-panel-nuxt` consumes the package and imports the CSS entries in `nuxt.config.ts`. Prefer explicit imports of `Gk*` components in pages until you add a Nuxt module for globals.
