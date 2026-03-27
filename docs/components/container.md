---
title: GkContainer
description: Centered max-width container with optional horizontal padding.
outline: [2, 3]
---

# GkContainer

Constrains content width for readable line lengths. **`maxWidth`** maps to **`sm` / `md` / `lg` / `full`**.

## Live demo

<DemoGkContainer />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | `'div'` | Root element |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Max width |
| `padded` | `boolean` | `true` | Horizontal padding |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content |

## Example

```vue
<script setup lang="ts">
import { GkContainer } from '@god-plan/god-kit/vue'
</script>

<template>
  <GkContainer max-width="lg">
    <p>Article body</p>
  </GkContainer>
</template>
```
