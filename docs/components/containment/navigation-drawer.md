---
title: GkNavigationDrawer
description: Side or bottom navigation panel — docked, overlay (temporary), rail, scrim, and slots.
outline: [2, 3]
---

# GkNavigationDrawer

A **navigation surface** for app shells: **`v-model`** controls open state (when not **`permanent`**), **`temporary`** uses a **Teleport** to **`body`** with an optional **scrim**, slide transition, **Escape** to close, and body **scroll lock** while open. Without **`temporary`** and without **`permanent`**, the drawer is **docked** (fixed to the edge) when the viewport is above the mobile breakpoint; below **959px** it becomes **temporary** unless **`disableResizeWatcher`** is set.

This is smaller than Vuetify’s **VNavigationDrawer**: no app **layout** item integration, touch drag, or sticky layout coupling — pair with your own main content **padding** / grid as needed.

## When to use

Use for global app navigation and persistent section switching. Choose `temporary` mode for mobile overlays and docked/rail modes for desktop shell layouts.

## Live demo

<DemoGkNavigationDrawer />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| undefined` | `undefined` | Open state; **`undefined`** = auto (closed when overlay/temporary, open when docked desktop) |
| `permanent` | `boolean` | `false` | Always visible; **`v-model`** does not collapse the drawer |
| `temporary` | `boolean` | `false` | Force overlay mode (scrim, teleport, transitions) |
| `disableResizeWatcher` | `boolean` | `false` | When **`true`**, never treat the viewport as “mobile” for auto-**`temporary`** |
| `location` | **`GkNavigationDrawerLocation`** | `'start'` | **`start`** / **`end`** use **`dir`**; **`left`** / **`right`** / **`top`** / **`bottom`** are physical |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Maps **`start`** / **`end`** to sides |
| `width` | `number \| string` | `256` | Full width (px or CSS length) |
| `rail` | `boolean` | `false` | Collapsed rail width |
| `railWidth` | `number \| string` | `56` | Width when **`rail`** |
| `expandOnHover` | `boolean` | `false` | With **`rail`**, expand to **`width`** on hover; emits **`update:rail`** |
| `scrim` | `boolean \| string` | `true` | **`false`** hides scrim; string = CSS background |
| `persistent` | `boolean` | `false` | Scrim click and Escape do not close (**`temporary`** only) |
| `floating` | `boolean` | `false` | Margin + rounded corners (tokens) |
| `image` | `string` | — | Background image URL |
| `color` | `string` | — | Panel background color |
| `to` | `string \| HTMLElement` | `'body'` | **Teleport** target when **`temporary`** |
| `zIndex` | `number \| string` | token | Sets **`--gk-navigation-drawer-z-index`** |
| `scrollLock` | `boolean` | `true` | Lock **`document.body`** overflow when **`temporary`** and open |
| `restoreFocus` | `boolean` | `true` | Focus first focusable on open; restore on close |
| `tag` | `string` | `'nav'` | Root element tag |
| `touchless` | `boolean` | `false` | Reserved (no touch drag in v1) |

Additional attributes are forwarded to the root element (not duplicated on inner wrappers).

### Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | — | Main content |
| `prepend` | — | Above the default slot |
| `append` | — | Below the default slot |
| `image` | **`image`** | Custom background; default uses **`image`** prop |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Open state |
| `update:rail` | `boolean` | With **`expandOnHover`** + **`rail`**, collapsed state while hovering ( **`false`** = expanded ) |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-navigation-drawer-width` | Default full width |
| `--gk-navigation-drawer-rail-width` | Default rail width |
| `--gk-navigation-drawer-z-index` | Stacking (portal + panel uses **`+1`**) |
| `--gk-navigation-drawer-scrim` | Scrim fill |
| `--gk-navigation-drawer-bg` | Panel background |
| `--gk-navigation-drawer-shadow` | Panel shadow |
| `--gk-navigation-drawer-floating-margin` | **`floating`** margin |
| `--gk-navigation-drawer-floating-radius` | **`floating`** radius |

### Types

**`GkNavigationDrawerLocation`** and **`GkNavigationDrawerImageSlotProps`** are exported from **`god-kit/vue`**.

## Examples

### Basic

```vue
<GkNavigationDrawer v-model="open" temporary>
  <nav>...</nav>
</GkNavigationDrawer>
```

### Advanced

```vue
<GkNavigationDrawer
  v-model="open"
  rail
  expand-on-hover
  location="start"
  dir="rtl"
/>
```

### Edge case

```vue
<GkNavigationDrawer
  v-model="open"
  temporary
  persistent
  :scroll-lock="false"
/>
```

## Accessibility notes

- Add a meaningful `aria-label` or visible heading for navigation regions.
- In temporary mode, provide explicit close actions and keep focus targets inside drawer content.
- Validate `dir` + `location` combinations in RTL apps.

## Related components

- [GkMenu](./menu)
- [GkDialog](./dialog)
- [GkTabs](../navigation/tabs)
