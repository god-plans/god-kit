---
title: GkDivider
description: Visual separator with role=separator and orientation.
outline: [2, 3]
---

# GkDivider

One-pixel divider using **`border`** tokens. Exposes **`role="separator"`** and **`aria-orientation`**.

## Live demo

<DemoGkDivider />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |

## Example

```vue
<script setup lang="ts">
import { GkDivider } from 'god-kit/vue'
</script>

<template>
  <GkDivider />
</template>
```
