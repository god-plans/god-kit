import { computed, type Ref } from 'vue'
import type { GkDataTableColumn } from './types'
import { getRowValue } from './helpers'

export function useGkTableFilter<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  search: Ref<string>,
  leafColumns: Ref<GkDataTableColumn<T>[]>,
  /** If empty, search all leaf column string values */
  searchKeys: Ref<string[] | undefined>
) {
  const filteredItems = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return items.value
    const cols = leafColumns.value
    const keys = searchKeys.value?.length
      ? cols.filter((c) => searchKeys.value!.includes(c.key))
      : cols

    return items.value.filter((row) =>
      keys.some((col) => {
        const v = getRowValue(row, col)
        if (v == null) return false
        return String(v).toLowerCase().includes(q)
      })
    )
  })

  return { filteredItems }
}
