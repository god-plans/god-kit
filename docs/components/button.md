---
title: GkButton
description: Button primitive with variants, sizes, loading, and optional link rendering.
outline: [2, 3]
---

# GkButton

**`<button>`** or **`<a>`** (when **`href`** is set) with God Kit styling: **primary**, **secondary**, **ghost**, and **danger** variants, **sm** / **md** sizes, optional **loading**, **readonly**, **slim**, **stacked**, and **prepend** / **append** / **loader** slots.

## When to use

Use for actions in forms, dialogs, and toolbars. Prefer `type="submit"` inside forms and `type="button"` for standalone actions. For navigation to a URL, pass **`href`** (renders an anchor with the same styles). Router-aware navigation (`to`) belongs in the app (e.g. **NuxtLink** wrapping **GkButton** or a small app wrapper).

## Live demo

<DemoGkButton />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type (ignored when `href` is set) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Padding and font size |
| `disabled` | `boolean` | `false` | Disables the control |
| `block` | `boolean` | `false` | Full width |
| `loading` | `boolean` | `false` | Loading overlay, blocks clicks, sets `aria-busy` |
| `readonly` | `boolean` | `false` | Blocks clicks without disabled styling; sets `aria-disabled` |
| `slim` | `boolean` | `false` | Tighter padding |
| `stacked` | `boolean` | `false` | Column layout for icon + label |
| `href` | `string` | — | If set, renders `<a>` instead of `<button>` |
| `rel` | `string` | — | Link `rel` (defaults to `noopener noreferrer` when `target="_blank"`) |
| `target` | `string` | — | Link target |
| `download` | `boolean \| string` | — | Anchor `download` attribute |
| `loadingLabel` | `string` | — | Passed to the default **`GkSpinner`** in the loader slot |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when the action is not blocked (`disabled`, `readonly`, or `loading` swallow the event) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Label |
| `prepend` | Leading content (e.g. icon) |
| `append` | Trailing content |
| `loader` | Replaces default **GkSpinner** when `loading` is true |

## Examples

### Variants

```vue
<script setup lang="ts">
import { GkButton } from 'god-kit/vue'
</script>

<template>
  <GkButton variant="primary">Save</GkButton>
  <GkButton variant="secondary">Cancel</GkButton>
  <GkButton variant="ghost">Skip</GkButton>
  <GkButton variant="danger">Delete</GkButton>
</template>
```

### Loading and link

```vue
<GkButton :loading="saving" @click="save">Save</GkButton>
<GkButton href="/docs" variant="ghost">Docs</GkButton>
```

## Accessibility notes

- Keep visible text in the default slot for clear action names.
- Use `loadingLabel` when your loading state needs a more specific spoken label.
- Prefer `disabled` for unavailable actions and `readonly` only when the action should remain visually active but non-interactive.
