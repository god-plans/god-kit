import { useId } from 'vue'

export type GkFieldIds = {
  baseId: string
  inputId: string
  errorId: string
}

/**
 * Stable ids for a form field control and its error region (SSR-safe via Vue useId).
 */
export function useFieldIds(): GkFieldIds {
  const baseId = useId()
  return {
    baseId,
    inputId: `${baseId}-control`,
    errorId: `${baseId}-error`,
  }
}
