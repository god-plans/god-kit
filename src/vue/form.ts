export { GK_FIELD, GK_FORM_CONTROLS, GK_RADIO_GROUP } from '../injection'
export type {
  GkFieldContext,
  GkFormControlsContext,
  GkRadioGroupContext,
} from '../injection'

export { useFieldIds } from './composables/useFieldIds'
export type { GkFieldIds } from './composables/useFieldIds'
export { useFormControl } from './composables/useFormControl'
export type { UseFormControlOptions, UseFormControlReturn } from './composables/useFormControl'
export { isGkFormControlSize, useGkFormControlSize } from './composables/useGkFormControlSize'
export {
  GK_FORM_CONTROL_SIZES,
  type GkFormControlSize,
} from './config/gk-kit-types'
export {
  attachSubmitPromise,
  createForm,
} from './composables/useForm'
export type {
  CreateFormOptions,
  CreateFormReturn,
  FieldValidationResult,
  FormField,
  FormValidationResult,
  SubmitEventPromise,
} from './composables/useForm'

export { default as GkFormControlsProvider } from './components/config/GkFormControlsProvider.vue'
export { default as GkForm } from './components/form/gk-form/GkForm.vue'
export { default as GkInput } from './components/form/input/GkInput.vue'
export { default as GkField } from './components/form/field/GkField.vue'
export { default as GkTextarea } from './components/form/textarea/GkTextarea.vue'
export { default as GkCheckbox } from './components/form/checkbox/GkCheckbox.vue'
export { default as GkRadioGroup } from './components/form/radio/GkRadioGroup.vue'
export { default as GkRadio } from './components/form/radio/GkRadio.vue'
export { default as GkSelect } from './components/form/select/GkSelect.vue'
export type { GkSelectOption } from './components/form/select/select-types'
