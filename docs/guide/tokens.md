---
title: Design Tokens for Vue and Nuxt
description: Use God Kit semantic CSS variables and typed token maps to theme Vue 3 and Nuxt 4 admin interfaces consistently.
outline: [2, 3]
---

# Design tokens

God Kit exposes **semantic CSS variables** (`--gk-*`) as the single source of truth for color, space, radius, and typography. Import **`god-kit/tokens.css`** once at app entry.

## Typed map

Use `gkTokens` when you need variable names in TypeScript (documentation, theme tooling):

```ts
import { gkTokens } from 'god-kit/vue'

// gkTokens.color.primary → '--gk-color-primary'
// gkTokens.palette.primary['600'] → '--gk-palette-primary-600'
// gkTokens.elevation[2] → '--gk-elevation-2'
// gkTokens.text.headingMSize → '--gk-text-heading-m-size'
```

## Default palette, elevation, and typography

The default **`:root`** theme maps **semantic** colors (`--gk-color-*`) onto stepped palettes: **gray**, **primary** (purple), **success**, **error**, **warning**, and **info** (steps **25–900**), plus **`--gk-palette-base-white`** / **`--gk-palette-base-black`**. Use semantic tokens for components; use **`--gk-palette-*`** when you need a specific step (custom charts, marketing blocks).

**Elevation** is exposed as **`--gk-elevation-1`** … **`--gk-elevation-5`** (soft black shadows). Component shadows (menu, tooltip, dialog, snackbar, navigation drawer) build on these where it keeps visuals consistent.

**Typography** includes **`--gk-font-sans`** (DM Sans stack) and **`--gk-font-heading`** (Poppins stack), plus named **text style** variables such as **`--gk-text-heading-m-size`**, **`--gk-text-body-s-size`**, **`--gk-text-button-m-size`**, **`--gk-text-input-label-size`**, and **`--gk-text-helper-size`** (see `src/tokens/tokens.css` for the full set).

## Light and dark

Default tokens target light UI. For dark surfaces, set **`html.dark`**, **`.dark`**, or use **`useGkTheme().change('dark')`** so **`data-gk-theme="dark"`** is applied (matches common conventions with Nuxt Color Mode and God Kit’s theme API).

## Named presets

`tokens.css` also ships named theme selectors:

- **`[data-gk-theme='ocean']`**
- **`[data-gk-theme='highContrast']`**

These work with `useGkTheme().change('ocean')` / `change('highContrast')` and are available by default via `createGkKit`.

## Hybrid theme model (TS registry + CSS overrides)

God Kit supports two layered approaches together:

1. **Typed runtime registration** (`theme.themes` or `registerTheme`) for inline CSS variable overrides.
2. **Authoring manual CSS selectors** in your app (`[data-gk-theme='brandX']`) for broader style customization.

If both exist, custom selector CSS can still override token values by normal cascade/specificity rules.

## Semantic extras

Additional variables include **on-surface** text colors, **disabled** opacity/surfaces, **overlay** scrim, **focus** ring controls, tabs slider/transition tokens, and dialog scroll constraints. See `src/tokens/tokens.css` for the full list.

## Density

Apply **`gk-density-compact`** on `:root` or a wrapper to tighten **`--gk-control-*`** padding and min-heights used by `GkButton` and `GkInput` when the control uses those variables as fallbacks. Default is comfortable spacing.

**Form control size** (next section) sets explicit min-height, padding, and type size per tier; you can use **density** and **control `size`** together, but the **`gk-form-control--*`** layer defines the primary scale for sized controls.

## Form control size classes

Components such as **GkInput** add a class **`gk-form-control--{xs|sm|md|lg|xl}`** on the root. Those rules set **`--gk-fc-min-height`**, **`--gk-fc-padding-x`** / **`--gk-fc-padding-y`**, **`--gk-fc-font-size`**, **`--gk-fc-radius`**, and related variables (e.g. **`--gk-fc-textarea-min`**, **`--gk-fc-check-size`**) in **`tokens.css`**. The **`md`** tier aligns with the legacy default control appearance.

Configuring the default for the app, a subtree, or a form is described in [Global configuration — Form control size](./global-configuration#form-control-size).

## Vuetify bridge

While migrating from Vuetify, import **`god-kit/bridge/vuetify.css`** after Vuetify theme CSS so `--v-theme-*` maps into `--gk-*` and `Gk*` components align with existing screens.

## Source files

In the package repository:

- `src/tokens/tokens.css` — variable definitions  
- `src/tokens/tokens.ts` — `gkTokens` object  

Adjust tokens here when evolving the system; components read `var(--gk-…)` in scoped styles.
