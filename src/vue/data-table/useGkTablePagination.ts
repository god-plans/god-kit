import { computed, type Ref } from 'vue'

export function useGkTablePagination<T>(
  items: Ref<T[]>,
  page: Ref<number>,
  itemsPerPage: Ref<number>
) {
  const pageCount = computed(() => {
    const n = items.value.length
    const ipp = Math.max(1, itemsPerPage.value)
    return Math.max(1, Math.ceil(n / ipp))
  })

  const paginatedItems = computed(() => {
    const ipp = Math.max(1, itemsPerPage.value)
    const p = Math.min(Math.max(1, page.value), pageCount.value)
    const start = (p - 1) * ipp
    return items.value.slice(start, start + ipp)
  })

  return { pageCount, paginatedItems }
}
