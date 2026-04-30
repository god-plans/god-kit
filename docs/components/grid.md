---
title: GkGrid
description: Responsive CSS grid with God Kit spacing, column presets, and optional cell guides.
outline: [2, 3]
---

# GkGrid

Layout primitive: **`display: grid`** with **column counts** for **mobile**, **tablet**, and **desktop** breakpoints (mobile-first CSS), **tokenized gap**, item alignment, optional **dashed cell guides**, and a configurable **root element** (for example `section`).

## When to use

Use for **multi-column** layouts that need **three width tiers**: below **`48rem`** (mobile), **`48rem`–`63.99rem`** (tablet), and **`64rem`+** (desktop). Omitted props **fall back** up the chain (`columnsMobile` → `columnsTablet` → `columns`). For simple vertical or horizontal flex rows, use **[GkStack](./stack)** instead. For max-width page shells, use **[GkContainer](./container)**. For data-dense, sortable tables, use **[GkDataTable](./data/gk-data-table)**.

## Live Examples

<DemoGkGrid />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | `'div'` | Root element (`section` for landmarks, `div` for generic wrappers) |
| `columns` | `1`–`4` | `3` | Column count from **`64rem`** up (desktop) |
| `columnsTablet` | `1`–`4` | _same as `columns`_ | Column count from **`48rem`** to below **`64rem`** |
| `columnsMobile` | `1`–`4` | _same as `columnsTablet ?? columns`_ | Column count below **`48rem`** |
| `gap` | `1`–`6` | `4` | Spacing token step (maps to `--gk-space-*`) |
| `showGridLines` | `boolean` | `false` | Dashed outline on each direct child; omit chrome with **`data-gk-grid-chrome`** on a child |
| `alignItems` | `'stretch' \| 'start' \| 'center' \| 'end'` | `'stretch'` | Grid `align-items` |
| `justifyItems` | `'stretch' \| 'start' \| 'center' \| 'end'` | `'stretch'` | Grid `justify-items` |
| `textAlign` | `'start' \| 'center' \| 'end'` | `'start'` | `text-align` for cell content |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Cell content (any block-level or inline children) |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- Use **`tag="section"`** (or wrap in a sectioning element) when the grid represents a major region; provide a heading inside or **`aria-label`** on the section when it has no visible title.
- Keep **DOM order** aligned with **visual** order on all breakpoints; media queries only change `grid-template-columns`, not content order.
- For **`showGridLines`**, do not rely on outlines alone to convey state; they are a visual aid, not a replacement for clear content structure.

## Related components

- [GkStack](./stack)
- [GkContainer](./container)
- [GkDivider](./divider)
- [GkDataTable](./data/gk-data-table) — for tabular, sortable data, not page layout grids
