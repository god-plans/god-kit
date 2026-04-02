import { describe, expect, it } from 'vitest'
import { applyEndReorder } from './useSortableList'

describe('applyEndReorder', () => {
  it('moves item from oldIndex to newIndex', () => {
    expect(applyEndReorder(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a'])
    expect(applyEndReorder(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b'])
  })

  it('no-ops when indices equal', () => {
    expect(applyEndReorder(['a', 'b'], 1, 1)).toEqual(['a', 'b'])
  })
})
