---
title: Changelog
description: Release history for god-kit.
outline: [2, 3]
---

# Changelog

All notable changes to `god-kit` are documented in this page and in **`CHANGELOG.md`** at the package root (authoritative history).

## [Unreleased]

### Added

- **GkCard** — card surface, subcomponents, and **`--gk-card-*`** tokens; see **[GkCard](../components/containment/gk-card)** and root **`CHANGELOG.md`**. CLI: **`npx god-kit add card`**.
- **GkCard docs playground** — focused live examples powered by raw sample-source imports, syntax-highlighted collapsible code blocks, and a lightweight option editor that generates Vue snippets.
- **GkGrid** — responsive layout grid; see the **[GkGrid](../components/grid)** component page and root **`CHANGELOG.md`**.

## [0.8.0] - 2026-04-17

### Added

- **Design system:** stepped **`tokens.css`** palettes (gray, purple **primary**, success, error, warning, info), elevation tokens, typography variables, dark overrides, and **`gkTokens`** **`palette`** / **`elevation`** / **`text`**. CLI **`add`** registry covers 37 `Gk*` components. Playground: **`createGkKit`** + theme switcher. See root **`CHANGELOG.md`** for full notes.

### Changed

- Default **light** theme uses the new system (purple primary at step 600).

### Fixed

- Playground Vite **`alias`**: **`god-kit/vue/config`** before **`god-kit/vue`**.

## [0.7.0] - 2026-04-01

### Changed

- **Documentation sample architecture:** standardized component-doc structure with explicit **When to use**, **Examples** (`Basic`, `Advanced`, `Edge case`), **Accessibility notes**, and **Related components** sections.
- **Demo scenario quality:** expanded high-impact demo coverage across form, containment, and navigation primitives to better show disabled/readonly/loading/keyboard/RTL edge behaviors.
- **Catalog consistency:** normalized component pages with integration-oriented examples and cross-links to improve discoverability and reduce doc drift.
- **Contributor governance:** updated docs authoring guidance with category path conventions, sample taxonomy, merge checklist, and ownership/audit cadence for ongoing sample quality.

## [0.4.0] - 2026-04-01

### Added

- **Global configuration:** **`createGkKit`** (`god-kit/vue/config`), **`useGkTheme`**, **`useGkDisplay`**, **`useGkLocale`**, **`useGkDefaults`**, **`GkThemeProvider`**, **`GkLocaleProvider`**, **`GkDefaultsProvider`**, injection keys **`GK_THEME`**, **`GK_DISPLAY_CONFIG`**, **`GK_LOCALE`**, **`GK_DEFAULTS`**, **`data-gk-theme`** / dark tokens, English **`gkEnMessages`**, **`GkVueI18nAdapter`**. Guide: **[Global configuration](./global-configuration)**.
- **GkSnackbar** + **`GkSnackbarHost`**, **`pushGkSnackbar`** / **`useGkSnackbar`** — see **`/components/feedback/snackbar`** and root **`CHANGELOG.md`**.
- **GkSkeletonLoader** — see **`/components/feedback/skeleton-loader`** and root **`CHANGELOG.md`**.
- **GkNavigationDrawer** — see **`/components/containment/navigation-drawer`** and root **`CHANGELOG.md`**.
- **GkPagination** + **`pagination-range`** — see **`/components/navigation/pagination`** and root **`CHANGELOG.md`**.
- **GkTabs** family + **`GK_TABS`** — see **`/components/navigation/tabs`**, **`god-kit/vue/navigation`**, and root **`CHANGELOG.md`**.
- **GkTooltip** + **`useTooltipPosition`** — see **`/components/containment/tooltip`** and root **`CHANGELOG.md`**.
- **GkMenu** + **`useMenuAnchorPosition`** — see **`/components/containment/menu`** and root **`CHANGELOG.md`**.
- **Expansion panels** — **`GkExpansionPanels`**, **`GkExpansionPanel`**, **`GkExpansionPanelTitle`**, **`GkExpansionPanelText`**; see **`/components/expansion`** and root **`CHANGELOG.md`**.
- **GkBottomSheet** — Bottom sheet on **GkOverlay**; see **`/components/containment/bottom-sheet`** and root **`CHANGELOG.md`**.
- **GkDialog** — Dialog shell on **GkOverlay**; see **`/components/containment/dialog`** and root **`CHANGELOG.md`**.
- **GkOverlay** — Teleported overlay primitive; see **`/components/containment/overlay`** and root **`CHANGELOG.md`**.
- **GkForm** + **`createForm`** / **`attachSubmitPromise`** — see **`/components/form/form`** and root **`CHANGELOG.md`**.
- **GkButton:** `loading`, `readonly`, `slim`, `stacked`, `href` / link props, `prepend` / `append` / `loader` slots, default loader via **GkSpinner**; **`useButtonInteractionState`** composable for shared click-block logic.
- **Documentation:** [Component authoring](./component-authoring) — structure, doc mapping, agent prompt, phasing for large references. See root **`CHANGELOG.md`** for the full note.
- **Documentation:** [Global configuration](./global-configuration) — config file pattern, full **`GkKitOptions`** tables, multi-locale and theme vs display. See root **`CHANGELOG.md`**.

