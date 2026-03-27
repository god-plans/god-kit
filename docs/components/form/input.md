---
title: GkInput
description: Text-like input with v-model and accessibility when used inside GkField.
outline: [2, 3]
---

# GkInput

Single-line input bound with **`v-model`**. When placed inside **[GkField](./field)**, it receives **`aria-invalid`** and **`aria-describedby`** from the field error region.

## When to use

Use for email, password, search, and other native input types. Pair with **GkField** for labels and validation messages.

## Live demo

<DemoGkInput />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | required | Bound value |
| `id` | `string` | — | Override id (else inherits from GkField) |
| `name` | `string` | — | `name` attribute |
| `type` | `string` | `'text'` | Input type |
| `autocomplete` | `string` | — | Autocomplete hint |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Read-only |
| `ariaLabel` | `string` | — | Use when no visible label |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on input |

### Slots

None.

## Examples

### Basic

```vue
<script setup lang="ts">
import { GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <GkField label="Name">
    <GkInput v-model="value" autocomplete="name" />
  </GkField>
</template>
```
