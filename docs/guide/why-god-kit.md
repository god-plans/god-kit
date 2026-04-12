---
title: Why God Kit
description: Why teams pick this Vue 3 and Nuxt 4 admin UI kit, including migration guidance from Vuetify and comparison notes.
outline: [2, 3]
---

# Why God Kit

`god-kit` is optimized for dashboard and internal-tool interfaces where teams need consistent tokens, predictable form behavior, and incremental migration from legacy UI layers.

## Positioning

- **Use God Kit when** you want a typed Vue 3 component layer with design tokens and admin-focused primitives.
- **Use it with Nuxt 4** when you need SSR-ready structure and explicit control over imported components/styles.
- **Use migration mode** when replacing Vuetify over time, not in one rewrite.

## Features and benefits

These are the main reasons teams adopt God Kit alongside Vue 3 or Nuxt:

- **Admin-first primitives:** Forms, containment, navigation, and feedback patterns tuned for dashboards and internal tools—not a generic marketing-site kit.
- **Token-first styling:** Semantic CSS variables (`--gk-*`) keep branding and dark/light behavior consistent without scattering magic values in components.
- **Subpath exports:** Import focused bundles from `god-kit/vue/form`, `god-kit/vue/layout`, `god-kit/vue/navigation`, and `god-kit/vue/config` so you only touch the surface you need.
- **App-wide configuration:** [`createGkKit`](./global-configuration) wires theme, display breakpoints, locale, and defaults through one plugin-style setup.
- **Flexible theming:** Named theme registry with presets (for example `ocean` and `highContrast`), plus runtime registration when you need extra branded or accessibility-oriented themes.
- **CLI scaffolding:** `npx god-kit add <component>` aligns new files with kit conventions; the registry grows over time (see CLI docs for current commands).
- **Nuxt-friendly:** Documented CSS import order and explicit component imports work well with SSR and Nuxt 4’s module model.
- **Migration-friendly Vuetify path:** Optional `god-kit/bridge/vuetify.css` maps legacy theme variables toward `--gk-*` so you can replace screens incrementally instead of a big-bang rewrite.
- **Production-oriented defaults:** TypeScript types across public exports, `Gk*` prefix to reduce naming collisions, ESM with tree-shaking-friendly structure, and accessibility coverage via `axe-core` specs on key components (see [Trust signals](#trust-signals)).
- **Modern baseline:** Vue 3.5+, Node.js 20+, and current tooling expectations for new greenfield apps.

## Comparison snapshot

| Option | Best for | Tradeoff |
|--------|----------|----------|
| `god-kit` | Teams building/administering dashboard products with token consistency and migration needs | Smaller ecosystem than broad general-purpose UI frameworks |
| Generic UI kit | Fast broad UI coverage | Often needs deeper adaptation for admin patterns and token governance |
| Full rewrite from scratch | Maximum custom behavior | Higher maintenance and longer onboarding |

## Vuetify migration path

1. Import `god-kit/tokens.css`.
2. Keep `god-kit/bridge/vuetify.css` while legacy screens remain.
3. Move form primitives first (`GkField`, `GkInput`, `GkSelect`, `GkCheckbox`, `GkRadioGroup`).
4. Move containment/navigation (`GkDialog`, `GkNavigationDrawer`, `GkTabs`, `GkPagination`).
5. Remove bridge once all screens read `--gk-*` tokens directly.

## Trust signals

- TypeScript declarations shipped for all public exports.
- Accessibility specs with `axe-core` across key components.
- Changelog and release checklist kept in-repo.

See [Release and publish](./release-and-publish) and [Roadmap](./roadmap) for cadence details.
