---
title: GkDivider
description: Visual separator with role=separator and orientation.
outline: [2, 3]
---

# GkDivider

One-pixel divider using **`border`** tokens. Exposes **`role="separator"`** and **`aria-orientation`**.

## When to use

Use to separate related chunks of content in lists, cards, forms, and toolbars.

## Live Examples

<DemoGkDivider />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Use `orientation=\"vertical\"` when dividing inline groups so assistive tech gets the right separator orientation.
- Avoid decorative overuse; separators should reinforce meaningful grouping.

## Related components

- [GkStack](./stack)
- [GkContainer](./container)
- [GkNavigationDrawer](./containment/navigation-drawer)
