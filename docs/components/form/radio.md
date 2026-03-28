---
title: GkRadioGroup & GkRadio
description: Radio group with v-model; radios must live inside GkRadioGroup.
outline: [2, 3]
---

# GkRadioGroup & GkRadio

**GkRadioGroup** provides a shared `name` and **`v-model`** for **GkRadio** children, with optional **group `disabled`** / **`readonly`** (aligned with **GkCheckbox** / **GkInput** patterns). Use **`ariaLabel`** on the group when there is no visible group heading.

## Live demo

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

## Example

```vue
<script setup lang="ts">
import { GkRadio, GkRadioGroup } from 'god-kit/vue'
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
