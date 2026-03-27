# Changelog

All notable changes to `@god-plan/god-kit` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- _(nothing yet)_

## [0.2.0] - 2026-03-23

### Added

- **Package layout:** one folder per primitive under `src/vue/components/{button,field,input}/` with co-located tests.
- **Composables:** `useFieldIds()` and `useFormControl()` for stable ids and headless ARIA-oriented state (exported from `@god-plan/god-kit/vue`).
- **Tokens:** semantic `--gk-color-on-surface` / `-muted`, `--gk-color-text-disabled`, overlay and disabled opacity, `--gk-focus-ring-width`, density variables and **`.gk-density-compact`** for tighter controls.
- **Vuetify bridge:** extended mappings for on-surface and disabled where Vuetify exposes theme variables.
- **RTL:** logical CSS (`padding-inline`, `text-align: start`, etc.), guide at `docs/guide/rtl.md`, and RTL smoke tests for `GkField` + `GkInput`.
- **Accessibility tests:** `axe-core` with `expectNoA11yViolations` helper (`src/vue/test-utils/axe.ts`); `*.a11y.spec.ts` for `GkButton` and `GkField`+`GkInput` (color-contrast disabled in jsdom; use E2E for contrast).
- **VitePress demos:** `docs/.vitepress/components/demos/{button,input,field}/DemoGk*.vue` — one demo component per primitive.
- **Documentation:** composables guide, changelog page in VitePress, expanded README (layout, composables, RTL, axe).

### Changed

- **GkField** uses `useFieldIds()` internally instead of ad hoc `useId()` strings.
- **GkButton** / **GkInput** use density-related control tokens for padding and min-height; disabled styling uses tokenized opacity and text color.

## [0.1.0] - 2026-03-23

### Added

- Initial `@god-plan/god-kit` release: design tokens (`tokens.css`, `gkTokens`), **GkButton**, **GkInput**, **GkField**, Vuetify bridge CSS, Vitest unit tests, playground, VitePress docs, Stitch dev tooling (`tools/stitch`), and `god-panel-nuxt` demo page integration.
