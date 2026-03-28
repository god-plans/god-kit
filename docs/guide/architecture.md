---
title: Architecture and tiers
description: Primitives, patterns, and blocks — how God Kit scales without 200 unrelated components.
outline: [2, 3]
---

# Architecture and tiers

God Kit is organized in **three layers**. Not every UI piece should be a new primitive in this package.

## Primitives

Low-level, reusable building blocks with a single responsibility:

- Examples: **GkButton**, **GkInput**, **GkCheckbox**, **GkStack**, **GkOverlay**, **GkDialog**, **GkBottomSheet**, **GkMenu**, **GkTooltip**, **GkTabs**, **GkExpansionPanels** (overlays / modal layers / disclosure / tabs)
- Live in `src/vue/components/<name>/` (e.g. **form** controls under `src/vue/components/form/<name>/`, **containment** under `src/vue/components/containment/<name>/`)
- Ship with tests, axe specs, VitePress demo, and docs page

## Patterns

Compose primitives into recurring UX structures:

- Examples: **GkField** (label + control slot + error) wrapping **GkInput** / **GkTextarea**
- Patterns may **provide** context (e.g. `GK_FIELD`, radio group) so primitives stay dumb

## Blocks and recipes

Page-level or product-specific compositions:

- Login cards, dashboard sections, settings panels
- Usually **live in the app** (`god-panel-nuxt`) or as **documentation recipes** (copy-paste examples), not as exported components in God Kit—unless they are truly generic across products

## Naming

- Prefix **`Gk`** for exported components
- Prefer **variants via props** over new component names when the DOM role is the same (e.g. button `variant="danger"` vs `GkDangerButton`)

## See also

- [Composables](./composables) — headless behavior shared across tiers
- [Contributing docs](./contributing-docs) — how to add a primitive
