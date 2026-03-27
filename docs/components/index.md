---
title: Components
description: Index of God Kit Vue primitives.
outline: [2, 3]
---

# Components

Primitives use the **`Gk`** prefix. Each page documents props, events, slots, and examples. **Form** controls live under **`/components/form`** in the docs and under **`src/vue/components/form/`** in the package.

## Form

| Component | Description |
|-----------|-------------|
| [GkInput](./form/input) | Text-like input with v-model and field integration |
| [GkField](./form/field) | Label, control slot, and error region for forms |
| [GkTextarea](./form/textarea) | Multiline text with **GkField** integration |
| [GkCheckbox](./form/checkbox) | Boolean checkbox with v-model |
| [GkRadioGroup & GkRadio](./form/radio) | Radio group with shared name and v-model |
| [GkSelect](./form/select) | Native `<select>` with options array |

## Feedback & layout

| Component | Description |
|-----------|-------------|
| [GkButton](./button) | Button with primary, secondary, ghost, and danger variants |
| [GkAlert](./alert) | Inline status messages with variants |
| [GkStack](./stack) | Flex row/column layout with token gap |
| [GkContainer](./container) | Centered max-width container |
| [GkDivider](./divider) | Horizontal or vertical separator |
| [GkSpinner](./spinner) | Loading indicator with `role="status"` |

Form-focused imports are also available from **`@god-plan/god-kit/vue/form`**, and layout primitives from **`@god-plan/god-kit/vue/layout`** (see [Build and bundling](../guide/build-and-bundling)).
