---
title: Contributing docs
description: How to add a new component page and sidebar entry in this VitePress site.
outline: [2, 3]
---

# Contributing docs

For the full workflow, **folder conventions**, and a **copy-paste agent prompt** for new primitives, see **[Component authoring](./component-authoring)**.

## Add a component page

1. Create the page in the matching category path:
   - `docs/components/form/<slug>.md`
   - `docs/components/containment/<slug>.md`
   - `docs/components/navigation/<slug>.md`
   - `docs/components/feedback/<slug>.md` (when applicable)
   - `docs/components/<slug>.md` for top-level primitives/layout docs
2. Copy structure from **`.vitepress/templates/component-template.md`** in the docs folder.
3. Add a **sidebar** item in **[`.vitepress/config.ts`](../.vitepress/config.ts)** under `themeConfig.sidebar['/components/']` in the matching group.
4. Add a row to **`docs/components/index.md`** in the right section.
5. Add **`DemoGk*.vue`** under **`.vitepress/components/demos/...`** mirroring category paths, register in **`.vitepress/theme/index.ts`**, and embed `<DemoGk… />` in the page.

## Kit configurator (VitePress theme)

The docs theme includes a **right-side drawer** opened from the **header** (**Kit settings** next to the nav). It is implemented in **`docs/.vitepress/components/GkDocsKitDrawer.vue`** and **`docs/.vitepress/theme/gk-kit-export.ts`**. Live preview covers **theme** (`useGkTheme`), **CSS design tokens** (radius, motion, focus, opacity), and **density**; **display**, **locale**, and **component defaults** only shape the copied export. When changing drawer behavior or export shape, update those files and keep the **`god-kit/vue/config`** Vite alias **before** **`god-kit/vue`** in **`docs/.vitepress/config.ts`**.

## Conventions

- Use frontmatter: `title`, `description`, `outline: [2, 3]`.
- Canonical sections (in order):
  1. **Overview**
  2. **When to use**
  3. **Live demo**
  4. **API** (props/events/slots/tokens)
  5. **Examples** (`Basic`, `Advanced`, `Edge case`)
  6. **Accessibility notes**
  7. **Related components**
- Sample taxonomy:
  - **Basic:** minimal happy path
  - **Advanced:** realistic app integration
  - **Edge case:** disabled/readonly/loading/error/RTL/keyboard-focused
- Use **`GkDocsExample`** for copy-paste samples that need a live preview and source code shown under the preview. Prefer one standalone sample component plus a `?raw` import for its source (for example, import `GkCardBasicExample.vue` and `GkCardBasicExample.vue?raw`) so the rendered demo and copied code cannot drift.
- Use **`GkDocsCodeBlock`** for standalone copyable snippets, generated playground code, or short recipes outside a full preview. It supports syntax highlighting, collapsed long snippets, expand/collapse, and copy state.
- For editable examples, prefer a small docs playground with form controls and generated code before adding a browser SFC compiler or heavy editor dependency.
- Use live demos for interactive behavior; use markdown code fences only for concise API notes that do not need copy buttons.

## Docs sample checklist

Before merging sample updates:

- [ ] Page follows canonical section order.
- [ ] At least one live demo is embedded.
- [ ] Includes one advanced and one edge-case snippet (or explicit reason why not applicable).
- [ ] Copyable examples use **`GkDocsExample`** or **`GkDocsCodeBlock`** and import sample source with `?raw` where possible instead of duplicating code in markdown or string constants.
- [ ] Editable playgrounds generate copyable code from current state instead of executing arbitrary user-provided SFC code.
- [ ] Accessibility notes cover keyboard/labels/state semantics when relevant.
- [ ] Related components section links to adjacent primitives.
- [ ] Sidebar + `docs/components/index.md` + theme demo registration are kept in sync.
- [ ] `npm run docs:build` and `npm run test` pass locally.

## Changelog

When you ship user-facing changes, add an entry under **`[Unreleased]`** in **`CHANGELOG.md`** at the package root (next to `package.json`), then move items into a dated version when you release. Keep **`docs/guide/changelog.md`** in sync (same sections) so the VitePress site matches the repo file.

For **bugs**, **features**, and **other** topics, use the **[GitHub issue templates](https://github.com/god-plans/god-kit/issues/new/choose)** (**Bug report**, **Feature request**, **Other / discussion**).

## Scaffolding

Run **`node scripts/new-component.mjs <kebab-name> [form|layout]`** from the **`god-kit`** package root. The optional second argument places the primitive under **`src/vue/components/form/`** or **`src/vue/components/layout/`** and writes docs/demos under matching paths. Without it, files go under **`src/vue/components/<name>/`** (e.g. **GkButton**). You still wire **`src/vue/index.ts`**, **`docs/.vitepress/theme/index.ts`**, the sidebar in **`config.ts`**, **`docs/components/index.md`**, and **`CHANGELOG.md`**.

## Future automation

You can generate the Components sidebar from the filesystem with a small build script; until then, keep the sidebar list in sync by hand when adding pages.

## Public CLI contract

The public CLI architecture, project detection matrix, and idempotency contract are documented in **[CLI architecture](./cli-architecture)**.

## Ownership cadence

- Assign a rotating docs owner each release.
- Run a monthly sample audit for high-traffic primitives (`GkInput`, `GkButton`, `GkTabs`, `GkMenu`, `GkDialog`, `GkPagination`).
