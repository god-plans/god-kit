---
title: GkTabs
description: Tab list and panels with v-model, items or slots, and tokens.
outline: [2, 3]
---

# GkTabs

A **tabbed interface** with **`role="tablist"`** / **`role="tab"`** / **`role="tabpanel"`**, **`v-model`** on the selected value, optional **`items`** (same parsing idea as Vuetify: primitives or `{ text, value, disabled }`), or **slot-based** **`GkTab`** + **`#window`** with **`GkTabsWindowItem`**. Includes **`alignTabs`**, **`grow`**, **`fixedTabs`**, **`stacked`**, **`inset`**, slider styling, **`showArrows`** with **`prev`** / **`next`** slots, and keyboard navigation (**Arrow**, **Home**, **End**).

This is intentionally smaller than Vuetify’s **VTabs** + **VSlideGroup** + **VWindow**: no touch carousel, no Web Animations “shift” slider between tabs, and no strict slide-group overflow measurement for arrow disabling.

## Live demo

<DemoGkTabs />

## API

### GkTabs

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| undefined` | first item | Selected tab value; **`v-model`** |
| `alignTabs` | `'start' \| 'title' \| 'center' \| 'end'` | `'start'` | Main axis alignment of the tab row |
| `color` | `string` | — | Sets **`--gk-tabs-color`** for the selected tab |
| `bgColor` | `string` | — | Sets **`--gk-tabs-bg-color`** |
| `fixedTabs` | `boolean` | `false` | Equal-width cap (**`max-width: 300px`**) per tab |
| `grow` | `boolean` | `false` | Tabs grow to fill the row |
| `stacked` | `boolean` | `false` | Vertical label layout inside each tab |
| `height` | `number \| string` | — | Sets **`--gk-tabs-height`** (numbers become `px`) |
| `hideSlider` | `boolean` | `false` | Hides the underline slider |
| `inset` | `boolean` | `false` | Inset padding/radius on the tab strip |
| `insetPadding` | `number \| string` | — | Overrides **`--gk-tabs-inset-padding`** when **`inset`** |
| `insetRadius` | `number \| string` | — | Overrides **`--gk-tabs-inset-radius`** when **`inset`** |
| `sliderColor` | `string` | — | Sets **`--gk-tabs-slider-color`** |
| `sliderTransition` | `'fade' \| 'grow' \| 'shift'` | `'shift'` | Slider appearance transition |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab bar axis |
| `showArrows` | `boolean` | `false` | Scroll arrows (horizontal only); **`prev`** / **`next`** slots |
| `disabled` | `boolean` | `false` | Disables changing tabs |
| `spaced` | `boolean` | `false` | Gap between tab buttons |
| `items` | `GkTabItem[]` | `[]` | When non-empty, drives tabs and default panels |

#### Slots

| Slot | Props | Description |
|------|--------|-------------|
| `default` | — | **`GkTab`** children when **`items`** is empty |
| `tab` | **`item`** | Custom label for **`items`** mode |
| `tab.*` | **`item`** | e.g. **`tab.foo`** for `value: 'foo'` |
| `item` | **`item`** | Panel content for **`items`** mode |
| `item.*` | **`item`** | Per-value panel slot |
| `window` | — | Extra panels when using **slot-based** tabs |
| `prev` | — | Left scroll control when **`showArrows`** |
| `next` | — | Right scroll control when **`showArrows`** |

#### Events

| Event | Payload |
|-------|---------|
| `update:modelValue` | `string \| number \| undefined` |

### GkTab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | required | Tab id |
| `disabled` | `boolean` | `false` | |
| `text` | `string` | — | Default label |

Use inside **`GkTabs`** (default slot). When **`GkTabs`** uses **`items`**, **`GkTab`** is created internally.

### GkTabsWindow

Wrapper around panel content (single root). Usually omitted when **`GkTabs`** renders **`items`** panels automatically.

### GkTabsWindowItem

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string \| number` | Matches **`GkTab`** / **`items`** entry **`value`** |

### `parseGkTabItems`

Exported from **`god-kit/vue`** (and **`god-kit/vue/navigation`**) for custom lists.

### Injection

**`GK_TABS`** and **`GkTabsContext`** are exported for advanced composition.

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-tabs-height` | Tab min height |
| `--gk-tabs-slider-size` | Slider thickness |
| `--gk-tabs-slider-color` | Slider / accent line |
| `--gk-tabs-inset-padding` | Inset horizontal padding |
| `--gk-tabs-inset-radius` | Inset corner radius |
| `--gk-tabs-bg-color` | Tab strip background |
| `--gk-tabs-color` | Selected tab label color |

## Example (items)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkTabs } from 'god-kit/vue'

const tab = ref('one')
</script>

<template>
  <GkTabs v-model="tab" :items="['one', 'two']" grow>
    <template #item="{ item }">Content for {{ item }}</template>
  </GkTabs>
</template>
```

## Out of scope (v1)

Vuetify **VSlideGroup** overflow measurement, **VWindow** touch / continuous scroll, global **provideDefaults** theming, and density tokens parity.
