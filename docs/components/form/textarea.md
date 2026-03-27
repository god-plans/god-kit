---
title: GkTextarea
description: Multiline text control with v-model and GkField integration.
outline: [2, 3]
---

# GkTextarea

Native `<textarea>` with God Kit styling aligned with **GkInput** (wrapper, attrs forwarding, focus events). Works with **`GkField`** for labels and errors.

## Live demo

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
