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
