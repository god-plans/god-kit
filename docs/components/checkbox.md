---
title: GkCheckbox
description: Boolean checkbox with v-model and optional GkField integration.
outline: [2, 3]
---

# GkCheckbox

Native `<input type="checkbox">` with tokenized focus styles. Pair with a visible `<label>` or pass **`ariaLabel`**.

## Live demo

<DemoGkCheckbox />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | Checked state |
| `id` | `string` | — | Overrides injected field id |
| `name` | `string` | — | Form name |
| `disabled` | `boolean` | `false` | Disabled |
| `ariaLabel` | `string` | — | Required when there is no visible label |

### Events

| Event | Payload |
|-------|---------|
| `update:modelValue` | `boolean` |

## Example

```vue
<script setup lang="ts">
import { GkCheckbox } from '@god-plan/god-kit/vue'
import { ref } from 'vue'
const ok = ref(false)
</script>

<template>
  <label>
    <GkCheckbox v-model="ok" />
    Accept
  </label>
</template>
```
