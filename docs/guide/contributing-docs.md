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
5. (Optional) Add **`DemoGk*.vue`** under **`.vitepress/components/demos/`**, register in **`.vitepress/theme/index.ts`**, and embed `<DemoGk… />` in the page.

## Conventions

- Use frontmatter: `title`, `description`, `outline: [2, 3]`.
- Sections: **Overview**, **Live demo** (optional), **API** (props / events / slots), **Examples** (code fences).

## Future automation

You can generate the Components sidebar from the filesystem with a small build script; until then, keep the sidebar list in sync by hand when adding pages.
