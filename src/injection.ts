import type { ComputedRef, InjectionKey } from 'vue'

export type GkFieldContext = {
  inputId: string
  errorId: string
  errorMessage: ComputedRef<string | undefined>
}

export const GK_FIELD: InjectionKey<GkFieldContext> = Symbol('gk-field')
