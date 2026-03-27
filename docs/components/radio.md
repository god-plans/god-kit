---
title: GkRadioGroup & GkRadio
description: Radio group with v-model; radios must live inside GkRadioGroup.
outline: [2, 3]
---

# GkRadioGroup & GkRadio

**GkRadioGroup** provides a shared `name` and `v-model` for **GkRadio** children. Use **`ariaLabel`** on the group when there is no visible group heading.

## Live demo

<DemoGkRadio />

## API

### GkRadioGroup props

| Prop | Type | Description |
|------|------|-------------|
| `modelValue` | `string \| number \| undefined` | Selected value |
| `name` | `string` | Optional; defaults to a stable generated name |
| `ariaLabel` | `string` | Accessible name for the radiogroup |

### GkRadio props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string \| number` | Value when this option is selected |
| `disabled` | `boolean` | Disables this option |

### Events (GkRadioGroup)

| Event | Payload |
|-------|---------|
| `update:modelValue` | `string \| number` |

## Example

```vue
<script setup lang="ts">
import { GkRadio, GkRadioGroup } from '@god-plan/god-kit/vue'
import { ref } from 'vue'
const theme = ref<'light' | 'dark'>('light')
</script>

<template>
  <GkRadioGroup v-model="theme" aria-label="Theme">
    <GkRadio value="light">Light</GkRadio>
    <GkRadio value="dark">Dark</GkRadio>
  </GkRadioGroup>
</template>
```
