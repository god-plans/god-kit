---
title: GkMenu
description: Dropdown menu anchored to an activator — placement, outside click, optional scrim.
outline: [2, 3]
---

# GkMenu

A **floating menu** teleported to **`body`**: **`v-model`** open state, **`#activator`** slot with **`props`** / **`is-open`** for **`aria-haspopup`**, **`aria-expanded`**, **`aria-controls`**, fixed **`top` / `left`** from **`useMenuAnchorPosition`**, outside **mousedown** dismiss, **Escape** to close, optional **scrim**, and **`closeOnContentClick`**.

This is intentionally smaller than Vuetify’s **VMenu**: no **VOverlay** activator stack, nested **submenu** parent chain, **openDelay** / **closeDelay**, **locationStrategy** / **scrollStrategy**, or **Tab** focus cycling through the whole document — **`submenu`** is reserved for a future phase.

## When to use

Use for short action lists anchored to an activator (button, icon trigger, contextual controls). Keep menu items action-oriented and avoid long-form content.

## Live Examples

<DemoGkMenu />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Open state; use **`v-model`** |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Panel position relative to the activator |
| `offset` | `number` | `4` | Gap between activator and panel (px) |
| `closeOnContentClick` | `boolean` | `true` | Clicking the panel closes the menu (use **`@click.stop`** on items to keep it open) |
| `showScrim` | `boolean` | `false` | Full-screen scrim (uses **`--gk-menu-scrim`**) |
| `persistent` | `boolean` | `false` | Outside click and Escape do not close |
| `disabled` | `boolean` | `false` | Prevents opening |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target |
| `zIndex` | `number \| string` | **`--gk-menu-z-index`** | Layer stacking |
| `restoreFocus` | `boolean` | `true` | Focus first focusable in the panel on open; restore previous focus on close |
| `submenu` | `boolean` | `false` | Reserved (no nested menu wiring in v1) |

Additional attributes are applied to the **panel** (not the activator).

### Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `activator` | **`props`**, **`is-open`** | Bind **`v-bind="props"`** on your control (typically **`type="button"`**). |
| `default` | — | Menu content. For **`role="menu"`** on the panel, use **direct** **`role="menuitem"`** (or group/menuitemcheckbox) children per WAI-ARIA. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Open state |
| `click:outside` | `MouseEvent` | Outside **mousedown** (not emitted when **`persistent`**) |
| `afterEnter` | — | Transition finished entering |
| `afterLeave` | — | Transition finished leaving |

### Composable

**`useMenuAnchorPosition`** is exported from **`god-kit/vue`** for custom anchored panels; **`GkMenuPlacement`** is the placement union type.

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-menu-z-index` | Layer stacking (**`2100`**) |
| `--gk-menu-min-width` | Minimum panel width |
| `--gk-menu-max-height` | **`max-height`** + scroll |
| `--gk-menu-shadow` | Panel shadow |
| `--gk-menu-scrim` | Scrim background (default transparent) |

## Try It

Change menu placement and dismissal options, preview the result, and copy generated Vue code.

<GkMenuPlayground />

## Accessibility notes

- Use `v-bind=\"props\"` from the activator slot to preserve `aria-haspopup` / `aria-expanded` wiring.
- Keep focusable menu items as direct children with `role=\"menuitem\"` (or related menuitem roles).
- ArrowUp/ArrowDown and Home/End navigation should be tested in custom slot content.

## Related components

- [GkOverlay](./overlay)
- [GkDialog](./dialog)
- [GkTooltip](./tooltip)

## Out of scope (v1)

Nested **submenu** registration, **router** integration, **retainFocus** / full **Tab** trap parity with Vuetify, **openDelay** / **closeDelay**, and **scroll** / **location** strategies beyond anchor + viewport clamping.
