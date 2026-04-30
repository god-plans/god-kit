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

Ten interactive cookbook samples live under **`docs/.vitepress/components/demos/data-table/`**. Each sample below embeds **GkDocsExample**: live table plus copyable source from the same `DemoGkDataTableSampleNN.vue` file. See the [contributor README](https://github.com/god-plans/god-kit/blob/main/docs/.vitepress/components/demos/data-table/README.md) to add more samples.

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

Each sample below shows the live table and **copyable Vue source** from the matching `DemoGkDataTableSampleNN.vue` (via `DemoGkDataTableSampleNNDoc`).

### Sample 1: Basic client table

Use when you only need columns, local sort, and paging.


<DemoGkDataTableSample01Doc />

### Sample 2: Client search

Use **`v-model:search`** for a quick filter; omit **`search-keys`** to search all leaf columns.


<DemoGkDataTableSample02Doc />

### Sample 3: Multi-sort

Set **`multi-sort`** so each sortable header toggles; order in **`sortBy`** is the compare order.


<DemoGkDataTableSample03Doc />

### Sample 4: Row selection

**`show-select`** adds a column; **`v-model:selected`** holds **`itemValue`** keys. Use **`item-selectable`** to skip rows (for example read-only rows).


<DemoGkDataTableSample04Doc />

### Sample 5: Expandable rows

**`show-expand`** plus **`#expanded-row`** for detail panels. **`v-model:expanded`** tracks open rows by **`itemValue`**.


<DemoGkDataTableSample05Doc />

### Sample 6: Group headers

**`group-by`** uses the first key for section breaks on the **current page** of items. Customize rendering with **`#group-header`**.


<DemoGkDataTableSample06Doc />

### Sample 7: Nested headers and fixed column

Use **`children`** on a header for grouped titles; set **`fixed: true`** (or **`'start'`** / **`'end'`**) on leaf columns for sticky edges inside the scroll container.


<DemoGkDataTableSample07Doc />

### Sample 8: Sticky header, stripes, density, scroll, mobile

Dense admin lists: **`density="compact"`**, **`striped`**, **`fixed-header`**, and **`max-height`** so only the body scrolls. For narrow viewports, set **`mobile="auto"`** (uses **`useGkDisplay().mobile`**) or **`mobile`** to always use the stacked card layout.


<DemoGkDataTableSample08Doc />

### Sample 9: Server mode (simulated)

In **server** mode the table **does not** sort or page the full dataset locally; you pass the **current page** of **`items`** and total **`items-length`**. Refetch when **`v-model:page`**, **`v-model:items-per-page`**, or **`v-model:sort-by`** changes.

The default footer uses **GkPagination** with **`pagination-total-visible="7"`** so large server-side page counts stay compact with ellipsis instead of rendering every page button on wide viewports. Keep the default footer for the built-in page-size select and pagination controls, or set **`hide-default-footer`** and provide your own **`#bottom`** / footer slots when you need a fully custom footer.


<DemoGkDataTableSample09Doc />

For real APIs, replace **`pageItems`** with data from `fetch` and set **`loading`** around the request.

### Sample 10: Virtualized body

**GkDataTableVirtual** window-rows large arrays with **@tanstack/vue-virtual**. Best for read-mostly grids; sorting and selection are usually handled separately or via headless composables.


<DemoGkDataTableSample10Doc />

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
