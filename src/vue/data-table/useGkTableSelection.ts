import { computed, type Ref } from 'vue'
import { getItemKey } from './helpers'

export function useGkTableSelection<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  selectedKeys: Ref<unknown[]>,
  itemValue: Ref<keyof T | ((row: T) => unknown) | undefined>,
  isItemSelectable: (row: T) => boolean
) {
  const keyFn = (row: T) => getItemKey(row, itemValue.value)

  const selectedSet = computed(() => new Set(selectedKeys.value))

  function isSelected(row: T) {
    return selectedSet.value.has(keyFn(row))
  }

  const selectableItems = computed(() => items.value.filter(isItemSelectable))

  const allSelected = computed(() => {
    const sel = selectableItems.value
    if (!sel.length) return false
    return sel.every((r) => selectedSet.value.has(keyFn(r)))
  })

  const someSelected = computed(() => {
    const sel = selectableItems.value
    if (!sel.length) return false
    const any = sel.some((r) => selectedSet.value.has(keyFn(r)))
    return any && !allSelected.value
  })

  function toggle(row: T) {
    if (!isItemSelectable(row)) return
    const k = keyFn(row)
    const next = new Set(selectedKeys.value)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    selectedKeys.value = [...next]
  }

  function selectAll(value: boolean) {
    if (value) {
      const keys = new Set(selectedKeys.value)
      for (const r of selectableItems.value) {
        keys.add(keyFn(r))
      }
      selectedKeys.value = [...keys]
    } else {
      const remove = new Set(selectableItems.value.map((r) => keyFn(r)))
      selectedKeys.value = selectedKeys.value.filter((k) => !remove.has(k))
    }
  }

  return {
    isSelected,
    allSelected,
    someSelected,
    toggle,
    selectAll,
    keyFn,
  }
}
