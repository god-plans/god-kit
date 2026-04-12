---
title: Migrating from Vuetify VDataTable
description: Map Vuetify VDataTable / VDataTableServer props and slots to God Kit GkDataTable equivalents.
outline: [2, 3]
---

# Migrating from Vuetify VDataTable

God Kit **GkDataTable** follows the same mental model as Vuetify **VDataTable** / **VDataTableServer**, but uses explicit **`v-model`** fields and **God Kit** tokens. There is no legacy Options API or Vuetify defaults provider.

## Component mapping

| Vuetify | God Kit |
|---------|---------|
| `VDataTable` | `GkDataTable` (`mode="client"`, default) |
| `VDataTableServer` | `GkDataTableServer` or `GkDataTable` with `mode="server"` |
| `VDataTableVirtual` | `GkDataTableVirtual` |

## Props (common)

| Vuetify | GkDataTable |
|---------|-------------|
| `headers` | `headers` — `key`, `title`, `value`, `sortable`, `align`, `width`, `fixed`, `children`, … |
| `items` | `items` |
| `loading` | `loading` |
| `search` | `v-model:search` (client filter) |
| `sort-by` / `multi-sort` | `v-model:sort-by`, `multi-sort` |
| `page` / `items-per-page` | `v-model:page`, `v-model:items-per-page` |
| `items-length` (server) | `items-length` + `mode="server"` |
| `show-select` | `show-select` |
| `show-expand` | `show-expand` |
| `item-value` | `item-value` |
| `item-selectable` | `item-selectable` |
| `group-by` | `group-by` (first key used for group breaks on the current page) |
| `hide-default-footer` | `hide-default-footer` |
| `hide-default-header` | `hide-default-header` |

## Slots

| Vuetify | GkDataTable |
|---------|-------------|
| `item.<name>` | `item.<key>` |
| `header.<name>` | `header.<key>` |
| `body.append` / `body.prepend` | Same |
| `no-data` | `no-data` |
| `top` / `bottom` | Same |
| `group-header` | `group-header` |
| Expanded content | `expanded-row` |

## What is different

- **Styling**: `--gk-table-*` tokens and **Gk** components — not Material Design 3 density classes.
- **Pagination**: **GkPagination** + native `<select>` for page size (no `v-data-footer` clone).
- **i18n**: Pass your own labels (e.g. “Rows per page”) via slots or future locale keys in your app.
- **Virtual**: **GkDataTableVirtual** uses a CSS grid body; column resize / Excel-style grids are out of scope for the first release.

After migration, remove **`god-kit/bridge/vuetify.css`** from that route if Vuetify is fully gone.
