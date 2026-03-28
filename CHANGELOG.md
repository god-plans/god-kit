# Changelog

All notable changes to `@god-plan/god-kit` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **GkTabs** family (`src/vue/components/navigation/tabs/`): **`GkTabs`**, **`GkTab`**, **`GkTabsWindow`**, **`GkTabsWindowItem`**, **`parseGkTabItems`** (`gk-tab-items.ts`), **`GK_TABS`** / **`GkTabsContext`** in **`src/injection.ts`**. Docs at **`/components/navigation/tabs`**; subpath export **`@god-plan/god-kit/vue/navigation`**; tests **`GkTabs.spec.ts`**, **`GkTabs.a11y.spec.ts`**. Tokens **`--gk-tabs-*`**.
- **GkTooltip** (`src/vue/components/containment/tooltip/GkTooltip.vue`) + **`useTooltipPosition`** (`src/vue/composables/useTooltipPosition.ts`): activator slot, **`placement`** (**`top`** / **`bottom`** / **`start`** / **`end`**), **`openOnHover`** / **`openOnClick`** / **`openOnFocus`**, **`interactive`**, delays, **`aria-describedby`**, tokens **`--gk-tooltip-z-index`**, **`--gk-tooltip-max-width`**, padding, shadow. Docs at **`/components/containment/tooltip`**; tests **`GkTooltip.spec.ts`**, **`GkTooltip.a11y.spec.ts`**.
- **GkMenu** (`src/vue/components/containment/menu/GkMenu.vue`) + **`useMenuAnchorPosition`** (`src/vue/composables/useMenuAnchorPosition.ts`): activator slot, floating **`placement`**, outside dismiss, optional scrim, tokens **`--gk-menu-z-index`**, **`--gk-menu-min-width`**, **`--gk-menu-max-height`**, **`--gk-menu-shadow`**, **`--gk-menu-scrim`**. Docs at **`/components/containment/menu`**; tests **`GkMenu.spec.ts`**, **`GkMenu.a11y.spec.ts`**.
- **Expansion panels** (`src/vue/components/expansion/`): **`GkExpansionPanels`**, **`GkExpansionPanel`**, **`GkExpansionPanelTitle`**, **`GkExpansionPanelText`** with **`GK_EXPANSION_PANELS`** / **`GK_EXPANSION_PANEL`** injection keys and types in **`src/injection.ts`**. Docs at **`/components/expansion`**; tests **`GkExpansionPanels.spec.ts`**, **`GkExpansionPanels.a11y.spec.ts`**.
- **GkBottomSheet** (`src/vue/components/containment/bottom-sheet/GkBottomSheet.vue`): Bottom-anchored sheet on **GkOverlay** with **`gk-bottom-sheet`** transition, **`inset`**, **`scrollable`**, and tokens **`--gk-bottom-sheet-z-index`**, **`--gk-bottom-sheet-max-height`**, **`--gk-bottom-sheet-shadow`**. Docs at **`/components/containment/bottom-sheet`**; tests **`GkBottomSheet.spec.ts`**, **`GkBottomSheet.a11y.spec.ts`**.
- **GkDialog** (`src/vue/components/containment/dialog/GkDialog.vue`): Dialog shell on **GkOverlay** with **`fullscreen`**, **`scrollable`**, dimension props, **`afterEnter`** / **`afterLeave`**, and tokens **`--gk-dialog-z-index`**, **`--gk-dialog-max-width`**, **`--gk-dialog-scroll-max-height`**, **`--gk-dialog-shadow`**. Docs at **`/components/containment/dialog`**; tests **`GkDialog.spec.ts`**, **`GkDialog.a11y.spec.ts`**.
- **GkOverlay** (`src/vue/components/containment/overlay/GkOverlay.vue`): Teleported overlay with scrim, **`v-model`**, Escape / scrim dismiss, optional **`persistent`** (scrim and Escape do not close), body scroll lock, focus restore, and tokens **`--gk-overlay-scrim`** / **`--gk-overlay-z-index`**. Docs at **`/components/containment/overlay`**; tests **`GkOverlay.spec.ts`**, **`GkOverlay.a11y.spec.ts`**. **Containment** docs section and sidebar in VitePress.
- **GkForm** (`src/vue/components/form/gk-form/GkForm.vue`): native `<form>` with **`novalidate`**, **`submit`** emission with **`SubmitEventPromise`**, scoped slot helpers from **`createForm`**; composable **`createForm`**, **`attachSubmitPromise`**, and types in **`useForm.ts`**. Docs at **`/components/form/form`**; tests **`GkForm.spec.ts`**.
- **GkButton:** `loading`, `readonly`, `slim`, `stacked`, `href` / link props, `prepend` / `append` / `loader` slots, default loader via **GkSpinner**; **`useButtonInteractionState`** composable for shared click-block logic.
- **Documentation:** [Component authoring](docs/guide/component-authoring.md) — structure, Vuetify-style doc mapping, copy-paste agent prompt, and phasing guidance for large references (e.g. VBtn). Linked from [contributing docs](docs/guide/contributing-docs.md) and README.

