---
title: GkPagination
description: Page navigation with ellipsis, optional first/last controls, and ResizeObserver-driven visible count.
outline: [2, 3]
---

# GkPagination

A **pagination** control (`role="navigation"`) with **previous** / **next**, optional **first** / **last**, numbered page buttons with **ellipsis** when **`length`** exceeds **`totalVisible`**, **`v-model`** on the current page, **keyboard** Left/Right (swapped when **`dir="rtl"`**), and **ResizeObserver** to estimate how many page buttons fit when **`totalVisible`** is omitted.

This is smaller than Vuetify **VPagination**: no theme / locale composables, no **`VDefaultsProvider`**, and **`GkButton`** is used for controls instead of a dedicated **`VPaginationBtn`**.

## When to use

Use for page-based navigation where users need clear movement between finite result sets. Prefer this over infinite scroll in admin/reporting views requiring random access to pages.

## Live Examples

<DemoGkPagination />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `1` | Current page; **`v-model`** |
| `start` | `number \| string` | `1` | First page number |
| `length` | `number \| string` | `1` | Total **number of pages** |
| `disabled` | `boolean` | `false` | Disables all controls |
| `totalVisible` | `number \| string` | — | Max page **number** buttons; if omitted, uses container **`ResizeObserver`** or **`window`** width fallback |
| `showFirstLastPage` | `boolean` | `false` | Shows first / last controls |
| `ellipsis` | `string` | `'...'` | Ellipsis segment in the range |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Swaps control icons and keyboard direction |
| `activeColor` | `string` | — | Sets **`--gk-pagination-active-color`** (text **ink** on the filled primary active page button) |
| `variant` | GkButton variant | `'ghost'` | Variant for non-active page buttons |
| `size` | `'sm' \| 'md'` | `'sm'` | **GkButton** size |
| `firstIcon` / `prevIcon` / `nextIcon` / `lastIcon` | `string` | `«` / `‹` / `›` / `»` | Default control labels |
| `ariaLabel` | `string` | `'Pagination'` | Root **`aria-label`** |
| `pageAriaLabel` | `string` | `'Page'` | Page button label prefix |
| `currentPageAriaLabel` | `string` | `'Current page'` | Active page prefix |
| `firstAriaLabel` / `previousAriaLabel` / `nextAriaLabel` / `lastAriaLabel` | `string` | English defaults | Control **`aria-label`** |

Additional attributes are forwarded to the root **`<nav>`**.

### Events

| Event | Payload |
|-------|---------|
| `update:modelValue` | `number` |
| `first` | `number` |
| `prev` | `number` |
| `next` | `number` |
| `last` | `number` |

### Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `item` | **`isActive`**, **`key`**, **`page`**, **`props`** | Custom page button |
| `first` / `prev` / `next` / `last` | **`icon`**, **`onClick`**, **`disabled`**, **`aria-label`**, **`aria-disabled`** | Custom controls |

### Utilities

**`createRange`**, **`getMax`**, **`buildPaginationRange`** are exported from **`god-kit/vue`** and **`god-kit/vue/navigation`** for custom UIs.

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-pagination-gap` | Flex gap between controls |
| `--gk-pagination-active-color` | Active page **text** color on the primary fill (default **on-primary**; override with **`activeColor`**) |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Set `ariaLabel` to a page-specific label when multiple pagination regions exist.
- Keyboard shortcuts support Left/Right (RTL-aware) and Home/End.
- Keep control labels localized through `firstAriaLabel`, `previousAriaLabel`, `nextAriaLabel`, and `lastAriaLabel`.

## Related components

- [GkTabs](./tabs)
- [GkButton](../button)
- [GkNavigationDrawer](../containment/navigation-drawer)

## Out of scope

Vuetify **`useLocale`**, **`useTheme`**, **`useDisplay`** parity, **`n()`** number formatting, and **`IconValue`** icon registry.
