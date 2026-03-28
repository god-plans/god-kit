/**
 * Port of Vuetify VPagination range logic (`length` = page count, `start` = first page number).
 */

export function createRange(count: number, from: number): number[] {
  if (count <= 0) return []
  return Array.from({ length: count }, (_, i) => from + i)
}

/** Max number of extra page buttons that fit beside prev/next (and first/last when shown). */
export function getMax(
  totalWidth: number,
  itemWidth: number,
  showFirstLastPage: boolean
): number {
  if (itemWidth <= 0) return 0
  const minButtons = showFirstLastPage ? 5 : 3
  return Math.max(
    0,
    Math.floor(Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)))
  )
}

export type PaginationRangeItem = number | string

export function buildPaginationRange(args: {
  page: number
  /** Total number of pages */
  pageCount: number
  /** First page number (e.g. 1) */
  start: number
  totalVisible: number
  ellipsis: string
}): PaginationRangeItem[] {
  const { page, pageCount, start, totalVisible, ellipsis } = args

  if (pageCount <= 0 || Number.isNaN(pageCount) || pageCount > Number.MAX_SAFE_INTEGER) {
    return []
  }
  if (totalVisible <= 0) return []
  if (totalVisible === 1) return [page]

  const lastPage = start + pageCount - 1

  if (pageCount <= totalVisible) {
    return createRange(pageCount, start)
  }

  const even = totalVisible % 2 === 0
  const middle = even ? totalVisible / 2 : Math.floor(totalVisible / 2)
  const left = even ? middle : middle + 1
  const right = pageCount - middle

  if (left - page >= 0) {
    return [
      ...createRange(Math.max(1, totalVisible - 1), start),
      ellipsis,
      lastPage,
    ]
  }

  if (page - right >= (even ? 1 : 0)) {
    const rangeLength = totalVisible - 1
    const rangeStart = lastPage - rangeLength + 1
    return [start, ellipsis, ...createRange(rangeLength, rangeStart)]
  }

  const rangeLength = Math.max(1, totalVisible - 2)
  const rangeStart =
    rangeLength === 1 ? page : page - Math.ceil(rangeLength / 2) + start

  return [start, ellipsis, ...createRange(rangeLength, rangeStart), ellipsis, lastPage]
}
