---
title: GkForm
description: Native form wrapper with submit validation hook and scoped slot helpers.
outline: [2, 3]
---

# GkForm

Renders a native `<form>` with **`novalidate`**, wires **`submit`** to async validation, and exposes **headless** state from **`createForm`** via the default slot. Does **not** register child fields like Vuetify; pair with **`GkField`** and app-level validation.

## When to use

Use `GkForm` when you want native form semantics plus async validation state exposed through slot props. Keep field rendering explicit with `GkField` and control primitives so apps can choose their own validation strategy.

## Live Examples

<DemoGkForm />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `controlSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Default visual scale for **GkInput**, **GkSelect**, **GkTextarea**, **GkCheckbox**, and **GkRadio** inside this form via **`GK_FORM_CONTROLS`**. Omitted: inherits from a parent [GkFormControlsProvider](/guide/global-configuration#form-control-size) or **`createGkKit({ form: { defaultControlSize } })`**, else **`md`**. |
| `disabled` | `boolean` | `false` | Exposed on slot (future: provide to children) |
| `readonly` | `boolean` | `false` | Exposed on slot |
| `validate` | `() => FormValidationResult \| Promise<FormValidationResult>` | — | Optional custom validation (e.g. async API). While it runs, slot **`isValidating`** is **`true`**. Omit for default **`createForm`** behavior (errors ref only). |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `submit` | `SubmitEventPromise` | Fired on submit; the event is extended with **`then` / `catch` / `finally`** bound to the validation **Promise** (Vuetify-style). Default action is **`preventDefault`**. If the listener does **not** call **`preventDefault`**, and validation resolves **`valid: true`**, **`HTMLFormElement.submit()`** is called (no second `submit` event). |

### Default slot (scoped)

| Prop | Type | Description |
|------|------|-------------|
| `errors` | `FieldValidationResult[]` | Collected errors (empty until you wire **`createForm`** with custom **`validate`**) |
| `isDisabled` | `boolean` | From props |
| `isReadonly` | `boolean` | From props |
| `isValidating` | `boolean` | While **`validate()`** runs |
| `isValid` | `boolean \| null` | Last validation outcome |
| `items` | `FormField[]` | Reserved (currently `[]`) |
| `validate` | `() => Promise<FormValidationResult>` | Run validation |
| `reset` | `() => void` | Clears validation state (native reset is handled by the browser **`reset`** button) |
| `resetValidation` | `() => void` | Clears errors only |

## Headless `createForm`

Use **`createForm`** from **`god-kit/vue`** (or **`vue/form`**) when you need the same state object without **`GkForm`**:

```ts
import { createForm } from 'god-kit/vue'

const form = createForm({
  disabled: () => false,
  readonly: () => false,
  async validate() {
    return { valid: true, errors: [] }
  },
})
```

## Examples

Each scenario under **Live Examples** includes a copyable Vue snippet.

For **`SubmitEventPromise`**, handle async results on the event (for example `e.then((result) => { … })`) so you run code after validation finishes.

## Accessibility notes

- Prefer real submit controls (`type="submit"`) so Enter-to-submit works naturally.
- Keep labels and error semantics in `GkField`; `GkForm` coordinates validation flow, not field accessibility markup.
- If async validation blocks submission, ensure busy state is visible on submit actions.

## Related

- [Form control size](/guide/global-configuration#form-control-size) — defaults and **`GK_FORM_CONTROLS`**
- [GkField](./field)
- [GkInput](./input)
- [GkSelect](./select)
