# GkDataTable VitePress demos

Interactive examples for [`docs/components/data/gk-data-table.md`](../../../../components/data/gk-data-table.md).

## Add a new sample (e.g. Sample 11)

1. Create `DemoGkDataTableSample11.vue` in this folder (copy an existing sample as a template).
2. Import it in [`registerDataTableDemos.ts`](./registerDataTableDemos.ts) and add it to **`dataTableDemoComponents`**.
3. In the doc page, add a `### Sample 11: …` section with **Live** (`<DemoGkDataTableSample11 />`) and a **Code** block.
4. Run `npm run docs:build` from the `god-kit` package root.

Global names are **`DemoGkDataTableSampleNN`** (PascalCase, matches the file name).

## Demo styling (convention)

Cookbook demos use **`density="compact"`** and **`:bordered="false"`** so grids read as dense admin tables without an outer chrome border; the wrapper uses **`vp-demo vp-demo--data-table`** for full-width layout in the doc column. Adjust per sample when showcasing **`striped`**, **`fixed-header`**, etc.

## Legacy alias

**`DemoGkDataTable`** is registered as the same component as **Sample 1** for older markdown or bookmarks.
