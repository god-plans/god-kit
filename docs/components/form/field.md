---
title: GkField
description: Field wrapper with label, default slot for the control, hint text, and error message.
outline: [2, 3]
---

# GkField

Wraps a single form control: **label** (optional), **default slot** for **GkInput** (or future controls), an optional **hint**, and an **error** string with `role="alert"`.

## When to use

Use for every labeled control in a form so ids, `aria-describedby`, and error text stay consistent.

## Live Examples

<DemoGkField />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Visible label text |
| `error` | `string` | — | Error message; sets invalid state on child input |
| `hint` | `string` | — | Helper text under the control; hidden while `error` is set |
| `labelSrOnly` | `boolean` | `false` | Visually hide label but keep for screen readers |

### Slots

| Slot | Description |
|------|-------------|
| `default` | The input or control (e.g. GkInput) |

### Provide / inject

GkField uses **`useFieldIds()`** internally, then **provides** context for child controls (`inputId`, `errorId`, `errorMessage`, `hintId`, `hintMessage`). See [Composables](/guide/composables) for headless usage without **GkField**. You rarely need to use the injection key directly; import **`GK_FIELD`** from `god-kit/vue` only for advanced cases.

### Hint and error

```vue
<GkField label="Email" hint="We never share it.">
  <GkInput v-model="email" type="email" />
</GkField>
```

An **`error`** replaces the hint rather than stacking with it, so the control's **`aria-describedby`** always points at exactly one message and screen readers announce the error instead of stale help text.

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

## Accessibility notes

- Keep one control per field wrapper so label/id relationships remain clear.
- `hint` and `error` are mutually exclusive by design: only one is rendered, and it is the one `aria-describedby` references.
- Use `labelSrOnly` only when visible label text exists elsewhere in nearby UI context.

## Related components

- [GkInput](./input)
- [GkTextarea](./textarea)
- [GkSelect](./select)
