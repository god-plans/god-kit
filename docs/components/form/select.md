---
title: GkSelect
description: Native select with options array and v-model.
outline: [2, 3]
---

# GkSelect

Native `<select>` backed by an **`options`** array. This stays close to the platform—no menu, virtual list, or combobox (those belong in app code or a future headless primitive).

## Live demo

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
| `size` | `number` | — | Native **`size`** (visible rows, often with **`multiple`**) |
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

## Example

```vue
<script setup lang="ts">
import { GkSelect } from 'god-kit/vue'
import { ref } from 'vue'

const value = ref<string | undefined>()
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>

<template>
  <GkSelect v-model="value" :options="options" aria-label="Choose" placeholder="Pick…" />
</template>
```

### Multiple

```vue
<script setup lang="ts">
import { ref } from 'vue'
const tags = ref<string[]>([])
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>

<template>
  <GkSelect v-model="tags" :options="options" multiple :size="4" aria-label="Tags" />
</template>
```
