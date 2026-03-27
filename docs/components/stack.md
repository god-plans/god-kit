---
title: GkStack
description: Flex stack for vertical or horizontal layouts with tokenized gap.
outline: [2, 3]
---

# GkStack

Layout primitive: **`display: flex`** with **`direction`**, **`gap`**, alignment, and optional wrap.

## Live demo

<DemoGkStack />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | `'div'` | Root element |
| `direction` | `'row' \| 'column'` | `'column'` | Flex direction |
| `gap` | `1`–`6` | `4` | Spacing token step |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | `align-items` |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | `justify-content` |
| `wrap` | `boolean` | `false` | `flex-wrap` |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Children |

## Example

```vue
<script setup lang="ts">
import { GkStack } from '@god-plan/god-kit/vue'
</script>

<template>
  <GkStack direction="column" :gap="3">
    <span>A</span>
    <span>B</span>
  </GkStack>
</template>
```
