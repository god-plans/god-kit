---
title: GkButton
description: Button primitive with variants and sizes.
outline: [2, 3]
---

# GkButton

Native `<button>` with God Kit styling: **primary**, **secondary**, **ghost**, and **danger** variants, **sm** / **md** sizes, optional full width.

## When to use

Use for actions in forms, dialogs, and toolbars. Prefer `type="submit"` inside forms and `type="button"` for standalone actions.

## Live demo

<DemoGkButton />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Padding and font size |
| `disabled` | `boolean` | `false` | Disables the button |
| `block` | `boolean` | `false` | Full width |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Native click |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button label |

## Examples

### Variants

```vue
<script setup lang="ts">
import { GkButton } from '@god-plan/god-kit/vue'
</script>

<template>
  <GkButton variant="primary">Save</GkButton>
  <GkButton variant="secondary">Cancel</GkButton>
  <GkButton variant="ghost">Skip</GkButton>
  <GkButton variant="danger">Delete</GkButton>
</template>
```