### Changed

- **GkNavigationDrawer:** temporary / responsive overlay uses **`useGkDisplay().mobile`** (same default threshold as legacy **`max-width: 959px`** via **`md`** breakpoint).
- **GkOverlay:** **`overlayClass`**, **`contentMaxWidth`**, **`transitionName`**, layout helpers, **`afterEnter`** / **`afterLeave`**, **`contentRef`** expose. See root **`CHANGELOG.md`**.
- **GkTextarea** / **GkRadio** / **GkRadioGroup:** attrs forwarding, **`update:focused`**, **`GK_RADIO_GROUP`** updates. See root **`CHANGELOG.md`**.
- **GkSelect:** **`multiple`**, **`readonly`**, **`update:focused`**, attrs forwarding. See root **`CHANGELOG.md`**.
- **GkCheckbox:** **`indeterminate`**, **`readonly`**, **`value`**, **`update:focused`**, attrs forwarding. See root **`CHANGELOG.md`**.
- **GkInput:** **`v-model.trim`** / **`v-model.number`**, **`prefix`** / **`suffix`**, **`counter`**, **`autofocus`**, **`update:focused`**, **`counter`** slot. See root **`CHANGELOG.md`**.
- **GkAlert:** **`modelValue` / `v-model`**, **`title` / `text`** props and slots, **`prepend` / `append`**, optional accent **`border`**, **`prominent`**, optional **`type`** alias (`error` → `danger`), **`closable`** with **`GkButton`** close; emits **`close`** / **`click:close`**. See root **`CHANGELOG.md`**.
- **Layout:** form primitives are under **`src/vue/components/form/<name>/`**; docs at **`/components/form/...`**; **`scripts/new-component.mjs`** accepts optional **`form`**, **`layout`**, or **`containment`**. See root **`CHANGELOG.md`** for details.

## [0.3.0] - 2026-03-23

### Added

- **Primitives:** `GkTextarea`, `GkCheckbox`, `GkRadioGroup`, `GkRadio`, `GkSelect`, `GkAlert`, `GkStack`, `GkContainer`, `GkDivider`, `GkSpinner` — each with unit tests, `*.a11y.spec.ts`, VitePress demo, and component docs.
- **Injection:** `GK_RADIO_GROUP` and `GkRadioGroupContext` for radio groups; optional `ariaLabel` on `GkRadioGroup`.
- **Tokens:** semantic surfaces for success, info, and warning (CSS + `gkTokens` keys).
- **Subpath exports:** `god-kit/vue/form` and `god-kit/vue/layout`.
- **Docs:** [Build and bundling](./build-and-bundling), [Consumer bundle analysis](./consumer-bundle-analysis).
- **Scaffolding:** `scripts/new-component.mjs` for new primitive stubs.

## [0.2.0] - 2026-03-23

### Added

- **Package layout:** one folder per primitive under `src/vue/components/{button,field,input}/` with co-located tests.
- **Composables:** `useFieldIds()` and `useFormControl()` for stable ids and headless ARIA-oriented state (exported from `god-kit/vue`).
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

- Initial `god-kit` release: design tokens (`tokens.css`, `gkTokens`), **GkButton**, **GkInput**, **GkField**, Vuetify bridge CSS, Vitest unit tests, playground, VitePress docs, Stitch dev tooling (`tools/stitch`), and `god-panel-nuxt` demo page integration.
