import { describe, expect, it } from 'vitest'
import { buildPaginationRange, createRange, getMax } from './pagination-range'

describe('pagination-range', () => {
  it('createRange', () => {
    expect(createRange(3, 1)).toEqual([1, 2, 3])
    expect(createRange(2, 5)).toEqual([5, 6])
    expect(createRange(0, 1)).toEqual([])
  })

  it('getMax', () => {
    expect(getMax(400, 40, false)).toBe(7)
    expect(getMax(400, 40, true)).toBe(5)
  })

  it('buildPaginationRange shows all pages when pageCount fits', () => {
    expect(
      buildPaginationRange({
        page: 3,
        pageCount: 5,
        start: 1,
        totalVisible: 10,
        ellipsis: '…',
      })
    ).toEqual([1, 2, 3, 4, 5])
  })

  it('buildPaginationRange single visible shows current page only', () => {
    expect(
      buildPaginationRange({
        page: 4,
        pageCount: 20,
        start: 1,
        totalVisible: 1,
        ellipsis: '…',
      })
    ).toEqual([4])
  })

  it('buildPaginationRange ellipsis near start', () => {
    const r = buildPaginationRange({
      page: 2,
      pageCount: 20,
      start: 1,
      totalVisible: 7,
      ellipsis: '…',
    })
    expect(r).toContain('…')
    expect(r[r.length - 1]).toBe(20)
  })

  it('buildPaginationRange ellipsis in middle', () => {
    const r = buildPaginationRange({
      page: 10,
      pageCount: 20,
      start: 1,
      totalVisible: 7,
      ellipsis: '…',
    })
    expect(r[0]).toBe(1)
    expect(r[r.length - 1]).toBe(20)
    expect(r.filter((x) => x === '…').length).toBe(2)
  })

  it('buildPaginationRange with start > 1 uses lastPage correctly', () => {
    expect(
      buildPaginationRange({
        page: 15,
        pageCount: 10,
        start: 10,
        totalVisible: 12,
        ellipsis: '…',
      })
    ).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
  })
})
