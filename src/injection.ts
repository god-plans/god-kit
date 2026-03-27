import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type GkFieldContext = {
  inputId: string
  errorId: string
  errorMessage: ComputedRef<string | undefined>
}

export const GK_FIELD: InjectionKey<GkFieldContext> = Symbol('gk-field')

export type GkRadioGroupContext = {
  name: ComputedRef<string>
  modelValue: Ref<string | number | undefined>
  setValue: (v: string | number) => void
}

export const GK_RADIO_GROUP: InjectionKey<GkRadioGroupContext> = Symbol('gk-radio-group')
