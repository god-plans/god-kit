import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { GK_DISPLAY_CONFIG } from '../../injection'
import { resolveGkDisplayConfig } from '../config/gk-display-resolve'
import type {
  GkDisplayBreakpointName,
  GkDisplayResolvedConfig,
} from '../config/gk-kit-types'

function breakpointName(w: number, t: GkDisplayResolvedConfig): GkDisplayBreakpointName {
  if (w >= t.xxl) return 'xxl'
  if (w >= t.xl) return 'xl'
  if (w >= t.lg) return 'lg'
  if (w >= t.md) return 'md'
  if (w >= t.sm) return 'sm'
  return 'xs'
}

function isMobileWidth(w: number, cfg: GkDisplayResolvedConfig): boolean {
  const mb = cfg.mobileBreakpoint
  if (typeof mb === 'number') return w < mb
  return w < cfg[mb]
}

export type GkDisplayReturn = {
  /** Current breakpoint name */
  name: ComputedRef<GkDisplayBreakpointName>
  xs: ComputedRef<boolean>
  sm: ComputedRef<boolean>
  md: ComputedRef<boolean>
  lg: ComputedRef<boolean>
  xl: ComputedRef<boolean>
  xxl: ComputedRef<boolean>
  /** `true` when viewport width is below the configured mobile threshold */
  mobile: ComputedRef<boolean>
  width: ComputedRef<number>
  height: ComputedRef<number>
  /** Effective thresholds (from `createGkKit` or defaults) */
  thresholds: ComputedRef<GkDisplayResolvedConfig>
}

/**
 * Viewport breakpoints and **`mobile`** (subset of Vuetify **`useDisplay`**).
 * Works without **`createGkKit`** using default thresholds.
 */
export function useGkDisplay(): GkDisplayReturn {
  const width = ref(0)
  const height = ref(0)

  const cfg = inject(GK_DISPLAY_CONFIG, resolveGkDisplayConfig())

  const updateSize = () => {
    if (typeof window === 'undefined') return
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    window.addEventListener('orientationchange', updateSize)
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', updateSize)
    window.removeEventListener('orientationchange', updateSize)
  })

  const thresholds = computed(() => cfg)

  const name = computed(() => breakpointName(width.value, cfg))

  const xs = computed(() => width.value < cfg.sm)
  const sm = computed(() => width.value >= cfg.sm && width.value < cfg.md)
  const md = computed(() => width.value >= cfg.md && width.value < cfg.lg)
  const lg = computed(() => width.value >= cfg.lg && width.value < cfg.xl)
  const xl = computed(() => width.value >= cfg.xl && width.value < cfg.xxl)
  const xxl = computed(() => width.value >= cfg.xxl)

  const mobile = computed(() => isMobileWidth(width.value, cfg))

  return {
    name,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    mobile,
    width: computed(() => width.value),
    height: computed(() => height.value),
    thresholds,
  }
}
