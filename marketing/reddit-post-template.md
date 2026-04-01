# Reddit post template

## Suggested title

What we learned building a Vue 3 + Nuxt 4 admin UI kit (tokens, a11y, migration)

## Draft body

We built `god-kit` to solve admin UI consistency issues while migrating from a Vuetify-heavy codebase.

Main technical choices:

- semantic CSS variables (`--gk-*`) as a source of truth
- typed Vue exports and focused subpath entry points
- accessibility checks with `axe-core` in component specs
- migration bridge CSS so legacy and new screens can coexist

Biggest tradeoff: this is intentionally opinionated for dashboard/internal-tool use cases, not every possible UI pattern.

If useful, docs and examples are here: https://god-plans.github.io/god-kit/
