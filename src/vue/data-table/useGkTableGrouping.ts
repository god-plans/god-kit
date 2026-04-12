import { computed, type Ref } from 'vue'
import type { GkDataTableDisplayRow, GkDataTableItemRow } from './types'

/**
 * Single-level grouping by `groupBy[0]` on already-sorted items.
 */
export function useGkTableGrouping<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  groupBy: Ref<string[] | undefined>
) {
  const displayRows = computed((): GkDataTableDisplayRow<T>[] => {
    const keys = groupBy.value
    if (!keys?.length) {
      return items.value.map(
        (item, index): GkDataTableItemRow<T> => ({
          type: 'item',
          index,
          item,
        })
      )
    }

    const gk = keys[0]!
    const out: GkDataTableDisplayRow<T>[] = []
    let last: unknown = Symbol('gk-none')
    let index = 0

    for (const item of items.value) {
      const v = item[gk as keyof T]
      if (v !== last) {
        last = v
        out.push({
          type: 'group',
          id: `g-${String(gk)}-${String(v)}-${index}`,
          key: gk,
          value: v,
          depth: 0,
        })
      }
      out.push({
        type: 'item',
        index,
        item,
      })
      index += 1
    }

    return out
  })

  return { displayRows }
}
