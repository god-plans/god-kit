---
title: Getting Started with Vue 3 and Nuxt 4
description: Install this Vue 3 and Nuxt 4 admin UI kit, import God Kit tokens/components, and render your first screen in minutes.
outline: [2, 3]
---

# Getting started

## Requirements

- **Node.js** 20+
- **Vue** 3.5+ (peer dependency)

## Install

For public npm usage:

```bash
npm i god-kit vue
```

## Add a starter component with CLI

Generate the first app-level wrapper component:

```bash
npx god-kit@latest add button
```

Compatibility alias:

```bash
npx add gk button
```

The `add` command accepts any registry key for a public `Gk*` component (see `npx god-kit --help`). Use `--dry-run` before writing files and `--cwd` to target another project folder.

For this repository's monorepo development setup, you can still use a workspace `file:` link when needed.

## Register God Kit (full example)

Below, **`gk.config.ts`** sets every top-level **`GkKitOptions`** field: **`theme`**, **`display`**, **`locale`**, **`defaults`**, and **`aliases`**. Import **`GkKitOptions`** from **`god-kit/vue/config`**.

Load **`tokens.css`** and **`vue.css`** in your entry before **`app.mount`** using the order in [CSS import order](#css-import-order). For option-by-option reference and multi-locale patterns, see **[Global configuration](./global-configuration)**.

**`src/gk.config.ts`**

```ts
import type { GkKitOptions } from 'god-kit/vue/config'
import { GkButton } from 'god-kit/vue'

/** Every `GkKitOptions` key is shown; adjust or remove what you do not need. */
export const gkKitConfig: GkKitOptions = {
  theme: {
    defaultTheme: 'system',
    /** Root for `data-gk-theme` / `gk-theme-dark`; default is `document.documentElement`. */
    scope: () => document.documentElement,
    themes: {
      oceanicNight: {
        extends: 'dark',
        isDark: true,
        tokens: {
          '--gk-color-primary': '#38bdf8',
          '--gk-color-primary-hover': '#0ea5e9',
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
    },
  },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: {
      en: {
        appSave: 'Save',
        appWelcome: 'Welcome, {name}',
      },
      fr: {
        appSave: 'Enregistrer',
        appWelcome: 'Bienvenue, {name}',
      },
    },
  },
  defaults: {
    GkButton: { variant: 'primary' },
  },
  aliases: {
    GkAppButton: GkButton,
    GkDangerButton: {
      extends: GkButton,
      defaults: { variant: 'danger' },
    },
  },
}
```

**`src/main.ts`**

```ts
import { createApp } from 'vue'
import { createGkKit } from 'god-kit/vue/config'
import App from './App.vue'
import { gkKitConfig } from './gk.config'

const app = createApp(App)
app.use(createGkKit(gkKitConfig))
app.mount('#app')
```

The runtime merges built-in English strings (**`gkEnMessages`**) into **`locale.messages.en`**; add or override keys per locale as above.

## Multi-theme runtime switching

```ts
import { useGkTheme } from 'god-kit/vue/config'

const theme = useGkTheme()

theme.change('ocean') // built-in preset
theme.registerTheme('midnight', {
  extends: 'dark',
  isDark: true,
  tokens: {
    '--gk-color-primary': '#8b5cf6',
    '--gk-color-primary-hover': '#7c3aed',
  },
})
theme.change('midnight')
```

Migration note: existing setups using only `light` / `dark` / `system` continue to work unchanged.

See **[Architecture and tiers](./architecture)** for how primitives, patterns, and app-level blocks differ—important as the component count grows.

## CSS import order

1. `god-kit/tokens.css` — semantic `--gk-*` variables  
2. (Optional) `god-kit/bridge/vuetify.css` — map Vuetify `--v-theme-*` while migrating  
3. `god-kit/vue.css` — styles for `Gk*` components  

Then your application CSS.

See **[RTL and i18n](./rtl)** for `dir="rtl"` and bilingual apps.

## Composables

For custom field layouts or headless wiring, use **`useFieldIds`** and **`useFormControl`** — see **[Composables](./composables)**.

## Use components

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from 'god-kit/vue'
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

Need more examples? Browse the full catalog in **[Components](/components/)**.

## Local development

| Tool | Command | Purpose |
|------|---------|---------|
| **Docs** (this site) | `npm run docs:dev` | VitePress (default port `5173`) |
| **Playground** | `npm run playground` | Vite app (default port `5174`) |
| **Tests** | `npm run test` | Vitest (includes `*.a11y.spec.ts` with axe-core) |
| **Library build** | `npm run build` | Output in `dist/` |

The playground and these docs both resolve `god-kit/vue` to **`src/`** so you can edit components without rebuilding the library.

## Nuxt

`god-panel-nuxt` consumes the package and imports CSS entries in `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  css: ['god-kit/tokens.css', 'god-kit/vue.css'],
})
```

Prefer explicit imports of `Gk*` components in pages until you add a Nuxt module for global registration.
