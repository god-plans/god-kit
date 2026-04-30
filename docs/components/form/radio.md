---
title: GkRadioGroup & GkRadio
description: Radio group with v-model; radios must live inside GkRadioGroup.
outline: [2, 3]
---

# GkRadioGroup & GkRadio

**GkRadioGroup** provides a shared `name` and **`v-model`** for **GkRadio** children, with optional **group `disabled`** / **`readonly`** (aligned with **GkCheckbox** / **GkInput** patterns). Use **`ariaLabel`** on the group when there is no visible group heading.

## When to use

Use radios when users must choose exactly one option from a small, mutually exclusive set.

## Live Examples

<DemoGkRadio />

## API

### GkRadioGroup props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| undefined` | — | Selected value (`v-model`) |
| `name` | `string` | — | Optional; defaults to a stable generated name |
| `ariaLabel` | `string` | — | Accessible name for the radiogroup |
| `disabled` | `boolean` | `false` | Disables all radios (each radio can still set `disabled`) |
| `readonly` | `boolean` | `false` | Prevents changing the selection; **`aria-readonly`** on the group |

Root **`class`** applies to the group container; other attributes are forwarded to the **`radiogroup`** wrapper.

### GkRadio props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | required | Value when this option is selected |
| `disabled` | `boolean` | `false` | Disables this option (combined with group **`disabled`**) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Scales the radio and label typography; omit for **[global defaults](/guide/global-configuration#form-control-size)** |

### Events (GkRadioGroup)

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| undefined` | New selection |

### Events (GkRadio)

| Event | Payload | Description |
|-------|---------|-------------|
| `update:focused` | `boolean` | Focus on the native radio |

### Expose (GkRadio)

| Name | Type | Description |
|------|------|-------------|
| `input` | `HTMLInputElement` | Native radio |

## **`GK_RADIO_GROUP`**

Injected context includes **`isDisabled`** and **`isReadonly`** for the group. See **[Composables](/guide/composables)** and **`GkRadioGroupContext`** in the package types.

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

## Accessibility notes

- Provide a group-level label (`ariaLabel` or visible heading) so assistive tech can announce context.
- Use radios only when one and only one option can be selected.

## Related components

- [GkCheckbox](./checkbox)
- [GkSelect](./select)
- [GkField](./field)
