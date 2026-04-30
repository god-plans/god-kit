---
title: GkSelect
description: Native select with options array and v-model.
outline: [2, 3]
---

# GkSelect

Native `<select>` backed by an **`options`** array. This stays close to the platform—no menu, virtual list, or combobox (those belong in app code or a future headless primitive).

## When to use

Use for native single or multi-select controls where platform keyboard behavior is preferred over a custom combobox UI.

## Live Examples

<DemoGkSelect />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| (string \| number)[] \| undefined` | — | Selected value; **array** when **`multiple`** is `true` |
| `options` | `GkSelectOption[]` | required | Options list |
| `id` | `string` | — | Overrides injected field id |
| `name` | `string` | — | Form name |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Reverts change and sets **`aria-readonly`** (native **`readonly`** is not reliable on `<select>`) |
| `multiple` | `boolean` | `false` | Native **`multiple`**; use an **array** `modelValue` |
| `required` | `boolean` | — | Native **`required`** |
| `size` | **`GkFormControlSize` \| `number`** | — | **String** (`'xs'` … `'xl'`): [visual control scale](/guide/global-configuration#form-control-size). **Number**: native **`<select size="n">`** (visible rows, often with **`multiple`**); visual size then comes from **defaults** / **`GK_FORM_CONTROLS`**. |
| `placeholder` | `string` | — | First disabled option (`value=""`) |
| `autocomplete` | `string` | — | Native **`autocomplete`** |
| `ariaLabel` | `string` | — | When not inside **GkField** |

Root **`class`** applies to the wrapper; other attributes are forwarded to **`<select>`**.

`GkSelectOption`: `{ value: string | number; label: string; disabled?: boolean }`

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| (string \| number)[] \| undefined` | New selection |
| `update:focused` | `boolean` | `true` on focus, `false` on blur |

### Expose

| Name | Type | Description |
|------|------|-------------|
| `select` | `HTMLSelectElement` | Native `<select>` |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

## Accessibility notes

- Wrap with `GkField` for visible labels and error semantics in forms.
- Provide `ariaLabel` when used standalone.
- For **`multiple`**, pass a **numeric** **`size`** (native visible rows) when you need a listbox. For a single closed dropdown, use a **string** **`size`** (or [global default](/guide/global-configuration#form-control-size)) for typography and hit area only.

## Related components

- [GkInput](./input)
- [GkField](./field)
- [GkRadioGroup & GkRadio](./radio)
