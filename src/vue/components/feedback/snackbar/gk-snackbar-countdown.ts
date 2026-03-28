import { onScopeDispose, shallowRef } from 'vue'

export function useGkSnackbarCountdown(milliseconds: () => number) {
  const time = shallowRef(milliseconds())
  let timer = -1

  function clear() {
    if (timer !== -1) {
      clearInterval(timer)
      timer = -1
    }
  }

  function reset() {
    clear()
    time.value = milliseconds()
  }

  function start(_el?: HTMLElement) {
    clear()
    const total = Math.max(1, milliseconds())
    time.value = total
    const startTime = performance.now()
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime
      time.value = Math.max(total - elapsed, 0)
      if (time.value <= 0) clear()
    }, 50)
  }

  onScopeDispose(clear)

  return { clear, time, start, reset }
}
