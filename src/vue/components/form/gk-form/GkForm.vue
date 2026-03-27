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
})

/** After the browser resets controls, clear validation state */
function onReset() {
  form.reset()
}

function onSubmit(e: SubmitEvent) {
  const ready = form.validate()
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
      :errors="form.errors"
      :is-disabled="form.isDisabled"
      :is-readonly="form.isReadonly"
      :is-validating="form.isValidating"
      :is-valid="form.isValid"
      :items="form.items"
      :validate="form.validate"
      :reset="form.reset"
      :reset-validation="form.resetValidation"
    />
  </form>
</template>

<style scoped>
.gk-form {
  display: block;
  width: 100%;
}
</style>
