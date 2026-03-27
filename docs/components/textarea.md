---
title: GkTextarea
description: Multiline text control with v-model and GkField integration.
outline: [2, 3]
---

# GkTextarea

Native `<textarea>` with God Kit styling. Works with **`GkField`** for labels and errors.

## Live demo

<DemoGkTextarea />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Bound text |
| `id` | `string` | — | Overrides injected field id |
| `name` | `string` | — | Form name |
| `rows` | `number` | `4` | Visible rows |
| `placeholder` | `string` | — | Placeholder |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Read-only |
| `autocomplete` | `string` | — | Autocomplete hint |
| `ariaLabel` | `string` | — | When not inside **GkField** |

### Events

| Event | Payload |
|-------|---------|
| `update:modelValue` | `string` |

## Example

```vue
<script setup lang="ts">
import { GkField, GkTextarea } from '@god-plan/god-kit/vue'
import { ref } from 'vue'
const notes = ref('')
</script>

<template>
  <GkField label="Notes">
    <GkTextarea v-model="notes" :rows="4" />
  </GkField>
</template>
```
