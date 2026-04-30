---
title: GkInput
description: Text-like input with v-model and accessibility when used inside GkField.
outline: [2, 3]
---

# GkInput

Single-line input bound with **`v-model`**. When placed inside **[GkField](./field)**, it receives **`aria-invalid`** and **`aria-describedby`** from the field error region (and from the optional character counter when visible).

## When to use

Use for email, password, search, and other native input types. Pair with **GkField** for labels and validation messages.

## Live Examples

<DemoGkInput />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | required | Bound value (use **`v-model`**) |
| `id` | `string` | — | Override id (else inherits from GkField) |
| `name` | `string` | — | `name` attribute |
| `type` | `string` | `'text'` | Input type |
| `autocomplete` | `string` | — | Autocomplete hint |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Read-only |
| `ariaLabel` | `string` | — | Use when no visible label |
| `autofocus` | `boolean` | `false` | Focus the control on mount |
| `prefix` | `string` | — | Static text before the field |
| `suffix` | `string` | — | Static text after the field |
| `counter` | `boolean \| number \| string` | — | Show a character count; **`true`** = count only; **number** or numeric **string** = max (shown as `n / max`) |
| `counterValue` | `number \| (value: string) => number` | — | Override the displayed count |
| `persistentCounter` | `boolean` | `false` | When **`true`**, the counter is always shown; otherwise only while focused |
| `role` | `string` | — | Passed to the native `<input>` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Visual control scale; omit to use **`GK_FORM_CONTROLS`** / [global defaults](/guide/global-configuration#form-control-size) (default **`md`**) |

Root attributes (except **`class`**, which applies to the outer wrapper) are forwarded to the `<input>`.

### Modifiers

Use Vue’s **`v-model` modifiers** on **GkInput**:

| Modifier | Behavior |
|----------|----------|
| **`.trim`** | On **blur**, the value is trimmed (for `text`, `search`, `password`, `tel`, `url`). |
| **`.number`** | Coerces to a number when possible (empty string stays empty). |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Emitted on input |
| `update:focused` | `boolean` | **`true`** on focus, **`false`** on blur |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `counter` | `{ count, max }` | Replace the default counter text |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Prefer wrapping `GkInput` with `GkField` for label and error semantics.
- When used standalone, pass `ariaLabel` so the control has an accessible name.
- Use `persistentCounter` for always-visible limits in forms with strict input quotas.

## Related

- [Form control size](/guide/global-configuration#form-control-size) — app, subtree, and form defaults
- [GkField](./field)
- [GkTextarea](./textarea)
- [GkSelect](./select)
