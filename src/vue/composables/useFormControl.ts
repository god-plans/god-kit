import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useFieldIds } from './useFieldIds'

export type UseFormControlOptions = {
  /** Validation or helper error message */
  error?: MaybeRefOrGetter<string | undefined>
}

/**
 * Headless field ids + ARIA helpers when not using {@link GkField} (e.g. custom layouts, future non-Vue ports).
 * When using {@link GkField}, prefer its provide/inject from {@link GK_FIELD} instead.
 */
export function useFormControl(options: UseFormControlOptions = {}) {
  const ids = useFieldIds()

  const errorMessage = computed(() => {
    const raw = options.error !== undefined ? toValue(options.error) : undefined
    if (raw === undefined || raw === null || raw === '') return undefined
    return String(raw)
  })

  const ariaInvalid = computed(() => !!errorMessage.value)

  const ariaDescribedBy = computed(() =>
    errorMessage.value ? ids.errorId : undefined
  )

  return {
    ...ids,
    errorMessage,
    ariaInvalid,
    ariaDescribedBy,
  }
}

export type UseFormControlReturn = ReturnType<typeof useFormControl>
