---
title: GkStack
description: Flex stack for vertical or horizontal layouts with tokenized gap.
outline: [2, 3]
---

# GkStack

Layout primitive: **`display: flex`** with **`direction`**, **`gap`**, alignment, and optional wrap.

## When to use

Use as the default primitive for spacing and alignment instead of writing ad-hoc flex wrappers in app pages.

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

## Examples

### Basic

```vue
<script setup lang="ts">
import { GkStack } from 'god-kit/vue'
</script>

<template>
  <GkStack direction="column" :gap="3">
    <span>A</span>
    <span>B</span>
  </GkStack>
</template>
```

### Advanced

```vue
<GkStack direction="row" :gap="2" align="center" justify="space-between" wrap>
  <span>Filters</span>
  <span>Actions</span>
</GkStack>
```

### Edge case

```vue
<GkStack tag="ul" direction="column" :gap="1">
  <li>Accessible list item 1</li>
  <li>Accessible list item 2</li>
</GkStack>
```

## Accessibility notes

- Pick semantic `tag` values when stack wrappers represent lists, nav, or landmark groupings.
- Preserve source order; visual flex arrangement should not conflict with reading order.

## Related components

- [GkGrid](./grid)
- [GkContainer](./container)
- [GkDivider](./divider)
- [GkButton](./button)
