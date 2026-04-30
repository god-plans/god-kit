---
title: GkTextarea
description: Multiline text control with v-model and GkField integration.
outline: [2, 3]
---

# GkTextarea

Native `<textarea>` with God Kit styling aligned with **GkInput** (wrapper, attrs forwarding, focus events). Works with **`GkField`** for labels and errors.

## When to use

Use for free-form multi-line input such as notes, descriptions, and support context fields.

## Live Examples

<DemoGkTextarea />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | required | Bound text (`v-model`) |
| `id` | `string` | — | Overrides injected field id |
| `name` | `string` | — | Form name |
| `rows` | `number` | `4` | Visible rows |
| `placeholder` | `string` | — | Placeholder |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Read-only |
| `autocomplete` | `string` | — | Autocomplete hint |
| `autofocus` | `boolean` | `false` | Focus on mount |
| `ariaLabel` | `string` | — | When not inside **GkField** |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Visual control scale; omit for **`GK_FORM_CONTROLS`** / [global defaults](/guide/global-configuration#form-control-size) |

Root **`class`** applies to the wrapper; other attributes are forwarded to **`<textarea>`**.

Use **`v-model.trim`** to trim on blur (same idea as **GkInput**).

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on input |
| `update:focused` | `boolean` | `true` on focus, `false` on blur |

### Expose

| Name | Type | Description |
|------|------|-------------|
| `textarea` | `HTMLTextAreaElement` | Native element |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

## Accessibility notes

- Keep labels visible through `GkField` where possible; use `ariaLabel` only for standalone cases.
- For long text, ensure focus styles remain visible in scrollable layouts.

## Related

- [Form control size](/guide/global-configuration#form-control-size)
- [GkInput](./input)
- [GkField](./field)
- [GkForm](./form)
