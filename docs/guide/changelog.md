---
title: Changelog
description: Release history for @god-plan/god-kit.
outline: [2, 3]
---

# Changelog

All notable changes to `@god-plan/god-kit` are documented in this page and in **`CHANGELOG.md`** at the package root (same content, committed for npm and git history).

## [Unreleased]

### Added

- **Documentation:** [Component authoring](./component-authoring) — structure, doc mapping, agent prompt, phasing for large references. See root **`CHANGELOG.md`** for the full note.

### Changed

- **Layout:** form primitives are under **`src/vue/components/form/<name>/`**; docs at **`/components/form/...`**; **`scripts/new-component.mjs`** accepts optional **`form`** or **`layout`**. See root **`CHANGELOG.md`** for details.

## [0.3.0] - 2026-03-23

### Added

- **Primitives:** `GkTextarea`, `GkCheckbox`, `GkRadioGroup`, `GkRadio`, `GkSelect`, `GkAlert`, `GkStack`, `GkContainer`, `GkDivider`, `GkSpinner` — each with unit tests, `*.a11y.spec.ts`, VitePress demo, and component docs.
- **Injection:** `GK_RADIO_GROUP` and `GkRadioGroupContext` for radio groups; optional `ariaLabel` on `GkRadioGroup`.
- **Tokens:** semantic surfaces for success, info, and warning (CSS + `gkTokens` keys).
- **Subpath exports:** `@god-plan/god-kit/vue/form` and `@god-plan/god-kit/vue/layout`.
- **Docs:** [Build and bundling](./build-and-bundling), [Consumer bundle analysis](./consumer-bundle-analysis).
- **Scaffolding:** `scripts/new-component.mjs` for new primitive stubs.

## [0.2.0] - 2026-03-23

### Added

- **Package layout:** one folder per primitive under `src/vue/components/{button,field,input}/` with co-located tests.
- **Composables:** `useFieldIds()` and `useFormControl()` for stable ids and headless ARIA-oriented state (exported from `@god-plan/god-kit/vue`).
- **Tokens:** semantic `--gk-color-on-surface` / `-muted`, `--gk-color-text-disabled`, overlay and disabled opacity, `--gk-focus-ring-width`, density variables and **`.gk-density-compact`** for tighter controls.
- **Vuetify bridge:** extended mappings for on-surface and disabled where Vuetify exposes theme variables.
- **RTL:** logical CSS (`padding-inline`, `text-align: start`, etc.), [RTL and i18n](./rtl) guide, and RTL smoke tests for `GkField` + `GkInput`.
- **Accessibility tests:** `axe-core` with `expectNoA11yViolations` helper (`src/vue/test-utils/axe.ts`); `*.a11y.spec.ts` for `GkButton` and `GkField`+`GkInput` (color-contrast disabled in jsdom; use E2E for contrast).
- **VitePress demos:** `docs/.vitepress/components/demos/{button,input,field}/DemoGk*.vue` — one demo component per primitive.
- **Documentation:** [Composables](./composables), this changelog, expanded README.

### Changed

- **GkField** uses `useFieldIds()` internally instead of ad hoc `useId()` strings.
- **GkButton** / **GkInput** use density-related control tokens for padding and min-height; disabled styling uses tokenized opacity and text color.

## [0.1.0] - 2026-03-23

### Added

- Initial `@god-plan/god-kit` release: design tokens (`tokens.css`, `gkTokens`), **GkButton**, **GkInput**, **GkField**, Vuetify bridge CSS, Vitest unit tests, playground, VitePress docs, Stitch dev tooling (`tools/stitch`), and `god-panel-nuxt` demo page integration.
