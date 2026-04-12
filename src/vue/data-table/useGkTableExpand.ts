import { computed, type Ref } from 'vue'
import { getItemKey } from './helpers'

export function useGkTableExpand<T extends Record<string, unknown>>(
  expandedKeys: Ref<unknown[]>,
  itemValue: Ref<keyof T | ((row: T) => unknown) | undefined>
) {
  const expandedSet = computed(() => new Set(expandedKeys.value))

  function isExpanded(row: T) {
    return expandedSet.value.has(getItemKey(row, itemValue.value))
  }

  function toggle(row: T) {
    const k = getItemKey(row, itemValue.value)
    const next = new Set(expandedKeys.value)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    expandedKeys.value = [...next]
  }

  return { isExpanded, toggle }
}
