import type { GkDataTableColumn } from './types'
import { countLeaves, getHeaderDepth } from './flattenColumns'

export type TheadCell<T> = {
  key: string
  title: string
  colSpan: number
  rowSpan: number
  column: GkDataTableColumn<T>
}

/**
 * Build `<thead>` rows with correct rowspan/colspan for nested column definitions.
 */
export function buildTheadRows<T>(columns: GkDataTableColumn<T>[]): TheadCell<T>[][] {
  const depth = getHeaderDepth(columns)
  const rows: TheadCell<T>[][] = Array.from({ length: depth }, () => [])

  function visit(cols: GkDataTableColumn<T>[], level: number) {
    for (const c of cols) {
      if (c.children?.length) {
        const lc = countLeaves(c.children)
        rows[level]!.push({
          key: c.key,
          title: c.title ?? '',
          colSpan: lc,
          rowSpan: 1,
          column: c,
        })
        visit(c.children, level + 1)
      } else {
        rows[level]!.push({
          key: c.key,
          title: c.title ?? '',
          colSpan: 1,
          rowSpan: depth - level,
          column: c,
        })
      }
    }
  }

  visit(columns, 0)
  return rows
}
