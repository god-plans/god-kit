---
title: GkSelect
description: Native select with options array and v-model.
outline: [2, 3]
---

# GkSelect

Native `<select>` backed by an **`options`** array. For combobox behavior later, use a dedicated headless pattern; this primitive stays close to the platform.

## Live demo

<DemoGkSelect />

## API

### Props

| Prop | Type | Description |
|------|------|-------------|
| `modelValue` | `string \| number \| undefined` | Selected value |
| `options` | `GkSelectOption[]` | Options list |
| `id` | `string` | Overrides injected field id |
| `name` | `string` | Form name |
| `disabled` | `boolean` | Disabled |
| `placeholder` | `string` | First disabled option (value `""`) |
| `ariaLabel` | `string` | When not inside **GkField** |

`GkSelectOption`: `{ value: string | number; label: string; disabled?: boolean }`

### Events

| Event | Payload |
|-------|---------|
| `update:modelValue` | `string \| number \| undefined` |

## Example

```vue
<script setup lang="ts">
import { GkSelect } from '@god-plan/god-kit/vue'
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
