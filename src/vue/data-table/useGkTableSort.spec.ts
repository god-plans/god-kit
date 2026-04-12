import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { GkDataTableColumn, GkSortItem } from './types'
import { useGkTableSort } from './useGkTableSort'

describe('useGkTableSort', () => {
  it('sorts by key ascending', () => {
    const items = ref([{ n: 2 }, { n: 1 }])
    const sortBy = ref<GkSortItem[]>([{ key: 'n', order: 'asc' }])
    const cols = ref<GkDataTableColumn[]>([{ key: 'n', title: 'N' }])
    const multi = ref(false)
    const { sortedItems } = useGkTableSort(items, sortBy, cols, multi)
    expect(sortedItems.value.map((x) => x.n)).toEqual([1, 2])
  })
})
