---
title: GkTooltip
description: Floating tooltip anchored to an activator — hover, focus, click, and interactive mode.
outline: [2, 3]
---

# GkTooltip

A **teleported tooltip** (default **`body`**): **`v-model`** visibility, **`#activator`** slot with **`props`** / **`is-open`**, **`aria-describedby`** on the activator when open, **`role="tooltip"`** on the panel, fixed **`top` / `left`** from **`useTooltipPosition`**, **Escape** and **outside mousedown** dismiss (unless **`persistent`**), optional **`interactive`** hover bridge, and **`text`** or default slot content.

This is intentionally smaller than Vuetify’s **VTooltip**: no **VOverlay** stack, **locationStrategy** / **scrollStrategy** beyond anchor + viewport clamping, or **transition** prop (built-in **`gk-tooltip`** transition only).

## When to use

Use for short supplemental hints attached to an existing control. Keep content brief and avoid placing essential workflow information only in tooltips.

## Live demo

<DemoGkTooltip />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; use **`v-model`** |
| `id` | `string` | auto | **`id`** on the tooltip panel (for **`aria-describedby`**) |
| `text` | `string` | — | Default slot fallback when the default slot is empty |
| `placement` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` | Edge relative to the activator (**`start`** / **`end`** are LTR-oriented) |
| `offset` | `number` | `10` | Gap between activator and panel (px) |
| `openOnHover` | `boolean` | `true` | Open on pointer enter |
| `openOnClick` | `boolean` | `false` | Toggle on activator click |
| `openOnFocus` | `boolean` | `true` | Open on focus (keyboard / screen reader) |
| `interactive` | `boolean` | `false` | Panel receives pointer events; hover can move activator → panel without closing |
| `showDelay` | `number` | `0` | Delay before open (ms) |
| `hideDelay` | `number` | `0` | Delay before close from non-interactive leave / focus (ms) |
| `disabled` | `boolean` | `false` | Disables all open triggers |
| `persistent` | `boolean` | `false` | Outside mousedown and Escape do not close |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target |
| `zIndex` | `number \| string` | **`--gk-tooltip-z-index`** | Layer stacking |
| `activatorProps` | `Record<string, unknown>` | — | Merged with internal activator bindings |

Additional attributes are applied to the **tooltip panel** (not the activator).

### Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `activator` | **`props`**, **`is-open`** | Bind **`v-bind="props"`** on the focusable control. |
| `default` | — | Tooltip content; falls back to **`text`**. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Open state |
| `afterEnter` | — | Transition finished entering |
| `afterLeave` | — | Transition finished leaving |

### Composable

**`useTooltipPosition`** is exported from **`god-kit/vue`** for custom fixed tooltips; **`GkTooltipPlacement`** is the placement union type.

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-tooltip-z-index` | Layer stacking (**`2200`**) |
| `--gk-tooltip-max-width` | Panel **`max-width`** |
| `--gk-tooltip-padding-x` / `--gk-tooltip-padding-y` | Panel padding |
| `--gk-tooltip-shadow` | Panel shadow |

## Examples

### Basic

```vue
<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
</script>

<template>
  <GkTooltip text="Saved to your profile">
    <template #activator="{ props }">
      <GkButton type="button" v-bind="props">Hover me</GkButton>
    </template>
  </GkTooltip>
</template>
```

### Advanced

```vue
<GkTooltip placement="end" :show-delay="200" interactive>
  <!-- activator + custom tooltip content -->
</GkTooltip>
```

### Edge case

```vue
<GkTooltip
  v-model="open"
  persistent
  :open-on-hover="false"
  open-on-focus
/>
```

## Accessibility notes

- Use `v-bind=\"props\"` from the activator slot so described-by and trigger handlers remain intact.
- Prefer focus-enabled tooltips for keyboard users; hover-only hints are insufficient.
- Keep tooltip text concise and non-interactive unless `interactive` is explicitly required.

## Related components

- [GkMenu](./menu)
- [GkOverlay](./overlay)
- [GkSnackbar](../feedback/snackbar)

## Out of scope (v1)

**VOverlay** parity, **scrollStrategy** / **locationStrategy** beyond **`useTooltipPosition`**, custom **transition** name prop, and RTL-aware **`start`** / **`end`** flipping (use **`direction`** on a wrapper or app root for RTL).
