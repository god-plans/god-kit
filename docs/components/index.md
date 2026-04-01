---
title: Vue 3 Admin Components
description: Browse God Kit components for Vue 3 and Nuxt 4 admin dashboards, including forms, containment, navigation, and feedback primitives.
outline: [2, 3]
---

# Components

Primitives use the **`Gk`** prefix. Each page documents props, events, slots, and examples. **Form** controls live under **`/components/form`** in the docs and under **`src/vue/components/form/`** in the package.

## Quick add

```bash
npx god-kit@latest add button
```

Compatibility alias: `npx add gk button`.

The CLI currently targets Vue Vite and Nuxt projects, supports `--yes`, `--dry-run`, `--cwd`, and `--force`, and currently ships with the MVP registry key `button`.

## Integration recipes

- [Form validation flow](./form/form) — `GkForm` + `GkField` + controls
- [Dialog actions](./containment/dialog) — `GkDialog` + `GkButton`
- [Async feedback](./feedback/snackbar) — `GkSnackbar` + `pushGkSnackbar`
- [Navigation shell](./containment/navigation-drawer) — drawer + tabs/pagination patterns

## Form

| Component | Description |
|-----------|-------------|
| [GkForm](./form/form) | Native `<form>` with validation slot helpers and **`createForm`** |
| [GkInput](./form/input) | Text-like input with v-model and field integration |
| [GkField](./form/field) | Label, control slot, and error region for forms |
| [GkTextarea](./form/textarea) | Multiline text with **GkField** integration |
| [GkCheckbox](./form/checkbox) | Boolean checkbox with v-model |
| [GkRadioGroup & GkRadio](./form/radio) | Radio group with shared name and v-model |
| [GkSelect](./form/select) | Native `<select>` with options array |

## Navigation

| Component | Description |
|-----------|-------------|
| [GkTabs](./navigation/tabs) | Tab list + panels — **`v-model`**, **`items`** or **`GkTab`** + **`#window`**, **`GK_TABS`** injection |
| [GkPagination](./navigation/pagination) | Page navigation — ellipsis, **`totalVisible`**, first/last, **`buildPaginationRange`** |

## Containment

Overlays, modal shells, and other primitives that **contain** focus and layer above the page.

| Component | Description |
|-----------|-------------|
| [GkOverlay](./containment/overlay) | Teleported overlay with scrim, **`v-model`**, Escape / scrim dismiss, body scroll lock, and tokenized stacking |
| [GkDialog](./containment/dialog) | Dialog shell built on **GkOverlay** — **`fullscreen`**, **`scrollable`**, sizing props, **`afterEnter`** / **`afterLeave`** |
| [GkBottomSheet](./containment/bottom-sheet) | Bottom-anchored sheet on **GkOverlay** — **`inset`**, **`scrollable`**, slide-up transition |
| [GkMenu](./containment/menu) | Floating menu — activator slot, **`placement`**, **`useMenuAnchorPosition`**, outside dismiss |
| [GkTooltip](./containment/tooltip) | Tooltip — hover / focus / click, **`interactive`**, **`useTooltipPosition`** |
| [GkNavigationDrawer](./containment/navigation-drawer) | Side / bottom nav — **`temporary`** scrim, **`rail`**, **`location`**, slots |

## Expansion

| Component | Description |
|-----------|-------------|
| [GkExpansionPanels](./expansion) | Accordion container with **`v-model`** (open keys), **`multiple`**, **`disabled`** |
| (children) | **GkExpansionPanel**, **GkExpansionPanelTitle**, **GkExpansionPanelText** — see the expansion page |

## Feedback & layout

| Component | Description |
|-----------|-------------|
| [GkButton](./button) | Button with primary, secondary, ghost, and danger variants |
| [GkAlert](./alert) | Inline status messages with variants |
| [GkStack](./stack) | Flex row/column layout with token gap |
| [GkContainer](./container) | Centered max-width container |
| [GkDivider](./divider) | Horizontal or vertical separator |
| [GkSpinner](./spinner) | Loading indicator with `role="status"` |
| [GkSkeletonLoader](./feedback/skeleton-loader) | Preset skeleton layouts — **`type`**, shimmer / **`boilerplate`**, **`loading`** |
| [GkSnackbar](./feedback/snackbar) | Transient messages — **`timeout`**, **`timer`**, **`pushGkSnackbar`**, **`GkSnackbarHost`** |

Form-focused imports are also available from **`god-kit/vue/form`**, layout primitives from **`god-kit/vue/layout`**, and navigation primitives from **`god-kit/vue/navigation`** (see [Build and bundling](../guide/build-and-bundling)).

## Maintenance notes

- Keep this index, the components sidebar in `docs/.vitepress/config.ts`, and demo registrations in `docs/.vitepress/theme/index.ts` synchronized in the same PR.
- Use the checklist in [Contributing docs](../guide/contributing-docs) when adding or expanding examples.
