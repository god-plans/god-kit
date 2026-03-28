import { nextTick, onUnmounted, ref, watch, type Ref } from 'vue'

/** LTR anchor: `start` = left, `end` = right. Use CSS `direction` in apps for RTL. */
export type GkTooltipPlacement = 'top' | 'bottom' | 'start' | 'end'

const VIEW_PAD = 8

/**
 * Fixed `top` / `left` for a tooltip panel anchored to an element (edge + center alignment).
 */
export function useTooltipPosition(
  open: Ref<boolean>,
  anchorEl: Ref<HTMLElement | null>,
  panelEl: Ref<HTMLElement | null>,
  placement: Ref<GkTooltipPlacement>,
  offset: Ref<number>
) {
  const panelStyle = ref<Record<string, string>>({})

  function update() {
    const anchor = anchorEl.value
    const panel = panelEl.value
    if (!open.value || !anchor || !panel) return

    const ar = anchor.getBoundingClientRect()
    const pr = panel.getBoundingClientRect()
    const w = pr.width || panel.offsetWidth
    const h = pr.height || panel.offsetHeight
    const vw = window.innerWidth
    const vh = window.innerHeight
    const off = offset.value

    let top = 0
    let left = 0
    const p = placement.value

    if (p === 'bottom') {
      top = ar.bottom + off
      left = ar.left + ar.width / 2 - w / 2
    } else if (p === 'top') {
      top = ar.top - off - h
      left = ar.left + ar.width / 2 - w / 2
    } else if (p === 'end') {
      top = ar.top + ar.height / 2 - h / 2
      left = ar.right + off
      if (left + w > vw - VIEW_PAD && ar.left - off - w >= VIEW_PAD) {
        left = ar.left - off - w
      }
    } else {
      /* start */
      top = ar.top + ar.height / 2 - h / 2
      left = ar.left - off - w
      if (left < VIEW_PAD && ar.right + off + w <= vw - VIEW_PAD) {
        left = ar.right + off
      }
    }

    if (p === 'top' || p === 'bottom') {
      if (top + h > vh - VIEW_PAD) top = Math.max(VIEW_PAD, vh - VIEW_PAD - h)
      if (top < VIEW_PAD) top = VIEW_PAD
    }
    left = Math.max(VIEW_PAD, Math.min(left, vw - VIEW_PAD - w))

    panelStyle.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      minWidth: '0',
    }
  }

  function onScrollResize() {
    if (open.value) void nextTick(() => update())
  }

  watch(
    [open, placement, offset],
    async () => {
      if (!open.value) {
        panelStyle.value = {}
        return
      }
      await nextTick()
      update()
      requestAnimationFrame(() => update())
    },
    { flush: 'post' }
  )

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScrollResize, true)
    window.addEventListener('resize', onScrollResize)
  }

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScrollResize, true)
      window.removeEventListener('resize', onScrollResize)
    }
  })

  return { panelStyle, update }
}
