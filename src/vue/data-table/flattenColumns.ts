import type { GkDataTableColumn } from './types'

/** Leaf columns in visual order (depth-first). */
export function getLeafColumns<T>(columns: GkDataTableColumn<T>[]): GkDataTableColumn<T>[] {
  const out: GkDataTableColumn<T>[] = []
  for (const c of columns) {
    if (c.children?.length) {
      out.push(...getLeafColumns(c.children))
    } else {
      out.push(c)
    }
  }
  return out
}

/** Max header depth (1 = single row). */
export function getHeaderDepth<T>(columns: GkDataTableColumn<T>[]): number {
  let max = 1
  for (const c of columns) {
    if (c.children?.length) {
      max = Math.max(max, 1 + getHeaderDepth(c.children))
    }
  }
  return max
}

export function countLeaves<T>(columns: GkDataTableColumn<T>[]): number {
  let n = 0
  for (const c of columns) {
    if (c.children?.length) n += countLeaves(c.children)
    else n += 1
  }
  return n
}
