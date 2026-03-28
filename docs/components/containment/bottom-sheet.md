---
title: GkBottomSheet
description: Bottom-anchored sheet on GkOverlay with slide-up transition and optional inset.
outline: [2, 3]
---

# GkBottomSheet

A **bottom sheet** built on **[GkOverlay](./overlay)**: **`v-model`**, scrim, Escape / scrim dismiss (unless **`persistent`**), **`transitionName="gk-bottom-sheet"`** (scrim fades, panel slides up), full-width surface with top-rounded corners, and optional **`inset`** padding from the viewport edges.

This is intentionally smaller than Vuetify’s **VBottomSheet**: no **VDialog** prop proxy beyond what **GkOverlay** already provides, no separate **`contentClass`** merge API — use attributes on the root or extend styles via tokens.

## Live demo

<DemoGkBottomSheet />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; use **`v-model`** |
| `inset` | `boolean` | `false` | Adds horizontal padding around the sheet (see **`gk-overlay--inset`** on **GkOverlay**) |
| `scrollable` | `boolean` | `true` | **`overflow-y: auto`** on the surface when content exceeds **`max-height`** |
| `persistent` | `boolean` | `false` | Passed to **GkOverlay** |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target |
| `zIndex` | `number \| string` | **`--gk-bottom-sheet-z-index`** | Stack order |
| `showScrim` | `boolean` | `true` | Passed to **GkOverlay** |
| `restoreFocus` | `boolean` | `true` | Passed to **GkOverlay** |
| `maxHeight` | `string \| number` | — | Optional surface **`max-height`** (numbers become **`px`**) |

Additional attributes (**`aria-labelledby`**, **`aria-describedby`**, etc.) are forwarded to **GkOverlay** (panel element).

### Slots

| Slot | Description |
|------|-------------|
| `default` | Sheet body |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Open state |
| `click:outside` | `MouseEvent` | Scrim click (**GkOverlay**) |
| `afterEnter` | — | Transition finished entering |
| `afterLeave` | — | Transition finished leaving |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-bottom-sheet-z-index` | Default stacking (**`2400`**) |
| `--gk-bottom-sheet-max-height` | Default **`max-height`** on the surface (**`90vh`**) |
| `--gk-bottom-sheet-shadow` | Panel shadow |

## Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkBottomSheet } from 'god-kit/vue'
</script>

<template>
  <GkButton type="button" @click="open = true">Open sheet</GkButton>
  <GkBottomSheet v-model="open" aria-labelledby="sheet-title" inset>
    <h2 id="sheet-title">Actions</h2>
    <GkButton type="button" variant="secondary" @click="open = false">Close</GkButton>
  </GkBottomSheet>
</template>
```

## Out of scope (v1)

Activator slot, **VDialog**-style prop filtering, router back, and global overlay stack.