### Changed

- **GkOverlay:** optional **`overlayClass`**, **`contentMaxWidth`**, **`transitionName`** (e.g. **`gk-bottom-sheet`**), **`gk-overlay--align-bottom`** / **`gk-overlay--inset`** layout helpers, **`afterEnter`** / **`afterLeave`** emissions, **`defineExpose`** (**`contentRef`**).
- **GkTextarea:** **`defineModel`** (optional **`v-model.trim`** on blur), **`inheritAttrs`**, **`autofocus`**, **`update:focused`**, **`defineExpose`** (`textarea`); wrapper **`gk-textarea__wrap`**.
- **GkRadioGroup** / **GkRadio:** **`defineModel`** on the group; group **`disabled`** / **`readonly`**; **`inheritAttrs`** on group; **`update:focused`** and **`inheritAttrs`** on radio; **`GK_RADIO_GROUP`** context extended with **`isDisabled`** / **`isReadonly`**.
- **GkSelect:** **`defineModel`**, **`multiple`** (array value), **`readonly`**, **`required`**, **`size`**, **`autocomplete`**, **`update:focused`**, **`inheritAttrs`**, **`defineExpose`** (`select` ref); stays native `<select>` (no VMenu / VList / chips / search).
- **GkCheckbox:** **`defineModel`**, **`indeterminate`**, **`readonly`** (behavioral + **`aria-readonly`**), optional **`value`**, **`update:focused`**, **`inheritAttrs`** (wrapper **`class`**, other attrs on `<input>`), **`defineExpose`** for native input; extended tests and a11y.
- **GkInput:** **`defineModel`** with **`v-model.trim`** / **`v-model.number`**; **`prefix`** / **`suffix`**; optional **`counter`** / **`counterValue`** / **`persistentCounter`**; **`autofocus`**; **`update:focused`**; **`counter`** slot; root **`class`** on wrapper, other attributes forwarded to `<input>`. Unit tests in **`GkInput.spec.ts`**.
- **GkAlert:** **`modelValue` / `v-model`**, **`title` / `text`** props and slots, **`prepend` / `append`**, optional accent **`border`**, **`prominent`**, optional **`type`** alias (`error` → `danger` when **`variant`** is default **`neutral`**), **`closable`** with **`GkButton`** close and **`closeLabel`**; emits **`close`** and **`click:close`**.
- **Layout:** form primitives (**GkInput**, **GkField**, **GkTextarea**, **GkCheckbox**, **GkRadio** / **GkRadioGroup**, **GkSelect**) now live under **`src/vue/components/form/<name>/`**. Docs and VitePress demos mirror this under **`docs/components/form/`** and **`docs/.vitepress/components/demos/form/`**. Component doc URLs are now **`/components/form/...`** (update bookmarks from the old flat paths).
- **`scripts/new-component.mjs`** accepts an optional second argument **`form`**, **`layout`**, or **`containment`** to scaffold into the matching folder and docs paths.

## [0.3.0] - 2026-03-23

### Added

- **Primitives:** `GkTextarea`, `GkCheckbox`, `GkRadioGroup`, `GkRadio`, `GkSelect`, `GkAlert`, `GkStack`, `GkContainer`, `GkDivider`, `GkSpinner` — each with unit tests, `*.a11y.spec.ts`, VitePress demo, and component docs.
- **Injection:** `GK_RADIO_GROUP` and `GkRadioGroupContext` for radio groups; optional `ariaLabel` on `GkRadioGroup`.
- **Tokens:** semantic surfaces for `--gk-color-success-surface`, `--gk-color-info-*`, `--gk-color-warning-*` (and dark theme equivalents); `gkTokens` exposes matching keys.
- **Subpath exports:** `@god-plan/god-kit/vue/form` and `@god-plan/god-kit/vue/layout` (multi-entry build; shared chunks with the main entry).
- **Docs:** [Architecture and tiers](./docs/guide/architecture.md) (from prior work), [Build and bundling](./docs/guide/build-and-bundling.md), [Consumer bundle analysis](./docs/guide/consumer-bundle-analysis.md).
- **Scaffolding:** `scripts/new-component.mjs` for new primitive stubs.

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
