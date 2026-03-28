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
  /** Group-level disabled (combined with each radio’s `disabled`) */
  isDisabled: ComputedRef<boolean>
  /** Group-level readonly: selections cannot change */
  isReadonly: ComputedRef<boolean>
}

export const GK_RADIO_GROUP: InjectionKey<GkRadioGroupContext> = Symbol('gk-radio-group')

export type GkExpansionPanelsContext = {
  /** When `false`, at most one panel is expanded (accordion) */
  multiple: ComputedRef<boolean>
  isExpanded: (value: string | number) => boolean
  toggle: (value: string | number) => void
  isDisabled: ComputedRef<boolean>
}

export const GK_EXPANSION_PANELS: InjectionKey<GkExpansionPanelsContext> =
  Symbol('gk-expansion-panels')

export type GkExpansionPanelContext = {
  panelValue: ComputedRef<string | number>
  isExpanded: ComputedRef<boolean>
  toggle: () => void
  disabled: ComputedRef<boolean>
  titleId: string
  contentId: string
}

export const GK_EXPANSION_PANEL: InjectionKey<GkExpansionPanelContext> = Symbol('gk-expansion-panel')
