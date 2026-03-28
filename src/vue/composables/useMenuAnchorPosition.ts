import { nextTick, onUnmounted, ref, watch, type Ref } from 'vue'

export type GkMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

const VIEW_PAD = 8

/**
 * Fixed `top` / `left` / `minWidth` for a menu panel anchored to an element.
 */
export function useMenuAnchorPosition(
  open: Ref<boolean>,
  anchorEl: Ref<HTMLElement | null>,
  panelEl: Ref<HTMLElement | null>,
  placement: Ref<GkMenuPlacement>,
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

    const placeBottom = placement.value.startsWith('bottom')
    const alignEnd = placement.value.endsWith('end')

    let top = 0
    let left = 0

    if (placeBottom) {
      top = ar.bottom + off
      if (top + h > vh - VIEW_PAD) {
        const above = ar.top - off - h
        if (above >= VIEW_PAD) top = above
        else top = Math.max(VIEW_PAD, vh - VIEW_PAD - h)
      }
    } else {
      top = ar.top - off - h
      if (top < VIEW_PAD) {
        const below = ar.bottom + off
        if (below + h <= vh - VIEW_PAD) top = below
        else top = VIEW_PAD
      }
    }

    if (alignEnd) {
      left = ar.right - w
    } else {
      left = ar.left
    }

    left = Math.max(VIEW_PAD, Math.min(left, vw - VIEW_PAD - w))

    const minW = Math.max(ar.width, 0)

    panelStyle.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      minWidth: minW > 0 ? `${minW}px` : 'var(--gk-menu-min-width)',
      zIndex: '1',
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
