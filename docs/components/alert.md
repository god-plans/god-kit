---
title: GkAlert
description: Inline status message with semantic variants.
outline: [2, 3]
---

# GkAlert

Non-modal status region. Default **`role="status"`**; use **`role="alert"`** for urgent, interruptive messages.

## Live demo

<DemoGkAlert />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Tone |
| `role` | `'status' \| 'alert'` | `'status'` | ARIA role |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Message body |

## Example

```vue
<script setup lang="ts">
import { GkAlert } from '@god-plan/god-kit/vue'
</script>

<template>
  <GkAlert variant="success">Saved.</GkAlert>
</template>
```
