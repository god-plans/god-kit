---
title: GkContainer
description: Centered max-width container with optional horizontal padding.
outline: [2, 3]
---

# GkContainer

Constrains content width for readable line lengths. **`maxWidth`** maps to **`sm` / `md` / `lg` / `full`**.

## When to use

Use for page-level content boundaries and readable text widths in dashboards and docs-like views.

## Live Examples

<DemoGkContainer />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | `'div'` | Root element |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Max width |
| `padded` | `boolean` | `true` | Horizontal padding |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Choose semantic `tag` values (`section`, `main`, `aside`) when container boundaries map to landmarks.
- Keep heading hierarchy meaningful inside constrained regions.

## Related components

- [GkStack](./stack)
- [GkGrid](./grid)
- [GkDivider](./divider)
- [GkNavigationDrawer](./containment/navigation-drawer)
