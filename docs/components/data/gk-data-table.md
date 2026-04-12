---
title: GkDataTable
description: Client and server data tables with sorting, pagination, selection, grouping, and optional virtualization — aligned with God Kit tokens and GkPagination.
outline: [2, 3]
---

# GkDataTable

**GkDataTable** is a tokenized **`<table>`**-based data grid for admin views. It composes **GkPagination**, **GkCheckbox**, and **GkSpinner**, supports **client** and **server** data modes, optional **row selection**, **expand** rows, **group headers**, **nested column headers**, **mobile** stacked layout, and **sticky** header / fixed columns.

Smaller than Vuetify **VDataTable**: no internal locale/theme service; v-models are explicit; import from **`god-kit/vue`** or **`god-kit/vue/data`**.

## When to use

Use for sortable, pageable lists where users need predictable keyboard targets and semantic table markup. Use **GkDataTableVirtual** when you must render **very large** row counts in a scrollport (windowed rows via **@tanstack/vue-virtual**). Use **GkDataTableServer** when the parent fetches each page from an API.

## Live demo

<DemoGkDataTable />

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

## Examples

### Server mode

```vue
<GkDataTableServer
  v-model:page="page"
  v-model:items-per-page="pageSize"
  v-model:sort-by="sortBy"
  :headers="headers"
  :items="rows"
  :items-length="total"
  :loading="pending"
/>
```

### Virtual list

```vue
<GkDataTableVirtual
  :headers="headers"
  :items="allRows"
  :height="480"
  :estimate-size="52"
/>
```
