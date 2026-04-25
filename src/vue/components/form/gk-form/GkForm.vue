<script setup lang="ts">
import { computed, inject, provide, useTemplateRef } from 'vue'
import { GK_FORM_CONTROLS } from '../../../../injection'
import type { GkFormControlSize } from '../../../config/gk-kit-types'
import {
  attachSubmitPromise,
  createForm,
  type FormValidationResult,
  type SubmitEventPromise,
} from '../../../composables/useForm'

const props = withDefaults(
  defineProps<{
    /** Default control scale for all fields inside this form */
    controlSize?: GkFormControlSize
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

const parentFormControls = inject(GK_FORM_CONTROLS, null)
const formControlSize = computed(
  () => props.controlSize ?? parentFormControls?.size.value ?? ('md' as GkFormControlSize)
)
provide(GK_FORM_CONTROLS, { size: formControlSize })

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
