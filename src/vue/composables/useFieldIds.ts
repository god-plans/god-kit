import { useId } from 'vue'

export type GkFieldIds = {
  baseId: string
  inputId: string
  errorId: string
  hintId: string
}

/**
 * Stable ids for a form field control and its hint / error regions (SSR-safe via Vue useId).
 */
export function useFieldIds(): GkFieldIds {
  const baseId = useId()
  return {
    baseId,
    inputId: `${baseId}-control`,
    errorId: `${baseId}-error`,
    hintId: `${baseId}-hint`,
  }
}
