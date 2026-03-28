import { computed, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { GK_DEFAULTS } from '../../injection'
import type { GkKitComponentDefaults } from '../config/gk-kit-types'

/**
 * Merged defaults for a component (PascalCase **`name`**, e.g. **`GkButton`**).
 */
export function useGkDefaults(componentName: string): ComputedRef<Record<string, unknown>> {
  const injected = inject(GK_DEFAULTS, computed(() => ({} as GkKitComponentDefaults)))
  return computed(() => (injected.value[componentName] ?? {}) as Record<string, unknown>)
}

/**
 * Merge global defaults with incoming props. **`class`** / **`style`** are concatenated
 * (arrays flattened); later props win for other keys.
 */
export function mergeGkProps<T extends Record<string, unknown>>(
  defaults: Record<string, unknown>,
  props: T
): T {
  const out = { ...defaults, ...props } as Record<string, unknown>

  if (defaults.class != null && props.class != null) {
    out.class = [defaults.class, props.class].flat()
  }
  if (defaults.style != null && props.style != null) {
    out.style = [defaults.style, props.style].flat()
  }

  return out as T
}
