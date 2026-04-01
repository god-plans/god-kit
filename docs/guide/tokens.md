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
```

## Light and dark

Default tokens target light UI. For dark surfaces, set **`html.dark`** or **`.dark`** on a container (matches common conventions with Nuxt Color Mode).

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

Apply **`gk-density-compact`** on `:root` or a wrapper to tighten **`--gk-control-*`** padding and min-heights used by `GkButton` and `GkInput`. Default is comfortable spacing.

## Vuetify bridge

While migrating from Vuetify, import **`god-kit/bridge/vuetify.css`** after Vuetify theme CSS so `--v-theme-*` maps into `--gk-*` and `Gk*` components align with existing screens.

## Source files

In the package repository:

- `src/tokens/tokens.css` — variable definitions  
- `src/tokens/tokens.ts` — `gkTokens` object  

Adjust tokens here when evolving the system; components read `var(--gk-…)` in scoped styles.
