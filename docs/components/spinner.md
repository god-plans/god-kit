---
title: GkSpinner
description: Inline loading indicator with status role and label.
outline: [2, 3]
---

# GkSpinner

CSS spinner with **`role="status"`**, **`aria-live="polite"`**, and configurable **`aria-label`**.

## Live demo

<DemoGkSpinner />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Visual size |
| `label` | `string` | `'Loading'` | Exposed to assistive tech |

## Example

```vue
<script setup lang="ts">
import { GkSpinner } from 'god-kit/vue'
</script>

<template>
  <GkSpinner label="Saving" />
</template>
```
