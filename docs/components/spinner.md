---
title: GkSpinner
description: Inline loading indicator with status role and label.
outline: [2, 3]
---

# GkSpinner

CSS spinner with **`role="status"`**, **`aria-live="polite"`**, and configurable **`aria-label`**.

## When to use

Use for short-lived loading states inside buttons, cards, and inline async flows.

## Live Examples

<DemoGkSpinner />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Visual size |
| `label` | `string` | `'Loading'` | Exposed to assistive tech |
| `tone` | `'default' \| 'on-filled'` | `'default'` | **`on-filled`** uses **`--gk-color-text-on-primary`** for the ring so it stays visible on solid primary/danger fills; **`GkButton`** passes this automatically when **`loading`** on those variants |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Always provide a contextual `label` when the spinner appears away from surrounding explanatory text.
- Avoid long-running spinner-only states; pair with status text when operations can take longer.

## Related components

- [GkButton](./button)
- [GkSkeletonLoader](./feedback/skeleton-loader)
- [GkSnackbar](./feedback/snackbar)
