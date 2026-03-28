import { gkSnackbarQueueState } from './gk-snackbar-queue'

export type GkSnackbarPushOptions = {
  id?: string
  title?: string
  text?: string
  /** Alias for `text` */
  message?: string
  timeout?: number
  location?: string
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  timer?: boolean | 'top' | 'bottom'
  timerColor?: string
  reverseTimer?: boolean
  loading?: boolean
  prependAvatar?: string
  prependIcon?: string
  vertical?: boolean
  rounded?: boolean
  elevation?: number
  zIndex?: number | string
  transitionName?: string
  /** Passed through to {@link GkSnackbar}; merge with other fields */
  [key: string]: unknown
}

let _id = 0
function nextId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `gk-snackbar-${++_id}`
}

/**
 * Queue a snackbar (requires {@link GkSnackbarHost} in the app once).
 * Returns `dismiss` to close programmatically and `id` for debugging.
 */
export function pushGkSnackbar(options: GkSnackbarPushOptions): {
  id: string
  dismiss: () => void
} {
  const id = options.id ?? nextId()
  const text = options.text ?? options.message
  const rest: Record<string, unknown> = { ...options }
  delete rest.id
  delete rest.message
  if (text !== undefined) rest.text = text
  gkSnackbarQueueState.items.push({
    id,
    open: true,
    options: rest,
  })
  return {
    id,
    dismiss: () => {
      const item = gkSnackbarQueueState.items.find((x) => x.id === id)
      if (item) item.open = false
    },
  }
}

/** Remove all queued snackbars immediately (no leave transition). */
export function clearGkSnackbars() {
  gkSnackbarQueueState.items.splice(0, gkSnackbarQueueState.items.length)
}

/**
 * Same as {@link pushGkSnackbar} / {@link clearGkSnackbars}; use when you prefer a composable namespace.
 */
export function useGkSnackbar() {
  return {
    push: pushGkSnackbar,
    clear: clearGkSnackbars,
    /** Reactive queue (read-only use recommended) */
    state: gkSnackbarQueueState,
  }
}
