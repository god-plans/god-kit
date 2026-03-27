---
title: Contributing docs
description: How to add a new component page and sidebar entry in this VitePress site.
outline: [2, 3]
---

# Contributing docs

## Add a component page

1. Create **`docs/components/<slug>.md`** (e.g. `checkbox.md` for `GkCheckbox`).
2. Copy structure from **`.vitepress/templates/component-template.md`** in the docs folder.
3. Add a **sidebar** item in **[`.vitepress/config.ts`](../.vitepress/config.ts)** under `themeConfig.sidebar['/components/']` → Components list.
4. Add a row to **`docs/components/index.md`** overview table.
5. (Optional) Add **`DemoGk*.vue`** under **`.vitepress/components/demos/<component>/`** (e.g. `demos/button/DemoGkButton.vue`), register in **`.vitepress/theme/index.ts`**, and embed `<DemoGk… />` in the page.

## Conventions

- Use frontmatter: `title`, `description`, `outline: [2, 3]`.
- Sections: **Overview**, **Live demo** (optional), **API** (props / events / slots), **Examples** (code fences).

## Changelog

When you ship user-facing changes, add an entry under **`[Unreleased]`** in **`CHANGELOG.md`** at the package root (next to `package.json`), then move items into a dated version when you release. Keep **`docs/guide/changelog.md`** in sync (same sections) so the VitePress site matches the repo file.

## Scaffolding

Run **`node scripts/new-component.mjs <kebab-name>`** from the **`god-kit`** package root to create a component folder, test stubs, a demo Vue file, and a starter **`docs/components/<slug>.md`**. You still wire **`src/vue/index.ts`**, **`docs/.vitepress/theme/index.ts`**, the sidebar in **`config.ts`**, **`docs/components/index.md`**, and **`CHANGELOG.md`**.

## Future automation

You can generate the Components sidebar from the filesystem with a small build script; until then, keep the sidebar list in sync by hand when adding pages.
