---
title: GkDivider
description: Visual separator with role=separator and orientation.
outline: [2, 3]
---

# GkDivider

One-pixel divider using **`border`** tokens. Exposes **`role="separator"`** and **`aria-orientation`**.

## When to use

Use to separate related chunks of content in lists, cards, forms, and toolbars.

## Live demo

<DemoGkDivider />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |

## Examples

### Basic

```vue
<script setup lang="ts">
import { GkDivider } from 'god-kit/vue'
</script>

<template>
  <GkDivider />
</template>
```

### Advanced

```vue
<div style="display:flex; align-items:center; gap: 0.5rem;">
  <span>Left</span>
  <GkDivider orientation="vertical" />
  <span>Right</span>
</div>
```

### Edge case

```vue
<GkContainer>
  <GkDivider />
</GkContainer>
```

## Accessibility notes

- Use `orientation=\"vertical\"` when dividing inline groups so assistive tech gets the right separator orientation.
- Avoid decorative overuse; separators should reinforce meaningful grouping.

## Related components

- [GkStack](./stack)
- [GkContainer](./container)
- [GkNavigationDrawer](./containment/navigation-drawer)
