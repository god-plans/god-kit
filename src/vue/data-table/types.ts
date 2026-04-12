/**
 * Data table types (GkDataTable family). Column keys are strings; use generics at call sites.
 */
export type GkSortOrder = 'asc' | 'desc'

export type GkSortItem = {
  key: string
  order: GkSortOrder
}

export type GkDataTableColumn<T = Record<string, unknown>> = {
  key: string
  title?: string
  /** Accessor; defaults to `key` on row */
  value?: keyof T | ((row: T) => unknown)
  sortable?: boolean
  align?: 'start' | 'center' | 'end'
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  nowrap?: boolean
  fixed?: boolean | 'start' | 'end'
  /** Custom comparer for client sort */
  sort?: (a: T, b: T) => number
  /** Nested header columns (renders extra thead rows; body uses leaf columns only) */
  children?: GkDataTableColumn<T>[]
}

export type GkDataTableGroupRow = {
  type: 'group'
  id: string
  key: string
  value: unknown
  depth: number
}

export type GkDataTableItemRow<T> = {
  type: 'item'
  index: number
  item: T
}

export type GkDataTableDisplayRow<T> = GkDataTableGroupRow | GkDataTableItemRow<T>
