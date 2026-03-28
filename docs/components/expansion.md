---
title: Expansion panels
description: GkExpansionPanels, GkExpansionPanel, GkExpansionPanelTitle, and GkExpansionPanelText — accordion and disclosure regions.
outline: [2, 3]
---

# Expansion panels

Composable **accordion / disclosure** UI: **`GkExpansionPanels`** owns **`v-model`** (open panel keys), **`GkExpansionPanel`** registers a **`value`** and provides context to **`GkExpansionPanelTitle`** (header button) and **`GkExpansionPanelText`** (collapsible body). **`GK_EXPANSION_PANELS`** and **`GK_EXPANSION_PANEL`** are exported from **`god-kit/vue`** for advanced composition.

This is intentionally smaller than Vuetify’s expansion stack: no **VDefaultsProvider**, elevation/rounded prop matrices, or group item registry beyond **`value`** matching.

## Live demo

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

## Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  GkExpansionPanel,
  GkExpansionPanels,
  GkExpansionPanelText,
  GkExpansionPanelTitle,
} from 'god-kit/vue'

const open = ref<(string | number)[]>([])
</script>

<template>
  <GkExpansionPanels v-model="open" multiple>
    <GkExpansionPanel value="shipping">
      <GkExpansionPanelTitle>Shipping</GkExpansionPanelTitle>
      <GkExpansionPanelText>Details…</GkExpansionPanelText>
    </GkExpansionPanel>
    <GkExpansionPanel value="billing">
      <GkExpansionPanelTitle>Billing</GkExpansionPanelTitle>
      <GkExpansionPanelText>Details…</GkExpansionPanelText>
    </GkExpansionPanel>
  </GkExpansionPanels>
</template>
```

## Out of scope (v1)

Nested expansion groups, lazy mount of body content, and parity with Vuetify’s **`before-active`** / **`after-active`** edge styling.
