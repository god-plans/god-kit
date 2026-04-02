<script setup lang="ts">
import { useTemplateRef } from 'vue'
import {
  attachSubmitPromise,
  createForm,
  type FormValidationResult,
  type SubmitEventPromise,
} from '../../../composables/useForm'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    readonly?: boolean
    /**
     * Custom validation (e.g. async API check). While it runs, slot **`isValidating`** is **`true`**.
     * Omit to use the default **`createForm`** validation (errors ref only).
     */
    validate?: () => FormValidationResult | Promise<FormValidationResult>
  }>(),
  {
    disabled: false,
    readonly: false,
  }
)

const emit = defineEmits<{
  submit: [e: SubmitEventPromise]
}>()

const formEl = useTemplateRef<HTMLFormElement>('formEl')

const form = createForm({
  disabled: () => props.disabled,
  readonly: () => props.readonly,
  ...(props.validate
    ? {
        validate: () => props.validate!(),
      }
    : {}),
})

/** Top-level refs so the template unwraps them; `form.isValidating` on a plain object would pass the Ref into the slot (always truthy). */
const {
  errors,
  isDisabled,
  isReadonly,
  isValidating,
  isValid,
  items,
  validate,
  reset,
  resetValidation,
} = form

/** After the browser resets controls, clear validation state */
function onReset() {
  reset()
}

function onSubmit(e: SubmitEvent) {
  const ready = validate()
  const evt = attachSubmitPromise(e, ready)
  emit('submit', evt)
  e.preventDefault()
  if (!evt.defaultPrevented) {
    ready.then((result: FormValidationResult) => {
      if (result.valid) {
        formEl.value?.submit()
      }
    })
  }
}
</script>

<template>
  <form
    ref="formEl"
    class="gk-form"
    novalidate
    @reset="onReset"
    @submit="onSubmit"
  >
    <slot
      :errors="errors"
      :is-disabled="isDisabled"
      :is-readonly="isReadonly"
      :is-validating="isValidating"
      :is-valid="isValid"
      :items="items"
      :validate="validate"
      :reset="reset"
      :reset-validation="resetValidation"
    />
  </form>
</template>

<style scoped>
.gk-form {
  display: block;
  width: 100%;
}
</style>
