---
title: Tailwind CSS and God Kit
description: Map Tailwind utilities to God Kit design tokens (--gk-*), use the optional preset or v4 theme fragment, and keep themes in sync with Gk components.
outline: [2, 3, 4]
---

# Tailwind CSS

God Kit components read **`var(--gk-*)`** from [`tokens.css`](./tokens). Tailwind does not ship with the package; you install it in your app and **bridge** utilities to the same variables so layouts and `Gk*` primitives stay visually aligned.

## Principles

- **Single source of truth:** define colors, spacing, and radii in **`--gk-*`** (and palettes **`--gk-palette-*`**). Tailwind classes should resolve to those variables, not duplicate hex/RGB in config "just for Tailwind."
- **Import order:** load **`god-kit/tokens.css`** before Tailwind’s entry CSS so variables exist when utilities are resolved. Keep the usual kit order from [Getting started](./getting-started#css-import-order): tokens → optional Vuetify bridge → **`god-kit/vue.css`** → app CSS (Tailwind layers typically live in app CSS).

## Without a preset (arbitrary values)

You can always reference tokens inline:

```html
<div class="bg-[var(--gk-color-surface)] text-[var(--gk-color-on-surface)] p-[var(--gk-space-4)]">
  …
</div>
```

This works with any Tailwind version and needs no config. It is verbose but safe.

## Optional published mappings

The package exposes generated artifacts from **`gkTokens`** (see [Design tokens](./tokens)):

| Path | Use |
|------|-----|
| **`god-kit/tailwind/preset`** | Tailwind **v3** (and tooling that accepts `presets`) — `theme.extend` maps **`gk-*`** keys to `var(--gk-…)`. |
| **`god-kit/tailwind/theme.css`** | Tailwind **v4** — `@theme { … }` fragment; import after **`tokens.css`**. |

Regenerate these files whenever token shapes change (`npm run build`).

### What is included

The preset / theme fragment currently maps:

- **Colors:** semantic `gkTokens.color`, stepped **`gk-gray-*`**, **`gk-primary-*`**, etc., opacity helpers, and selected UI tokens (tabs, table surfaces, scrims).
- **Spacing:** **`gk-1`** … **`gk-6`** → `--gk-space-*`.
- **Radii:** **`gk-sm`**, **`gk-md`**, **`gk-lg`**.
- **Shadows:** elevations **`gk-elev-1`** … **`gk-elev-5`**, plus card / dialog / menu / tooltip / snackbar / bottom-sheet shadows.
- **Typography:** **`font-gk-sans`**, **`font-gk-heading`**, sizes **`gk-sm`** / **`gk-md`**, **`text-gk-body-s`**, **`text-gk-heading-m`** (preset includes line-height / weight metadata where applicable).
- **Line heights:** **`gk-tight`**, **`gk-normal`**.
- **Motion:** **`gk-fast`**, **`gk-normal`** durations.
- **Z-index:** **`gk-overlay`**, **`gk-dialog`**, **`gk-menu`**, etc.

Other `--gk-*` variables remain available via arbitrary values or your own extensions.

### Tailwind v3 (Vite / Vue)

Install Tailwind v3 and Point your `content` globs at Vue/HTML files. Merge the preset:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import godKitPreset from 'god-kit/tailwind/preset'

export default {
  presets: [godKitPreset],
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'class', // align with `html.dark`; see Dark mode below
} satisfies Config
```

Main CSS (order matters):

```css
@import 'god-kit/tokens.css';
@import 'god-kit/vue.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Example utilities after preset: **`bg-gk-surface`**, **`text-gk-on-surface`**, **`p-gk-4`**, **`rounded-gk-md`**, **`shadow-gk-elev-2`**.

### Tailwind v4 (Vite)

Install **`tailwindcss`** and **`@tailwindcss/vite`**. Import tokens and the theme fragment **before** Tailwind:

```css
@import 'god-kit/tokens.css';
@import 'god-kit/tailwind/theme.css';
@import 'tailwindcss';
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

Use the same utility naming pattern provided by `@theme` (for example **`bg-gk-primary`**, **`text-gk-gray-700`**).

## Examples: Tailwind layout with `Gk*` components

Use Tailwind for **page chrome** (flex grids, spacing, responsive breakpoints) and God Kit for **interactive primitives** (buttons, fields, tables). Both read the same **`--gk-*`** surface colors, so shells and components stay aligned.

### Dashboard shell with `GkButton`, `GkField`, and `GkInput`

Assume **`createGkKit`** is registered and **`tokens.css` / `vue.css`** (or your Tailwind entry that imports tokens first) are loaded. With the preset or v4 `@theme` fragment, utilities like **`bg-gk-surface`** map to **`var(--gk-color-surface)`**.

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const query = ref('')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gk-bg font-gk-sans text-gk-text">
    <header
      class="flex flex-wrap items-center justify-between gap-gk-4 border-b border-gk-border bg-gk-surface px-gk-6 py-gk-4 shadow-gk-elev-1"
    >
      <h1 class="font-gk-heading text-lg font-semibold text-gk-on-surface">
        Overview
      </h1>
      <div class="flex flex-wrap gap-gk-3">
        <GkButton type="button" variant="ghost">Cancel</GkButton>
        <GkButton type="button" variant="primary">Save</GkButton>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-gk-6 p-gk-6">
      <section
        class="rounded-gk-lg border border-gk-border bg-gk-surface p-gk-6 shadow-gk-elev-2"
      >
        <h2 class="mb-gk-4 font-gk-heading text-gk-heading-m text-gk-on-surface">
          Filters
        </h2>
        <GkField label="Search">
          <GkInput v-model="query" type="search" placeholder="Filter rows…" />
        </GkField>
        <p class="mt-gk-3 text-gk-body-s leading-gk-normal text-gk-on-surface-muted">
          Tailwind owns layout and spacing utilities; <strong>GkInput</strong> and
          <strong>GkButton</strong> keep focus rings, density, and accessible markup from the kit.
        </p>
      </section>
    </main>
  </div>
</template>
```

### Arbitrary values next to preset utilities

You can mix **`gk-*`** classes with arbitrary **`var(--gk-*)`** when you need a token that is not mapped in the preset yet:

```html
<div
  class="bg-gk-surface p-gk-4 ring-2 ring-[var(--gk-color-focus-ring)] ring-offset-2 ring-offset-[var(--gk-color-bg)]"
>
  Custom focus ring using tokens not exposed as Tailwind colors.
</div>
```

### Optional: accent strip using palette steps

Palette utilities (**`bg-gk-primary-600`**, **`text-gk-base-white`**) track stepped scales—useful for badges or hero strips while **`GkButton`** stays semantic:

```html
<div
  class="flex items-center justify-between gap-gk-4 rounded-gk-md bg-gk-primary-600 px-gk-4 py-gk-3 text-gk-base-white shadow-gk-elev-2"
>
  <span class="font-gk-heading text-sm font-medium">Trial ends in 3 days</span>
  <GkButton variant="ghost">Manage plan</GkButton>
</div>
```

(`GkButton` **ghost** on a saturated background is illustrative—pick **primary** / **secondary** per your design.)

## Changing colors (God Kit + Tailwind together)

Preset and **`@theme`** utilities wrap **`var(--gk-…)`**. So **whenever you change the underlying CSS variables**, both **`Gk*`** styles and Tailwind **`gk-*`** classes update—no need to duplicate hex in two places.

### 1. Semantic overrides (fastest)

Override semantic variables only; surfaces and primary actions shift everywhere.

**Global (light default):**

```css
/* app.css — after god-kit/tokens.css */
:root {
  --gk-color-primary: #2563eb;
  --gk-color-primary-hover: #1d4ed8;
  --gk-color-primary-active: #1e40af;
}
```

**Per named theme** (works with **`useGkTheme().change('brand')`** if you register or select that theme):

```css
[data-gk-theme='brand'] {
  --gk-color-primary: #db2777;
  --gk-color-primary-hover: #be185d;
}
```

Tailwind classes such as **`bg-gk-primary`** and **`text-gk-primary`** pick up the new values automatically because they resolve to those variables.

### 2. Runtime themes with `createGkKit`

Register token overrides in TypeScript—ideal for multi-tenant or user-selected accents ([Global configuration](./global-configuration)):

```ts
app.use(
  createGkKit({
    theme: {
      defaultTheme: 'light',
      themes: {
        coral: {
          extends: 'light',
          tokens: {
            '--gk-color-primary': '#f97316',
            '--gk-color-primary-hover': '#ea580c',
            '--gk-color-primary-active': '#c2410c',
          },
        },
      },
    },
  })
)
```

Call **`useGkTheme().change('coral')`**; Tailwind utilities that reference **`var(--gk-color-primary)`** follow the same overrides. You can also **`registerTheme`** from **`useGkTheme()`** for the same **`tokens`** shape without editing the initial plugin options ([Getting started](./getting-started#multi-theme-runtime-switching)).

### 3. Full palette rebrand

If you change **every step** of brand color (charts, marketing blocks, semantic mappings), redefine **`--gk-palette-primary-*`** (25–900) and ensure semantic **`--gk-color-primary*`** still point at the steps you want—either by editing overrides in CSS or by copying patterns from [`tokens.css`](./tokens)’s `:root` block. Preset keys **`gk-primary-500`**, **`bg-gk-primary-600`**, etc., track those palette variables.

### 4. Extra Tailwind-only aliases (still token-backed)

Add **app-specific** names that remain wired to God Kit variables—good for marketing sections without forking the preset:

```ts
// tailwind.config.ts — alongside godKitPreset
export default {
  presets: [godKitPreset],
  theme: {
    extend: {
      colors: {
        hero: 'var(--gk-palette-primary-500)',
        muted: 'var(--gk-color-on-surface-muted)',
      },
    },
  },
}
```

Avoid **`extend.colors: { primary: '#6366f1' }`** when **`gk-primary`** already exists—duplicate palettes drift from **`GkButton`** and **`tokens.css`**.

### Summary

| Approach | Best for |
|----------|----------|
| **`:root` / `[data-gk-theme]` CSS** | Static brands, design handoff as CSS variables |
| **`createGkKit` `theme.themes`** | Runtime switching, typed overrides |
| **`--gk-palette-*` rescaling** | Full primary/success scale rework |
| **`theme.extend` + `var(--gk-*)`** | Extra Tailwind names without breaking kit |

See also [Design tokens](./tokens) for **`gkTokens`** names and dark presets (**`ocean`**, **`highContrast`**).

## Dark mode

God Kit resolves dark surfaces when **`html.dark`**, **`.dark`**, or **`[data-gk-theme='dark']`** applies ([Design tokens](./tokens)).

Tailwind’s **`dark:`** variant is easiest when **`darkMode: 'class'`** and your `<html>` (or another Tailwind-visible ancestor) gets **`class="dark"`** whenever God Kit is dark—often by syncing **`useGkTheme()`** with that class.

If you prefer **`data-gk-theme="dark"`** without a **`dark`** class, configure a **custom dark variant** (Tailwind v3/v4 docs) that targets **`[data-gk-theme='dark'] &`**, then use your variant name instead of **`dark:`**.

## Nuxt 4

List CSS in dependency order so variables load before Tailwind:

```ts
export default defineNuxtConfig({
  css: ['god-kit/tokens.css', 'god-kit/vue.css'],
  // plus your global CSS that imports Tailwind / @tailwind directives
})
```

If Tailwind lives in a dedicated CSS file, **that file** should still import **`tokens.css`** first (or rely on Nuxt `css` order above **before** the Tailwind sheet). Consult [Getting started — Nuxt](./getting-started#nuxt).

## Preflight

Tailwind **Preflight** resets base element styles. Most `Gk*` components scope their own rules, but if **`GkInput`**, **`GkButton`**, or headings look wrong, test with a narrow scope (layout wrapper) or adjust Preflight via Tailwind configuration. Prefer documenting app-level fixes before changing kit internals.

## `gkTokens` and codegen

[`gkTokens`](./tokens#typed-map) mirrors every **`--gk-*`** name in TypeScript. The **`god-kit/tailwind/preset`** and **`god-kit/tailwind/theme.css`** files are generated from the same token tree—extend **`gkTokens`** / **`tokens.css`** when adding design system values, then rebuild.
