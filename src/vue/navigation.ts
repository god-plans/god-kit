export { default as GkTabs } from './components/navigation/tabs/GkTabs.vue'
export { default as GkTab } from './components/navigation/tabs/GkTab.vue'
export { default as GkTabsWindow } from './components/navigation/tabs/GkTabsWindow.vue'
export { default as GkTabsWindowItem } from './components/navigation/tabs/GkTabsWindowItem.vue'
export { parseGkTabItems } from './components/navigation/tabs/gk-tab-items'
export type { GkTabItem, GkTabItemParsed } from './components/navigation/tabs/gk-tab-items'

export { default as GkPagination } from './components/navigation/pagination/GkPagination.vue'
export {
  buildPaginationRange,
  createRange,
  getMax,
} from './components/navigation/pagination/pagination-range'
export type { PaginationRangeItem } from './components/navigation/pagination/pagination-range'
export type {
  GkPaginationControlSlotProps,
  GkPaginationItemSlotProps,
} from './components/navigation/pagination/GkPagination.vue'
