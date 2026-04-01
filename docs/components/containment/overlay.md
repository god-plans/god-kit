---
title: GkOverlay
description: Teleported overlay with scrim, v-model, Escape and scrim dismiss, and body scroll lock.
outline: [2, 3]
---

# GkOverlay

A **minimal overlay** for modal-style content: full-screen **scrim**, **Teleport** (default **`body`**), **`v-model`** visibility, **Escape** to dismiss, optional **persistent** mode (scrim and Escape do not close), **body scroll lock** while open, and tokenized **z-index** / scrim color.

This is intentionally smaller than Vuetify’s **VOverlay**: no activator slot, location/scroll strategies, router back, global stack composable, lazy hydration, or full focus-trap library. Compose with a button and **`v-model`** in your app (see demo).

## When to use

Use as the lowest-level containment primitive when you need teleported layered content with scrim/escape/focus behavior but custom surface markup.

## Live demo

<DemoGkOverlay />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; use **`v-model`** |
| `persistent` | `boolean` | `false` | When **`true`**, scrim click and **Escape** do **not** close the overlay |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target |
| `zIndex` | `number \| string` | — | Overrides **`--gk-overlay-z-index`** when set |
| `scrollLock` | `boolean` | `true` | Sets **`document.body.style.overflow = 'hidden'`** while open (restored on close) |
| `showScrim` | `boolean` | `true` | Renders the full-screen scrim |
| `role` | `string` | `'dialog'` | ARIA role for the panel |
| `ariaModal` | `boolean` | `true` | Sets **`aria-modal="true"`** when **`true`** (typical for dialogs) |
| `restoreFocus` | `boolean` | `true` | Focuses the first focusable in the panel on open (or the panel), restores the previous active element on close |
| `overlayClass` | `unknown` | — | Optional class(es) on the fixed overlay root (`.gk-overlay`) |
| `contentMaxWidth` | `string` | — | Sets **`--gk-overlay-content-max-width`** on the root (e.g. **`none`**, **`min(100%, 28rem)`**); default in CSS is **`min(100%, 32rem)`** |
| `transitionName` | `string` | `'gk-overlay'` | Vue **`<Transition>`** name; use **`gk-bottom-sheet`** with **GkBottomSheet** (built-in styles) |

Additional attributes (for example **`aria-labelledby`**, **`aria-describedby`**, **`id`**) are applied to the **panel** element (the element with **`role`**). **`defineExpose`**: **`contentRef`** — the panel element.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Panel content; clicks do not reach the scrim (**`@click.stop`** on the panel) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the overlay closes |
| `click:outside` | `MouseEvent` | Emitted when the **scrim** is clicked and the overlay **will** dismiss (not emitted when **`persistent`** is **`true`**) |
| `afterEnter` | — | Overlay **`<Transition>`** finished entering |
| `afterLeave` | — | Overlay **`<Transition>`** finished leaving |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-overlay-scrim` | Scrim background (defaults via **`--gk-color-overlay`**) |
| `--gk-overlay-z-index` | Default stacking order (**`2000`**) |
| `--gk-overlay-content-max-width` | Panel **`max-width`** (default **`min(100%, 32rem)`**; **GkDialog** may override) |

## Examples

### Basic

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkOverlay } from 'god-kit/vue'
</script>

<template>
  <button type="button" @click="open = true">Open</button>
  <GkOverlay
    v-model="open"
    aria-labelledby="confirm-title"
    aria-describedby="confirm-desc"
  >
    <h2 id="confirm-title">Confirm</h2>
    <p id="confirm-desc">Continue with this action?</p>
    <button type="button" @click="open = false">OK</button>
  </GkOverlay>
</template>
```

### Advanced

```vue
<GkOverlay
  v-model="open"
  :z-index="2200"
  content-max-width="min(100%, 48rem)"
  transition-name="gk-overlay"
/>
```

### Edge case

```vue
<GkOverlay
  v-model="open"
  persistent
  :show-scrim="false"
  :restore-focus="false"
/>
```

## Accessibility notes

- Provide `aria-labelledby` and `aria-describedby` when overlay content represents a dialog-like interaction.
- Keep at least one focusable element in overlay content so focus management remains predictable.
- Persistent overlays should always provide an explicit close action inside the content.

## Related components

- [GkDialog](./dialog)
- [GkBottomSheet](./bottom-sheet)
- [GkMenu](./menu)

## Out of scope (v1)

Activator slot, scroll/location strategies, **`router.back`** integration, global overlay stack composable, lazy hydration, and parity with Vuetify’s **`click-outside`** beyond **scrim** dismissal.
