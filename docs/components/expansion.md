---
title: Expansion panels
description: GkExpansionPanels, GkExpansionPanel, GkExpansionPanelTitle, and GkExpansionPanelText — accordion and disclosure regions.
outline: [2, 3]
---

# Expansion panels

Composable **accordion / disclosure** UI: **`GkExpansionPanels`** owns **`v-model`** (open panel keys), **`GkExpansionPanel`** registers a **`value`** and provides context to **`GkExpansionPanelTitle`** (header button) and **`GkExpansionPanelText`** (collapsible body). **`GK_EXPANSION_PANELS`** and **`GK_EXPANSION_PANEL`** are exported from **`god-kit/vue`** for advanced composition.

This is intentionally smaller than Vuetify’s expansion stack: no **VDefaultsProvider**, elevation/rounded prop matrices, or group item registry beyond **`value`** matching.

## When to use

Use for grouped content where users reveal one or more sections on demand, especially for dense settings or FAQ-style layouts.

## Live Examples

<DemoGkExpansionPanels />

## GkExpansionPanels

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `(string \| number)[]` | `[]` | Keys of expanded panels; use **`v-model`** |
| `multiple` | `boolean` | `false` | When **`false`**, at most one panel is open (accordion) |
| `disabled` | `boolean` | `false` | Disables toggling for all panels |

### Slots

| Slot | Description |
|------|-------------|
| `default` | **`GkExpansionPanel`** children |

## GkExpansionPanel

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | auto | Stable key for **`v-model`**; defaults to an internal id when omitted (standalone panel) |
| `disabled` | `boolean` | `false` | Disables this panel’s toggle |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Typically **`GkExpansionPanelTitle`** + **`GkExpansionPanelText`** and any custom nodes |

## GkExpansionPanelTitle

Header control: **`button`**, **`aria-expanded`**, **`aria-controls`**, focus ring. Must be a descendant of **`GkExpansionPanel`**.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Visible title |

## GkExpansionPanelText

Collapsible region: **`role="region"`**, **`aria-labelledby`**, **`hidden`** when collapsed. Must be a descendant of **`GkExpansionPanel`**.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Panel body |

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet (source is imported from the same SFC as the preview).

## Accessibility notes

- `GkExpansionPanelTitle` renders button semantics; do not replace with non-focusable custom elements.
- Keep heading text concise so screen reader users can scan sections quickly.

## Related components

- [GkTabs](./navigation/tabs)
- [GkMenu](./containment/menu)
- [GkDivider](./divider)

## Out of scope (v1)

Nested expansion groups, lazy mount of body content, and parity with Vuetify’s **`before-active`** / **`after-active`** edge styling.
