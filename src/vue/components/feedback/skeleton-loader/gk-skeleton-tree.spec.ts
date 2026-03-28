import { describe, expect, it } from 'vitest'
import { genGkSkeletonStructure, wrapGkSkeletonTypes } from './gk-skeleton-tree'

describe('genGkSkeletonStructure', () => {
  it('builds a card with image and heading children', () => {
    const tree = genGkSkeletonStructure('card')
    expect(tree).toHaveLength(1)
    expect(tree[0].bone).toBe('card')
    expect(tree[0].children.map((c) => c.bone)).toEqual(['image', 'heading'])
  })

  it('expands paragraph to three text bones', () => {
    const tree = genGkSkeletonStructure('paragraph')
    expect(tree[0].bone).toBe('paragraph')
    expect(tree[0].children).toHaveLength(3)
    expect(tree[0].children.every((c) => c.bone === 'text')).toBe(true)
  })

  it('joins array types with commas', () => {
    const key = wrapGkSkeletonTypes(['heading', 'text'])
    expect(key).toBe('heading,text')
    const tree = genGkSkeletonStructure(key)
    expect(tree).toHaveLength(2)
    expect(tree.map((n) => n.bone)).toEqual(['heading', 'text'])
  })

  it('returns a leaf for unknown preset keys', () => {
    const tree = genGkSkeletonStructure('custom-block')
    expect(tree).toEqual([{ bone: 'custom-block', children: [] }])
  })
})
