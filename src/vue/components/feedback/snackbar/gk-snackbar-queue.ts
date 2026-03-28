import { reactive } from 'vue'

export type GkQueuedSnackbar = {
  id: string
  open: boolean
  options: Record<string, unknown>
}

export const gkSnackbarQueueState = reactive({
  items: [] as GkQueuedSnackbar[],
})
