---
title: GkStack
description: Flex stack for vertical or horizontal layouts with tokenized gap.
outline: [2, 3]
---

# GkStack

Layout primitive: **`display: flex`** with **`direction`**, **`gap`**, alignment, and optional wrap.

## When to use

Use as the default primitive for spacing and alignment instead of writing ad-hoc flex wrappers in app pages.

## Live Examples

<DemoGkStack />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | `'div'` | Root element |
| `direction` | `'row' \| 'column'` | `'column'` | Flex direction |
| `gap` | `1`–`6` | `4` | Spacing token step |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | `align-items` |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | `justify-content` |
| `wrap` | `boolean` | `false` | `flex-wrap` |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Children |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Pick semantic `tag` values when stack wrappers represent lists, nav, or landmark groupings.
- Preserve source order; visual flex arrangement should not conflict with reading order.

## Related components

- [GkGrid](./grid)
- [GkContainer](./container)
- [GkDivider](./divider)
- [GkButton](./button)
