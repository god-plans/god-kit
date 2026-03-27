import { computed, ref, type ComputedRef, type MaybeRefOrGetter, type Ref, toValue } from 'vue'

/** Single-field validation message(s) */
export type FieldValidationResult = {
  id?: string
  errorMessages?: string[]
}

export type FormValidationResult = {
  valid: boolean
  errors: FieldValidationResult[]
}

/** Reserved for future field registration (currently always `[]`) */
export type FormField = {
  id: string
}

export type CreateFormOptions = {
  disabled?: MaybeRefOrGetter<boolean>
  readonly?: MaybeRefOrGetter<boolean>
  /** Custom validation; default treats empty `errors` as valid */
  validate?: () => FormValidationResult | Promise<FormValidationResult>
}

export type CreateFormReturn = {
  errors: Ref<FieldValidationResult[]>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating: Ref<boolean>
  isValid: Ref<boolean | null>
  items: Ref<FormField[]>
  validate: () => Promise<FormValidationResult>
  reset: () => void
  resetValidation: () => void
}

/**
 * Headless form state (VForm-style) for use with {@link GkForm} or custom layouts.
 */
export function createForm(options: CreateFormOptions = {}): CreateFormReturn {
  const errors = ref<FieldValidationResult[]>([])
  const isValidating = ref(false)
  const isValid = ref<boolean | null>(null)
  const items = ref<FormField[]>([])

  const isDisabled = computed(() => toValue(options.disabled) ?? false)
  const isReadonly = computed(() => toValue(options.readonly) ?? false)

  async function validate(): Promise<FormValidationResult> {
    isValidating.value = true
    try {
      if (options.validate) {
        const result = await options.validate()
        errors.value = result.errors
        isValid.value = result.valid
        return result
      }
      const result: FormValidationResult = {
        valid: errors.value.length === 0,
        errors: [...errors.value],
      }
      isValid.value = result.valid
      return result
    } finally {
      isValidating.value = false
    }
  }

  function resetValidation() {
    errors.value = []
    isValid.value = null
  }

  function reset() {
    resetValidation()
  }

  return {
    errors,
    isDisabled,
    isReadonly,
    isValidating,
    isValid,
    items,
    validate,
    reset,
    resetValidation,
  }
}

/** Submit event with promise methods mirroring {@link FormValidationResult} (Vuetify-style) */
export type SubmitEventPromise = SubmitEvent &
  Pick<Promise<FormValidationResult>, 'then' | 'catch' | 'finally'>

export function attachSubmitPromise(
  e: SubmitEvent,
  ready: Promise<FormValidationResult>
): SubmitEventPromise {
  const p = e as SubmitEventPromise
  p.then = ready.then.bind(ready)
  p.catch = ready.catch.bind(ready)
  p.finally = ready.finally.bind(ready)
  return p
}
