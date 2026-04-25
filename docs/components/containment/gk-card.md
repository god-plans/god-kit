---
title: GkCard
description: Surface container with media, title row, text, and actions — design-token variants, link or clickable surface, and loading.
outline: [2, 3]
---

# GkCard

A **card** primitive for admin layouts: a bordered, rounded surface (optional top media) with optional **title** / **subtitle** / **text** convenience props, slots for full composition, and **GkCardActions** for a footer action row. The API and layout are inspired by **Vuetify’s VCard**; the implementation is **God Kit–native** (Vue SFCs, `var(--gk-*)` tokens, no Vuetify runtime).

## When to use

- **Dashboard tiles**, feed items, and **lists of entities** (with **GkDataTable** or custom grids) where you need a consistent surface.
- **Teasers** with an image, headline, and CTA row (**GkButton** inside **GkCardActions**).
- **Navigable tiles** as a link (**`href`**) or a **clickable** `div` with `role="button"` when you need a single surface action without nested links.

For modal workflows, use **[GkDialog](./dialog)**. For a flex region without a full card chrome, use **[GkStack](../stack)** or **[GkContainer](../container)**.

## Live Examples

<DemoGkCard />

## API

### GkCard — props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'tonal' \| 'plain'` | `'elevated'` | **elevated:** surface + token shadow. **outlined:** border, no default shadow. **tonal:** primary-tinted fill. **plain:** no border, transparent. |
| `flat` | `boolean` | `false` | Forces **no** shadow (still applies border for non-plain variants). |
| `hover` | `boolean` | `false` | Stronger shadow on hover (ignored if **disabled** or **flat**). |
| `disabled` | `boolean` | `false` | Disables pointer events and lowers opacity; **root is not a link** while disabled. |
| `loading` | `boolean` | `false` | Full-card overlay and **`aria-busy`**. |
| `image` | `string` | — | Top media URL; overridden by slot **`#image`**. |
| `title` | `string \| number` | — | Shorthand for a header line (overridden by **`#title`**). |
| `subtitle` | `string \| number` | — | Shorthand (overridden by **`#subtitle`**). |
| `text` | `string \| number` | — | Body copy block (overridden by **`#text`**). |
| `href` | `string` | — | Renders the root as **`<a>`** (unless **disabled**). |
| `rel` | `string` | — | For anchors; if **`target="_blank"`**, defaults to `noopener noreferrer`. |
| `target` | `string` | — | Anchor target. |
| `download` | `boolean \| string` | — | Passed to the anchor when **`href`** is set. |
| `prependAvatar` | `string` | — | Optional header avatar URL (see **`#prepend`**). |
| `appendAvatar` | `string` | — | Optional trailing avatar URL (see **`#append`**). |
| `clickable` | `boolean` | `false` | If there is no **`href`**, the root is focusable with **`role="button"`** and keyboard **Enter** / **Space** (set only when the whole card is the control). |
| `width` / `maxWidth` / `height` / `maxHeight` | `string \| number` | — | Size on the root (numbers are treated as **px**). |
| `as` | `'div' \| 'article' \| 'section'` | `'div'` | Root element when the card is **not** a link. |
| `density` | `'comfortable' \| 'compact'` | `'comfortable'` | Slightly tighter padding. |
| `rounded` | `boolean` | `true` | When `false`, corner radius is **0**. |

Additional attributes (for example **`aria-label`**, **`id`**, **`class`**) are forwarded to the **root** element, except `class` / `style` are merged with the component’s own.

### GkCard — events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent \| KeyboardEvent` | For anchors, clickable cards, and any pointer/keyboard activation on the root. |

### GkCard — slots

| Slot | Description |
|------|-------------|
| `default` | Main content after the optional **text** block. |
| `image` | Top media; replaces **`image`**. |
| `title` / `subtitle` / `text` | Override the matching props. |
| `item` | Extra block inside the header row (below title/subtitle) when a header is shown. |
| `prepend` / `append` | Header start/end regions (or use avatar props). |
| `actions` | Footer; wrap actions in **GkCardActions** for layout. |
| `loader` | Replaces the default **GkSpinner** in the loading overlay. |

### Subcomponents

| Component | Role |
|-----------|------|
| **GkCardItem** | Single header row: prepend, title stack, default + **#item** slot, append. |
| **GkCardTitle** / **GkCardSubtitle** / **GkCardText** | Typography blocks for custom layouts; **GkCard** uses them internally for convenience content. **GkCardSubtitle** / **GkCardText** support an **`opacity` prop** (CSS custom property on the node). |
| **GkCardActions** | End-aligned, wrapping row for **GkButton** (or other controls). |

### Tokens

| Token | Purpose |
|-------|---------|
| `--gk-card-radius` | Corner radius. |
| `--gk-card-shadow` / `--gk-card-shadow-hover` | Elevation. |
| `--gk-card-border-width` | Border. |
| `--gk-card-padding` / `--gk-card-padding-compact` | Inner padding. |
| `--gk-card-media-min-height` | Min height of top media. |
| `--gk-card-actions-min-height` / `--gk-card-actions-gap` | Action row. |
| `--gk-card-loader-overlay` | Scrim over the card when **loading**. |

## Try It

Use the playground to change common options, preview the result, and copy generated Vue code.

<GkCardPlayground />

## Edge case (link, don’t nest buttons in a link)

If the root is an **`<a>`** (**`href`**), do not place **GkButton** or other focusable elements that perform a second navigation inside the same card (use a **clickable** card with **`@click`** and route in script, or keep only text in the link card).

## Accessibility

- **Loading** sets **`aria-busy="true"`** on the root.
- **Clickable** cards without **`href`** use **`role="button"`** and **`tabindex="0"`**; **Enter** and **Space** emit **`click`**. Prefer a real **`<a href>`** (or your router link as the root) for navigation so users get standard link behavior.
- When the whole card is a single action, do not add separate primary buttons inside the same card unless you use a different pattern (e.g. the card is static and only the buttons act).

## Related components

- [GkButton](../button) — primary actions inside **GkCardActions**
- [GkStack](../stack) — spacing and alignment around cards
- [GkDataTable](../data/gk-data-table) — **mobile** layout uses a stacked “card” pattern
