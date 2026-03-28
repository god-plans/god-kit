---
title: GkSkeletonLoader
description: Preset skeleton layouts (card, list, table, …) with shimmer or boilerplate blocks.
outline: [2, 3]
---

# GkSkeletonLoader

A **placeholder surface** modeled after Vuetify’s **VSkeletonLoader**: **`type`** selects a **preset graph** of “bones” (text bars, avatars, image blocks, …), rendered recursively with a **shimmer** overlay. When there is **no default slot**, the skeleton shows; when there **is** a default slot, the skeleton shows only while **`loading`** is **`true`**.

Use **`boilerplate`** for static placeholders (no **`role="alert"`** / live region). Otherwise the loading root exposes **`aria-live="polite"`**, **`role="alert"`**, and **`aria-label`** from **`loadingText`**.

There is **no** theme / locale composable layer — **`loadingText`** is a plain string (defaults to **`Loading`**).

## Live demo

<DemoGkSkeletonLoader />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | When a **default** slot exists, show skeleton while **`true`** |
| `type` | **`GkSkeletonLoaderType`**, `string`, or **array** | `'ossein'` | Preset key(s); arrays are joined with commas (e.g. **`['heading','paragraph']`**) |
| `boilerplate` | `boolean` | `false` | Decorative only — disables shimmer and alert semantics |
| `loadingText` | `string` | `'Loading'` | **`aria-label`** when not **`boilerplate`** |
| `color` | `string` | — | Sets **`--gk-skeleton-loader-wave`** for the shimmer highlight |
| `width` / `height` / `maxWidth` / `maxHeight` | `number \| string` | — | Applied to the root |
| `elevation` | `0`–`5` | — | Shadow preset on the root |

Additional attributes are forwarded to the skeleton root (not to bones).

### Slots

| Slot | Description |
|------|-------------|
| `default` | Real content; shown when **`loading`** is **`false`** (or omitted with no **`loading`** when the slot is present) |

### Presets

Keys are listed on **`gkSkeletonRootTypes`** (exported from **`@god-plan/god-kit/vue`**). Examples: **`card`**, **`article`**, **`table`**, **`list-item-avatar`**, **`date-picker`**, **`paragraph`**, **`ossein`**.

### Utilities

| Export | Description |
|--------|-------------|
| **`genGkSkeletonStructure(type)`** | Returns a **`GkSkeletonNode[]`** tree for tests or custom renderers |
| **`wrapGkSkeletonTypes(type)`** | Normalizes **`type`** to a comma-separated string |
| **`isGkSkeletonLoaderType(value)`** | Type guard for preset keys |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-skeleton-loader-track` | Bone base fill |
| `--gk-skeleton-loader-wave` | Shimmer highlight |
| `--gk-skeleton-loader-shimmer-duration` | Animation length |
| `--gk-skeleton-loader-*-height` / **`-size`** | Bone dimensions |
