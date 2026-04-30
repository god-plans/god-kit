---
title: GkDialog
description: Dialog shell on GkOverlay — fullscreen, scrollable, sizing, and transition hooks.
outline: [2, 3]
---

# GkDialog

A **dialog shell** built on **[GkOverlay](./overlay)**: **`v-model`**, scrim, Escape / scrim dismiss (unless **`persistent`**), body scroll lock, **`role="dialog"`** / **`aria-modal`**, and forwarded attributes for **`aria-labelledby`** / **`aria-describedby`**.

Unlike Vuetify’s **VDialog**, there is **no activator slot**, **VDefaultsProvider**, router back, location/scroll strategies, or global overlay stack — compose with a button and **`v-model`** (see demo).

## When to use

Use for focused modal workflows that require acknowledgement or completion before users continue (confirmations, form steps, destructive actions).

## Live Examples

<DemoGkDialog />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; use **`v-model`** |
| `fullscreen` | `boolean` | `false` | Edge-to-edge surface (fills the viewport) |
| `size` | `'sm' \| 'md' \| 'lg'` | — | Preset max width via **`--gk-dialog-max-width-*`**; omit for **md** (**`28rem`**) |
| `scrollable` | `boolean` | `false` | Scroll overflow inside the surface (`max-height` when not fullscreen) |
| `persistent` | `boolean` | `false` | Passed to **GkOverlay** — scrim and Escape do not close |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target (**GkOverlay**) |
| `zIndex` | `number \| string` | **`--gk-dialog-z-index`** | Stack order |
| `showScrim` | `boolean` | `true` | Passed to **GkOverlay** |
| `restoreFocus` | `boolean` | `true` | Passed to **GkOverlay** |
| `width` | `string \| number` | — | Surface **`width`** (numbers become **`px`**) |
| `maxWidth` | `string \| number` | — | Surface **`max-width`** |
| `height` | `string \| number` | — | Surface **`height`** |
| `maxHeight` | `string \| number` | — | Surface **`max-height`** |

Additional attributes (for example **`aria-labelledby`**, **`aria-describedby`**) are forwarded to **GkOverlay** (panel element).

### Slots

| Slot | Description |
|------|-------------|
| `default` | Dialog body (inside the styled surface) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Open state |
| `click:outside` | `MouseEvent` | Scrim clicked (**GkOverlay**); not emitted when **`persistent`** |
| `afterEnter` | — | Overlay transition finished entering |
| `afterLeave` | — | Overlay transition finished leaving |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-dialog-z-index` | Default stacking (**`2400`**) |
| `--gk-dialog-max-width` | Max width cap when **`size`** is omitted or **`md`** (`28rem`) |
| `--gk-dialog-max-width-sm` | Cap when **`size="sm"`** (`20rem`) |
| `--gk-dialog-max-width-lg` | Cap when **`size="lg"`** (`42rem`) |
| `--gk-dialog-scroll-max-height` | Cap for scrollable body height |
| `--gk-dialog-shadow` | Panel shadow (non-fullscreen) |

## Try It

Change common dialog options, preview the result, and copy generated Vue code.

<GkDialogPlayground />

## Accessibility notes

- Always provide `aria-labelledby` and point it to a visible heading inside the dialog.
- Add `aria-describedby` when the dialog body includes guidance text users must hear before acting.
- Keep at least one keyboard-focusable control inside the dialog body or actions region.

## Related components

- [GkOverlay](./overlay)
- [GkBottomSheet](./bottom-sheet)
- [GkMenu](./menu)

## Out of scope (v1)

Activator slot, **VDefaultsProvider**, router integration, focus-trap package, and parity with Vuetify overlay location/scroll/lazy stacks.
