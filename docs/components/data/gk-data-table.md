---
title: GkDataTable
description: Ten cookbook samples (basic through virtual), API reference, and GkDataTableServer / GkDataTableVirtual — God Kit tokens and GkPagination.
outline: [2, 3]
---

# GkDataTable

**GkDataTable** is a tokenized **`<table>`**-based data grid for admin views. It composes **GkPagination**, **GkCheckbox**, and **GkSpinner**, supports **client** and **server** data modes, optional **row selection**, **expand** rows, **group headers**, **nested column headers**, **mobile** stacked layout, and **sticky** header / fixed columns.

Smaller than Vuetify **VDataTable**: no internal locale/theme service; v-models are explicit; import from **`god-kit/vue`** or **`god-kit/vue/data`**.

## When to use

Use for sortable, pageable lists where users need predictable keyboard targets and semantic table markup. Use **GkDataTableVirtual** when you must render **very large** row counts in a scrollport (windowed rows via **@tanstack/vue-virtual**). Use **GkDataTableServer** when the parent fetches each page from an API.

## Samples cookbook

Ten **Live** (interactive) examples and matching **Code** (copy-paste) blocks. Source for the demos is under **`docs/.vitepress/components/demos/data-table/`** in the repo; see the [contributor README](https://github.com/god-plans/god-kit/blob/main/docs/.vitepress/components/demos/data-table/README.md) to add more samples.

Import from **`god-kit/vue`** or **`god-kit/vue/data`**. Ensure **`god-kit/tokens.css`** and **`god-kit/vue.css`** are loaded in your app.

| # | Sample | Highlights |
|---|--------|------------|
| 1 | [Basic](#sample-1-basic-client-table) | Minimal columns, sort, pagination |
| 2 | [Search](#sample-2-client-search) | `v-model:search`, filter across columns |
| 3 | [Multi-sort](#sample-3-multi-sort) | `multi-sort`, several `sortBy` keys |
| 4 | [Selection](#sample-4-row-selection) | `show-select`, `item-value`, `item-selectable` |
| 5 | [Expand](#sample-5-expandable-rows) | `show-expand`, `#expanded-row` |
| 6 | [Grouping](#sample-6-group-headers) | `group-by`, `#group-header` |
| 7 | [Nested headers](#sample-7-nested-headers-and-fixed-column) | `children` in headers, `fixed` column |
| 8 | [Layout](#sample-8-sticky-header-stripes-density-scroll-mobile) | `fixed-header`, `striped`, `density`, `max-height`, `mobile` |
| 9 | [Server](#sample-9-server-mode-simulated) | `mode="server"`, `items-length`, loading |
| 10 | [Virtual](#sample-10-virtualized-body) | `GkDataTableVirtual`, large `items` |

### Sample 1: Basic client table

Use when you only need columns, local sort, and paging.

**Live**

<DemoGkDataTableSample01 />

**Code**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'sku', title: 'SKU' },
  { key: 'name', title: 'Product', sortable: true },
  { key: 'category', title: 'Category' },
  { key: 'qty', title: 'Qty', sortable: true },
  { key: 'price', title: 'Price', align: 'end' as const },
  { key: 'status', title: 'Status' },
]
const items = ref([
  { id: 'a1', sku: 'SKU-100', name: 'Keyboard', category: 'Input', qty: 12, price: 79, status: 'In stock' },
  { id: 'a2', sku: 'SKU-200', name: 'Monitor', category: 'Display', qty: 4, price: 329, status: 'Low' },
  { id: 'a3', sku: 'SKU-310', name: 'Dock', category: 'Accessories', qty: 18, price: 149, status: 'In stock' },
  { id: 'a4', sku: 'SKU-055', name: 'Webcam', category: 'AV', qty: 0, price: 89, status: 'Backorder' },
  { id: 'a5', sku: 'SKU-420', name: 'Headset', category: 'AV', qty: 25, price: 129, status: 'In stock' },
  { id: 'a6', sku: 'SKU-088', name: 'Mouse', category: 'Input', qty: 40, price: 59, status: 'In stock' },
])
const page = ref(1)
const itemsPerPage = ref(5)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
</script>

<template>
  <GkDataTable
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :bordered="false"
    density="compact"
    :headers="headers"
    :items="items"
    caption="Inventory"
  />
</template>
```

### Sample 2: Client search

Use **`v-model:search`** for a quick filter; omit **`search-keys`** to search all leaf columns.

**Live**

<DemoGkDataTableSample02 />

**Code**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'city', title: 'City', sortable: true },
  { key: 'region', title: 'Subregion' },
  { key: 'country', title: 'Country' },
  { key: 'pop', title: 'Pop. (M)', align: 'end' as const },
]
const items = ref([
  { id: 1, city: 'Oslo', region: 'Eastern', country: 'NO', pop: 1.1 },
  { id: 2, city: 'Bergen', region: 'Western', country: 'NO', pop: 0.29 },
  { id: 3, city: 'Stockholm', region: 'Södermanland', country: 'SE', pop: 1.0 },
  { id: 4, city: 'Gothenburg', region: 'Västra Götaland', country: 'SE', pop: 0.58 },
  { id: 5, city: 'Copenhagen', region: 'Capital', country: 'DK', pop: 0.8 },
  { id: 6, city: 'Helsinki', region: 'Uusimaa', country: 'FI', pop: 0.66 },
])
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
</script>

<template>
  <div>
    <input v-model="search" type="search" placeholder="Search…" />
    <GkDataTable
      v-model:search="search"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Offices (client filter)"
    />
  </div>
</template>
```

### Sample 3: Multi-sort

Set **`multi-sort`** so each sortable header toggles; order in **`sortBy`** is the compare order.

**Live**

<DemoGkDataTableSample03 />

**Code**

```vue
<GkDataTable
  v-model:page="page"
  v-model:items-per-page="itemsPerPage"
  v-model:sort-by="sortBy"
  multi-sort
  :bordered="false"
  density="compact"
  :headers="headers"
  :items="items"
  caption="Multi-sort (toggle several columns)"
/>
```

### Sample 4: Row selection

**`show-select`** adds a column; **`v-model:selected`** holds **`itemValue`** keys. Use **`item-selectable`** to skip rows (for example read-only rows).

**Live**

<DemoGkDataTableSample04 />

**Code**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const selected = ref<unknown[]>([])
const headers = [
  { key: 'task', title: 'Task' },
  { key: 'status', title: 'Status' },
  { key: 'assignee', title: 'Assignee' },
  { key: 'due', title: 'Due' },
]
const items = ref([
  { id: 't1', task: 'Deploy API', status: 'Done', assignee: 'Alex', due: 'Apr 02' },
  { id: 't2', task: 'Security audit', status: 'Blocked', assignee: 'Sam', due: 'Apr 10' },
  { id: 't3', task: 'Docs refresh', status: 'In progress', assignee: 'Jordan', due: 'Apr 14' },
  { id: 't4', task: 'Load test', status: 'Todo', assignee: 'Riley', due: 'Apr 20' },
])

function itemSelectable(row: Record<string, unknown>) {
  return row.status !== 'Blocked'
}
</script>

<template>
  <GkDataTable
    v-model:selected="selected"
    show-select
    item-value="id"
    :item-selectable="itemSelectable"
    :bordered="false"
    density="compact"
    :headers="headers"
    :items="items"
    caption="Selection (Blocked rows cannot be selected)"
  />
</template>
```

### Sample 5: Expandable rows

**`show-expand`** plus **`#expanded-row`** for detail panels. **`v-model:expanded`** tracks open rows by **`itemValue`**.

**Live**

<DemoGkDataTableSample05 />

**Code**

```vue
<GkDataTable
  v-model:expanded="expanded"
  show-expand
  item-value="id"
  :bordered="false"
  density="compact"
  :headers="headers"
  :items="items"
  caption="Expandable rows"
>
  <template #expanded-row="{ item }">
    <p>{{ typeof item.notes === 'string' ? item.notes : '' }}</p>
  </template>
</GkDataTable>
```

### Sample 6: Group headers

**`group-by`** uses the first key for section breaks on the **current page** of items. Customize rendering with **`#group-header`**.

**Live**

<DemoGkDataTableSample06 />

**Code**

```vue
<GkDataTable
  v-model:sort-by="sortBy"
  :bordered="false"
  density="compact"
  :headers="headers"
  :items="items"
  :group-by="['region']"
  caption="Grouped by region (current page)"
>
  <template #group-header="{ groupKey, groupValue }">
    Region: {{ groupValue }} ({{ groupKey }})
  </template>
</GkDataTable>
```

### Sample 7: Nested headers and fixed column

Use **`children`** on a header for grouped titles; set **`fixed: true`** (or **`'start'`** / **`'end'`**) on leaf columns for sticky edges inside the scroll container.

**Live**

<DemoGkDataTableSample07 />

**Code**

```vue
<script setup lang="ts">
import { GkDataTable } from 'god-kit/vue'

const headers = [
  {
    key: 'q1',
    title: 'Q1',
    children: [
      { key: 'a', title: 'Alpha', sortable: true },
      { key: 'b', title: 'Beta', sortable: true },
      { key: 'c', title: 'Gamma', sortable: true },
    ],
  },
  {
    key: 'q2',
    title: 'Q2',
    children: [
      { key: 'x', title: 'X', sortable: true },
      { key: 'y', title: 'Y', sortable: true },
    ],
  },
  { key: 'total', title: 'Total', sortable: true, fixed: 'end' as const },
]
const items = [
  { id: 1, a: 10, b: 20, c: 5, x: 4, y: 8, total: 47 },
  { id: 2, a: 12, b: 8, c: 14, x: 6, y: 3, total: 43 },
  { id: 3, a: 7, b: 22, c: 9, x: 11, y: 7, total: 56 },
]
</script>

<template>
  <GkDataTable
    :headers="headers"
    :items="items"
    :max-height="320"
    :bordered="false"
    density="compact"
    caption="Nested headers + fixed total column"
  />
</template>
```

### Sample 8: Sticky header, stripes, density, scroll, mobile

Dense admin lists: **`density="compact"`**, **`striped`**, **`fixed-header`**, and **`max-height`** so only the body scrolls. For narrow viewports, set **`mobile="auto"`** (uses **`useGkDisplay().mobile`**) or **`mobile`** to always use the stacked card layout.

**Live**

<DemoGkDataTableSample08 />

**Code**

```vue
<GkDataTable
  :headers="headers"
  :items="items"
  :bordered="false"
  density="compact"
  striped
  fixed-header
  :max-height="280"
  mobile="auto"
  caption="Compact, striped, sticky header, scroll, mobile:auto"
/>
```

### Sample 9: Server mode (simulated)

In **server** mode the table **does not** sort or page the full dataset locally; you pass the **current page** of **`items`** and total **`items-length`**. Refetch when **`v-model:page`**, **`v-model:items-per-page`**, or **`v-model:sort-by`** changes.

The default footer uses **GkPagination** with **`pagination-total-visible="7"`** so large server-side page counts stay compact with ellipsis instead of rendering every page button on wide viewports. Keep the default footer for the built-in page-size select and pagination controls, or set **`hide-default-footer`** and provide your own **`#bottom`** / footer slots when you need a fully custom footer.

**Live**

<DemoGkDataTableSample09 />

**Code**

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const allRows = ref(
  Array.from({ length: 47 }, (_, i) => ({
    id: i,
    name: `Row ${i}`,
    region: ['eu', 'us', 'ap'][i % 3]!,
    status: ['ok', 'warn', 'idle'][i % 3]!,
  }))
)
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
const loading = ref(false)

const total = computed(() => allRows.value.length)

const pageItems = computed(() => {
  const ipp = itemsPerPage.value
  const start = (page.value - 1) * ipp
  return allRows.value.slice(start, start + ipp)
})

const headers = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'region', title: 'Region' },
  { key: 'status', title: 'Status' },
]
</script>

<template>
  <GkDataTable
    mode="server"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="pageItems"
    :items-length="total"
    :loading="loading"
    :bordered="false"
    density="compact"
    caption="Server mode (simulated slice)"
  />
</template>
```

For real APIs, replace **`pageItems`** with data from `fetch` and set **`loading`** around the request.

### Sample 10: Virtualized body

**GkDataTableVirtual** window-rows large arrays with **@tanstack/vue-virtual**. Best for read-mostly grids; sorting and selection are usually handled separately or via headless composables.

**Live**

<DemoGkDataTableSample10 />

**Code**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { GkDataTableVirtual } from 'god-kit/vue'

const headers = [
  { key: 'n', title: '#', sortable: false, align: 'end' as const },
  { key: 'label', title: 'Label' },
  { key: 'status', title: 'Status' },
  { key: 'category', title: 'Category' },
]
const items = computed(() =>
  Array.from({ length: 5000 }, (_, i) => ({
    n: i + 1,
    label: `Row ${i + 1}`,
    status: ['ok', 'warn', 'idle'][i % 3]!,
    category: ['A', 'B', 'C', 'D'][i % 4]!,
  }))
)
</script>

<template>
  <GkDataTableVirtual
    :headers="headers"
    :items="items"
    :height="360"
    :estimate-size="44"
    :bordered="false"
    column-min-width="5.5rem"
  />
</template>
```

---

## API — GkDataTable

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headers` | `GkDataTableColumn[]` | required | Columns; optional `children` for grouped headers |
| `items` | `Record<string, unknown>[]` | required | Rows; in **server** mode usually the current page |
| `mode` | `'client' \| 'server'` | `'client'` | **client**: filter/sort/paginate locally. **server**: show `items` as returned; use `itemsLength` for pagination |
| `itemsLength` | `number` | — | Required for **server**: total items across pages |
| `loading` | `boolean` | `false` | Shows spinner and `aria-busy` on the table |
| `multiSort` | `boolean` | `false` | Shift-style multi-column sort (toggle adds sorts) |
| `searchKeys` | `string[]` | — | Limit **client** search to these column keys |
| `showSelect` | `boolean` | `false` | Selection column with **GkCheckbox** |
| `showExpand` | `boolean` | `false` | Expand toggle + **`#expanded-row`** slot |
| `itemValue` | `keyof T \| (row) => unknown` | — | Row key for selection/expand; defaults to `id`, `key`, or JSON |
| `itemSelectable` | `(row) => boolean` | always `true` | Disables row checkbox when `false` |
| `itemsPerPageOptions` | `number[]` | `[10,25,50,100]` | Native `<select>` for page size |
| `density` | `'comfortable' \| 'compact'` | `'comfortable'` | Row min-heights via tokens |
| `striped` | `boolean` | `false` | Zebra striping (disabled when `groupBy` is set) |
| `hover` | `boolean` | `true` | Row hover background |
| `fixedHeader` | `boolean` | `false` | Sticky `<thead>` |
| `mobile` | `boolean \| 'auto'` | `false` | **`auto`**: uses **`useGkDisplay().mobile`** for stacked cards |
| `groupBy` | `string[]` | — | Single-level group breaks on `groupBy[0]` (within current page) |
| `caption` | `string` | — | `<caption>` text |
| `hideDefaultFooter` | `boolean` | `false` | Hides pagination + page size |
| `hideDefaultHeader` | `boolean` | `false` | Hides `<thead>` |
| `hideSelectAll` | `boolean` | `false` | Hides header select-all checkbox |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Passed to **GkPagination** |
| `paginationTotalVisible` | `number \| string` | `7` | Max page number buttons in the default footer **GkPagination** |
| `paginationShowFirstLastPage` | `boolean` | `false` | Shows first/last controls in the default footer **GkPagination** |
| `paginationEllipsis` | `string` | `'...'` | Ellipsis text for compact page ranges in the default footer **GkPagination** |
| `maxHeight` | `string \| number` | — | Scrollport on **GkTableScroll** |
| `bordered` | `boolean` | `true` | Outer border on scroll wrapper |

### v-models

| v-model | Type | Description |
|---------|------|-------------|
| `search` | `string` | Client filter string |
| `sortBy` | `{ key, order }[]` | Active sorts |
| `page` | `number` | Current page (1-based) |
| `itemsPerPage` | `number` | Page size |
| `selected` | `unknown[]` | Selected **itemValue** keys |
| `expanded` | `unknown[]` | Expanded **itemValue** keys |

### Events

| Event | Payload |
|-------|---------|
| `click:row` | `row`, `MouseEvent` |

### Slots

| Slot | Description |
|------|-------------|
| `top` / `bottom` | Surround table; receive slot props (`page`, `itemsPerPage`, `sortBy`, `pageCount`, `items`) |
| `header.<key>` | Custom header for column `key` — props: `column`, `sortBy`, `toggleSort` |
| `item.<key>` | Cell — props: `item`, `column`, `value` |
| `group-header` | Group row — props: `groupKey`, `groupValue`, `depth` |
| `expanded-row` | Expanded panel — props: `item` |
| `no-data` | Empty state |
| `body.prepend` / `body.append` | Extra tbody rows |
| `footer.prepend` / `footer.append` | Beside default footer |

### Tokens

See [Design tokens](../../guide/tokens) — `--gk-table-*` variables (border, header, stripe, sticky shadows, density).

---

## GkDataTableServer

Thin wrapper: sets **`mode="server"`** and forwards slots. Props: **`headers`**, **`items`**, **`itemsLength`** (required) plus the same v-models and slots as **GkDataTable**.

---

## GkDataTableVirtual

Grid-based **virtualized** body for large `items` arrays. Props: **`headers`**, **`items`**, **`height`** (scrollport, passed as **`max-height`**), **`estimateSize`** (px, default `48`), **`bordered`**, **`columnMinWidth`**. Same **`item.<key>`** slots as **GkDataTable**. Does not duplicate selection/sort UI — use for read-mostly huge lists or combine with headless composables.

---

## Headless composables

Import from **`god-kit/vue`** or **`god-kit/vue/data`**: **`useGkTableSort`**, **`useGkTablePagination`**, **`useGkTableSelection`**, **`useGkTableExpand`**, **`useGkTableFilter`**, **`useGkTableGrouping`**, plus **`getLeafColumns`**, **`buildTheadRows`**, **`getItemKey`**, **`getRowValue`**.

**GkDataTableServer** and **GkDataTableVirtual** usage appears in [Sample 9](#sample-9-server-mode-simulated) and [Sample 10](#sample-10-virtualized-body) above.

## Accessibility notes

- Sort state is exposed with **`aria-sort`** on **`<th>`** (not on the sort button).
- The table sets **`aria-busy`** while **`loading`** is true.
- Prefer a visible **`caption`** or title near the table for screen reader context.

## Related

- [Migrating from Vuetify VDataTable](../../guide/migration-vuetify-data-table)
- [Design tokens](../../guide/tokens)
- [GkPagination](../navigation/pagination)
