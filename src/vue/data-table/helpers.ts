import type { GkDataTableColumn } from './types'

export function getRowValue<T extends Record<string, unknown>>(
  row: T,
  column: GkDataTableColumn<T>
): unknown {
  const acc = column.value
  if (acc == null) return row[column.key as keyof T]
  if (typeof acc === 'function') return (acc as (r: T) => unknown)(row)
  return row[acc]
}

export function getItemKey<T>(
  row: T,
  itemValue: keyof T | ((row: T) => unknown) | undefined
): unknown {
  if (itemValue == null) {
    const r = row as Record<string, unknown>
    return r.id ?? r.key ?? JSON.stringify(row)
  }
  if (typeof itemValue === 'function') return (itemValue as (r: T) => unknown)(row)
  return (row as Record<string, unknown>)[itemValue as string]
}

export function defaultCompare(a: unknown, b: unknown): number {
  if (a === b) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}
