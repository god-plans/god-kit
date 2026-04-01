---
title: GkForm
description: Native form wrapper with submit validation hook and scoped slot helpers.
outline: [2, 3]
---

# GkForm

Renders a native `<form>` with **`novalidate`**, wires **`submit`** to async validation, and exposes **headless** state from **`createForm`** via the default slot. Does **not** register child fields like Vuetify; pair with **`GkField`** and app-level validation.

## When to use

Use `GkForm` when you want native form semantics plus async validation state exposed through slot props. Keep field rendering explicit with `GkField` and control primitives so apps can choose their own validation strategy.

## Live demo

<DemoGkForm />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Exposed on slot (future: provide to children) |
| `readonly` | `boolean` | `false` | Exposed on slot |

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

### Basic

```vue
<script setup lang="ts">
import { GkForm, GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <GkForm @submit="onSubmit">
    <template #default="{ validate }">
      <GkField label="Email" :error="err">
        <GkInput v-model="email" type="email" autocomplete="email" />
      </GkField>
      <button type="submit">Save</button>
    </template>
  </GkForm>
</template>
```

### Advanced

Handle **`submit`** and optionally await validation:

```ts
function onSubmit(e: SubmitEventPromise) {
  e.then((result) => {
    if (!result.valid) console.warn(result.errors)
  })
}
```

### Edge case

```vue
<GkForm :disabled="saving" :readonly="readOnlyReviewMode">
  <template #default="{ isDisabled, isReadonly, isValidating }">
    <p>Disabled: {{ isDisabled }} / Readonly: {{ isReadonly }}</p>
    <p>Validating: {{ isValidating }}</p>
  </template>
</GkForm>
```

## Accessibility notes

- Prefer real submit controls (`type="submit"`) so Enter-to-submit works naturally.
- Keep labels and error semantics in `GkField`; `GkForm` coordinates validation flow, not field accessibility markup.
- If async validation blocks submission, ensure busy state is visible on submit actions.

## Related components

- [GkField](./field)
- [GkInput](./input)
- [GkSelect](./select)
