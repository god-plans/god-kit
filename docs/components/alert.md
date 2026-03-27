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
| `modelValue` | `boolean` | `true` | Visibility; when `false`, the component renders nothing |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Tone (primary API) |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | — | Optional alias when `variant` is default `neutral`; `error` maps to **`danger`** |
| `role` | `'status' \| 'alert'` | `'status'` | ARIA role |
| `title` | `string` | — | Heading line (overridden by **`title`** slot) |
| `text` | `string` | — | Body line after the title (overridden by **`text`** slot) |
| `closable` | `boolean` | `false` | Show a dismiss control (**GkButton** ghost, small) |
| `closeLabel` | `string` | `'Dismiss'` | `aria-label` for the close control |
| `border` | `boolean \| 'top' \| 'end' \| 'bottom' \| 'start'` | — | Accent bar along an edge; `true` uses logical **`start`** |
| `prominent` | `boolean` | `false` | Larger padding / min-height |

### Slots

| Slot | Description |
|------|-------------|
| `prepend` | Optional start-aligned content (e.g. icon) |
| `append` | Optional end-aligned content before the close control |
| `title` | Title row (wins over **`title`** prop) |
| `text` | Text row after title (wins over **`text`** prop) |
| `default` | Additional body after title and text |

**Order:** optional **title** (prop or slot), then **text** (prop or slot), then **default** slot.

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when dismissed; `false` when closing |
| `close` | `MouseEvent` | Close control activated |
| `click:close` | `MouseEvent` | Same as **`close`** (mirrors common naming) |

## Example

```vue
<script setup lang="ts">
import { GkAlert } from '@god-plan/god-kit/vue'
</script>

<template>
  <GkAlert variant="success">Saved.</GkAlert>

  <GkAlert
    v-model="open"
    variant="info"
    title="Heads up"
    text="Details here."
    closable
    border="start"
  />
</template>
```
