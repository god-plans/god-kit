import { computed, type Ref } from 'vue'
import type { GkDataTableColumn, GkSortItem } from './types'
import { defaultCompare, getRowValue } from './helpers'

export function useGkTableSort<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  sortBy: Ref<GkSortItem[]>,
  leafColumns: Ref<GkDataTableColumn<T>[]>,
  multiSort: Ref<boolean>
) {
  const sortedItems = computed(() => {
    const list = [...items.value]
    const sorts = sortBy.value
    if (!sorts.length) return list

    const cols = leafColumns.value
    const comparers = sorts.map((s) => {
      const col = cols.find((c) => c.key === s.key)
      const dir = s.order === 'desc' ? -1 : 1
      return (a: T, b: T) => {
        if (col?.sort) return col.sort(a, b) * dir
        const va = col ? getRowValue(a, col) : (a as Record<string, unknown>)[s.key]
        const vb = col ? getRowValue(b, col) : (b as Record<string, unknown>)[s.key]
        return defaultCompare(va, vb) * dir
      }
    })

    return list.sort((a, b) => {
      for (const cmp of comparers) {
        const r = cmp(a, b)
        if (r !== 0) return r
      }
      return 0
    })
  })

  function toggleSort(key: string) {
    const cur = [...sortBy.value]
    const idx = cur.findIndex((s) => s.key === key)
    if (idx === -1) {
      if (multiSort.value) {
        sortBy.value = [...cur, { key, order: 'asc' }]
      } else {
        sortBy.value = [{ key, order: 'asc' }]
      }
      return
    }
    const order = cur[idx]!.order
    if (order === 'asc') {
      cur[idx] = { key, order: 'desc' }
      sortBy.value = multiSort.value ? cur : [{ key, order: 'desc' }]
    } else {
      cur.splice(idx, 1)
      sortBy.value = cur
    }
  }

  function sortState(key: string): 'asc' | 'desc' | false {
    const s = sortBy.value.find((x) => x.key === key)
    if (!s) return false
    return s.order
  }

  return { sortedItems, toggleSort, sortState }
}
