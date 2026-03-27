---
title: Design tokens
description: CSS variables and the gkTokens map used across God Kit.
outline: [2, 3]
---

# Design tokens

God Kit exposes **semantic CSS variables** (`--gk-*`) as the single source of truth for color, space, radius, and typography. Import **`@god-plan/god-kit/tokens.css`** once at app entry.

## Typed map

Use `gkTokens` when you need variable names in TypeScript (documentation, theme tooling):

```ts
import { gkTokens } from '@god-plan/god-kit/vue'

// gkTokens.color.primary → '--gk-color-primary'
```

## Light and dark

Default tokens target light UI. For dark surfaces, set **`html.dark`** or **`.dark`** on a container (matches common conventions with Nuxt Color Mode).

## Semantic extras

Additional variables include **on-surface** text colors, **disabled** opacity and text color, **overlay** scrim, and **focus** ring width. See `src/tokens/tokens.css` for the full list.

## Density

Apply **`gk-density-compact`** on `:root` or a wrapper to tighten **`--gk-control-*`** padding and min-heights used by `GkButton` and `GkInput`. Default is comfortable spacing.

## Vuetify bridge

While migrating from Vuetify, import **`@god-plan/god-kit/bridge/vuetify.css`** after Vuetify theme CSS so `--v-theme-*` maps into `--gk-*` and `Gk*` components align with existing screens.

## Source files

In the package repository:

- `src/tokens/tokens.css` — variable definitions  
- `src/tokens/tokens.ts` — `gkTokens` object  

Adjust tokens here when evolving the system; components read `var(--gk-…)` in scoped styles.
