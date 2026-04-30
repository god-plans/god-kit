---
title: GkCheckbox
description: Boolean checkbox with v-model and optional GkField integration.
outline: [2, 3]
---

# GkCheckbox

Native `<input type="checkbox">` with tokenized focus styles, wrapped in an **`inline-flex`** container so it aligns with adjacent labels. Pair with a visible `<label>` or pass **`ariaLabel`**.

## When to use

Use for binary choices and “select all” controls where each option can be independently toggled.

## Live Examples

<DemoGkCheckbox />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | required | Checked state (`v-model`) |
| `id` | `string` | — | Overrides injected field id |
| `name` | `string` | — | Form name |
| `value` | `string` | — | Native **`value`** attribute (e.g. for named groups) |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Prevents toggling; uses **`aria-readonly`** and reverts change (native **`readonly`** is not used on checkboxes) |
| `indeterminate` | `boolean` | `false` | Sets the native **indeterminate** state (separate from checked) |
| `ariaLabel` | `string` | — | Required when there is no visible label |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Scales the control and related type size; omit for **[global defaults](/guide/global-configuration#form-control-size)** |

Root **`class`** applies to the outer wrapper; other attributes are forwarded to the `<input>`.

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the checked state changes |
| `update:focused` | `boolean` | `true` on focus, `false` on blur |

### Expose

| Name | Type | Description |
|------|------|-------------|
| `input` | `HTMLInputElement` | The native checkbox element |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

## Accessibility notes

- Provide visible label text or `ariaLabel` so each checkbox has a clear accessible name.
- Use `indeterminate` only to communicate partial selection state, not as a third boolean value.

## Related components

- [GkRadioGroup & GkRadio](./radio)
- [GkField](./field)
- [GkSelect](./select)
