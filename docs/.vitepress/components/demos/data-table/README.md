# GkDataTable VitePress demos

Interactive examples for [`docs/components/data/gk-data-table.md`](../../../../components/data/gk-data-table.md). Each cookbook entry uses **`GkDocsExample`** plus a thin **`DemoGkDataTableSampleNNDoc.vue`** wrapper so the doc page embeds `<DemoGkDataTableSampleNNDoc />` and the copyable snippet is always the raw **`DemoGkDataTableSampleNN.vue`** source (no duplicated markdown fences).

## Add a new sample (e.g. Sample 11)

1. Create `DemoGkDataTableSample11.vue` in this folder (copy an existing sample as a template).
2. Create `DemoGkDataTableSample11Doc.vue` that imports **`GkDocsExample`**, the sample component, and **`./DemoGkDataTableSample11.vue?raw`** (see any existing `*Doc.vue` file).
3. Import both in [`registerDataTableDemos.ts`](./registerDataTableDemos.ts) and add them to **`dataTableDemoComponents`** under names **`DemoGkDataTableSample11`** and **`DemoGkDataTableSample11Doc`**.
4. In the doc page, add a `### Sample 11: …` section and embed **`<DemoGkDataTableSample11Doc />`** (prose only; no separate **Code** block).
5. Run `npm run docs:build` from the `god-kit` package root.

Global names are **`DemoGkDataTableSampleNN`** and **`DemoGkDataTableSampleNNDoc`** (PascalCase, matches the file names).

## Demo styling (convention)

Cookbook demos use **`density="compact"`** and **`:bordered="false"`** so grids read as dense admin tables without an outer chrome border; the wrapper uses **`vp-demo vp-demo--data-table`** for full-width layout in the doc column. Adjust per sample when showcasing **`striped`**, **`fixed-header`**, etc.

## Legacy alias

**`DemoGkDataTable`** is registered as the same component as **Sample 1** for older markdown or bookmarks.
