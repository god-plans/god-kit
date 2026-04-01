---
title: GkSnackbar
description: Transient messages — bottom/top positioning, timeout, timer strip, optional queue from script.
outline: [2, 3]
---

# GkSnackbar

A **non-blocking** message surface teleported to **`body`**: **no scrim**, **Escape** closes, **auto-dismiss** via **`timeout`**, **pause** while hovered or focused (timer and countdown reset on resume, matching common snackbar behavior). **`location`** controls edge and alignment (e.g. **`bottom center`**, **`top start`**). **`timer`** adds a thin **linear countdown** strip.

For **imperative** messages from arbitrary code, add **`GkSnackbarHost`** once (e.g. in **`App.vue`**) and call **`pushGkSnackbar({ text, ... })`** from **`useGkSnackbar`** / **`pushGkSnackbar`**.

## When to use

Use for transient, non-blocking status updates after user actions (save complete, retry warning, background sync status).

## Live demo

<DemoGkSnackbar />

## API — GkSnackbar

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; **`v-model`** |
| `title` / `text` | `string` | — | Text content (also **`#title`** / **`#text`** slots) |
| `timeout` | `number \| string` | `5000` | Auto-close ms; **`-1`** = no auto-close |
| `timer` | `boolean \| 'top' \| 'bottom'` | `false` | Countdown strip position |
| `timerColor` | `string` | — | Strip color (CSS) |
| `reverseTimer` | `boolean` | `false` | Strip fills from the opposite side |
| `variant` | `'neutral' \| 'info' \| ...` | `'neutral'` | Surface tone (aligned with **GkAlert**) |
| `location` | `string` | `'bottom center'` | Edge + alignment, e.g. **`bottom start`**, **`left center`** |
| `rounded` | `boolean` | `true` | Rounded corners |
| `elevation` | `0`–`5` | — | Shadow preset |
| `loading` | `boolean` | `false` | Shows **GkSpinner** in prepend when no **`#prepend`** |
| `prependAvatar` / `prependIcon` | `string` | — | Image URL or short glyph |
| `vertical` | `boolean` | `false` | Stack content vertically |
| `collapsed` | `{ width, height }` | — | Fixed dimensions (CSS variables) |
| `queueIndex` / `queueGap` | `number` | `0` / `8` | Stacking offset for **`GkSnackbarHost`** |
| `zIndex` | `number \| string` | token | Layering |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target |
| `transitionName` | `string` | `'gk-snackbar'` | Vue **`<Transition>`** name |

### Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | — | Main body |
| `header` | — | Above the row |
| `prepend` | — | Replaces default prepend media |
| `title` / `text` | — | Overrides **`title`** / **`text`** props |
| `actions` | **`isActive`** | Action buttons (**`GkButton`** recommended); **`isActive`** is the **`v-model`** ref |

### Events

| Event | Description |
|-------|-------------|
| `update:modelValue` | Open state |
| `afterEnter` / `afterLeave` | Transition hooks |

## Programmatic API

1. Mount **`GkSnackbarHost`** once in your app root.
2. Call **`pushGkSnackbar({ text: '…', variant: 'success', timeout: 4000 })`** from anywhere (or **`useGkSnackbar().push`**).
3. Returns **`{ id, dismiss }`** — **`dismiss()`** closes that item after its leave transition.

**`clearGkSnackbars()`** removes all queued items immediately (no leave animation).

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-snackbar-z-index` | Stacking |
| `--gk-snackbar-inset` | Edge padding |
| `--gk-snackbar-max-width` | Panel width cap |
| `--gk-snackbar-stack-unit` | Approximate height for stacked offsets |

## Examples

### Basic

```vue
<GkSnackbar v-model="open" text="Saved successfully." :timeout="3000" />
```

### Advanced

```vue
<GkSnackbar
  v-model="open"
  title="Deployment started"
  text="We will notify you when the rollout finishes."
  timer="bottom"
  location="top end"
  variant="info"
/>
```

### Edge case

```vue
<GkSnackbar v-model="open" :timeout="-1" variant="danger">
  <template #actions="{ isActive }">
    <GkButton size="sm" variant="secondary" @click="isActive = false">Dismiss</GkButton>
  </template>
</GkSnackbar>
```

## Accessibility notes

- Keep snackbar text concise and action-oriented; avoid long instructional content.
- Provide explicit action labels in `#actions` slots.
- Use indefinite timeout (`-1`) only when users must manually acknowledge the message.

## Related components

- [GkAlert](../alert)
- [GkButton](../button)
- [GkSkeletonLoader](./skeleton-loader)
