<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import GkCheckbox from '../form/checkbox/GkCheckbox.vue'
import GkPagination from '../navigation/pagination/GkPagination.vue'
import GkSpinner from '../spinner/GkSpinner.vue'
import GkTable from './GkTable.vue'
import GkTableScroll from './GkTableScroll.vue'
import { buildTheadRows, type TheadCell } from '../../data-table/buildTheadRows'
import { getItemKey, getRowValue } from '../../data-table/helpers'
import { getHeaderDepth, getLeafColumns } from '../../data-table/flattenColumns'
import type {
  GkDataTableColumn,
  GkDataTableDisplayRow,
  GkSortItem,
} from '../../data-table/types'
import { useGkTableExpand } from '../../data-table/useGkTableExpand'
import { useGkTableFilter } from '../../data-table/useGkTableFilter'
import { useGkTableGrouping } from '../../data-table/useGkTableGrouping'
import { useGkTablePagination } from '../../data-table/useGkTablePagination'
import { useGkTableSelection } from '../../data-table/useGkTableSelection'
import { useGkTableSort } from '../../data-table/useGkTableSort'
import { useGkDisplay } from '../../composables/useGkDisplay'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Column definitions (supports nested `children` for grouped headers) */
    headers: GkDataTableColumn<Record<string, unknown>>[]
    /** Row data; in `server` mode this is usually the current page only */
    items: Record<string, unknown>[]
    /** `client`: filter/sort/paginate locally. `server`: display `items` as-is; use `itemsLength` + v-models for pagination/sort UX */
    mode?: 'client' | 'server'
    /** Required when `mode` is `server`: total item count across pages */
    itemsLength?: number
    loading?: boolean
    multiSort?: boolean
    /** v-model:search — client filter across columns (optional `searchKeys`) */
    searchKeys?: string[]
    showSelect?: boolean
    showExpand?: boolean
    itemValue?: keyof Record<string, unknown> | ((row: Record<string, unknown>) => unknown)
    itemSelectable?: (row: Record<string, unknown>) => boolean
    itemsPerPageOptions?: number[]
    density?: 'comfortable' | 'compact'
    striped?: boolean
    hover?: boolean
    fixedHeader?: boolean
    /** When `auto`, uses `useGkDisplay().mobile` */
    mobile?: boolean | 'auto'
    groupBy?: string[]
    caption?: string
    hideDefaultFooter?: boolean
    hideDefaultHeader?: boolean
    hideSelectAll?: boolean
    dir?: 'ltr' | 'rtl'
    maxHeight?: string | number
    /** Show border / scroll wrapper */
    bordered?: boolean
  }>(),
  {
    mode: 'client',
    loading: false,
    multiSort: false,
    showSelect: false,
    showExpand: false,
    itemsPerPageOptions: () => [10, 25, 50, 100],
    density: 'comfortable',
    striped: false,
    hover: true,
    fixedHeader: false,
    mobile: false,
    hideDefaultFooter: false,
    hideDefaultHeader: false,
    hideSelectAll: false,
    dir: 'ltr',
    bordered: true,
  }
)

const emit = defineEmits<{
  'click:row': [row: Record<string, unknown>, event: MouseEvent]
}>()

const search = defineModel<string>('search', { default: '' })
const sortBy = defineModel<GkSortItem[]>('sortBy', { default: () => [] })
const page = defineModel<number>('page', { default: 1 })
const itemsPerPage = defineModel<number>('itemsPerPage', { default: 10 })
const selected = defineModel<unknown[]>('selected', { default: () => [] })
const expanded = defineModel<unknown[]>('expanded', { default: () => [] })

const itemsRef = toRef(props, 'items')
const leafColumns = computed(() => getLeafColumns(props.headers))
const leafColsRef = computed(() => leafColumns.value)

const hasNestedHeaders = computed(() => getHeaderDepth(props.headers) > 1)
const theadRows = computed(() => buildTheadRows(props.headers))
const theadDepth = computed(() => theadRows.value.length)

const { mobile: displayMobile } = useGkDisplay()
const isMobileLayout = computed(() => {
  if (props.mobile === 'auto') return displayMobile.value
  return !!props.mobile
})

const itemValueRef = toRef(props, 'itemValue')

function selectable(row: Record<string, unknown>) {
  return props.itemSelectable ? props.itemSelectable(row) : true
}

const { filteredItems } = useGkTableFilter(
  itemsRef,
  search,
  leafColsRef,
  toRef(props, 'searchKeys')
)

const baseItems = computed(() => {
  if (props.mode === 'server') return itemsRef.value
  return filteredItems.value
})

const multiSortRef = toRef(props, 'multiSort')
const { sortedItems, toggleSort, sortState } = useGkTableSort(
  baseItems,
  sortBy,
  leafColsRef,
  multiSortRef
)

const sortedPipeline = computed(() => {
  if (props.mode === 'server') return baseItems.value
  return sortedItems.value
})

const pageRef = page
const itemsPerPageRef = itemsPerPage

const { pageCount, paginatedItems } = useGkTablePagination(
  sortedPipeline,
  pageRef,
  itemsPerPageRef
)

const serverPageCount = computed(() => {
  const total = props.itemsLength ?? 0
  const ipp = Math.max(1, itemsPerPage.value)
  return Math.max(1, Math.ceil(total / ipp))
})

const effectivePageCount = computed(() =>
  props.mode === 'server' ? serverPageCount.value : pageCount.value
)

const pagedItems = computed(() => {
  if (props.mode === 'server') return baseItems.value
  return paginatedItems.value
})

const { displayRows } = useGkTableGrouping(pagedItems, toRef(props, 'groupBy'))

const rowsForTemplate = computed(() => {
  if (props.groupBy?.length) return displayRows.value
  return pagedItems.value.map((item, index) => ({
    type: 'item' as const,
    index,
    item,
  }))
})

const selectedRef = selected
const expandedRef = expanded

const selection = useGkTableSelection(pagedItems, selectedRef, itemValueRef, selectable)
const expand = useGkTableExpand(expandedRef, itemValueRef)

watch([effectivePageCount, page], () => {
  const max = effectivePageCount.value
  if (page.value > max) page.value = max
  if (page.value < 1) page.value = 1
})

watch(itemsPerPage, () => {
  page.value = 1
})

const selectAllModel = computed({
  get: () => selection.allSelected.value,
  set: (v: boolean) => selection.selectAll(v),
})

const selectAllIndeterminate = computed(() => selection.someSelected.value)

function headerSortable(cell: TheadCell<Record<string, unknown>>) {
  const col = cell.column
  return col.sortable !== false && leafColumns.value.some((l) => l.key === col.key)
}

function leafSortable(key: string) {
  const col = leafColumns.value.find((c) => c.key === key)
  return col?.sortable !== false
}

function ariaSortFor(key: string): 'ascending' | 'descending' | undefined {
  const s = sortState(key)
  if (s === 'asc') return 'ascending'
  if (s === 'desc') return 'descending'
  return undefined
}

function cellAlign(align?: string) {
  if (align === 'end') return 'gk-data-table__cell--end'
  if (align === 'center') return 'gk-data-table__cell--center'
  return 'gk-data-table__cell--start'
}

function stickyClass(col: GkDataTableColumn<Record<string, unknown>>) {
  if (!col.fixed) return ''
  const side = col.fixed === true ? 'start' : col.fixed
  return side === 'end' ? 'gk-data-table__th--sticky-end' : 'gk-data-table__th--sticky-start'
}

function stickyClassCell(col: GkDataTableColumn<Record<string, unknown>>) {
  if (!col.fixed) return ''
  const side = col.fixed === true ? 'start' : col.fixed
  return side === 'end' ? 'gk-data-table__td--sticky-end' : 'gk-data-table__td--sticky-start'
}

const slotProps = computed(() => ({
  page: page.value,
  itemsPerPage: itemsPerPage.value,
  sortBy: sortBy.value,
  pageCount: effectivePageCount.value,
  items: pagedItems.value,
}))

function onRowClick(row: Record<string, unknown>, e: MouseEvent) {
  emit('click:row', row, e)
}

const rootRef = ref<HTMLElement | null>(null)
defineExpose({ rootRef })

const emptyColspan = computed(() => {
  const base =
    leafColumns.value.length +
    (props.showSelect ? 1 : 0) +
    (props.showExpand ? 1 : 0)
  return Math.max(1, base)
})

const groupColspan = emptyColspan

const expandColspan = computed(() => {
  return (
    leafColumns.value.length +
    (props.showSelect ? 1 : 0) +
    (props.showExpand ? 1 : 0)
  )
})

function rowKey(row: GkDataTableDisplayRow<Record<string, unknown>>, ri: number) {
  if (row.type === 'group') return row.id
  return `r-${ri}-${String(getItemKey(row.item, props.itemValue))}`
}
</script>

<template>
  <div
    ref="rootRef"
    class="gk-data-table"
    :class="{
      'gk-data-table--loading': loading,
      'gk-data-table--striped': striped && !groupBy?.length,
      'gk-data-table--hover': hover,
      'gk-data-table--mobile': isMobileLayout,
      [`gk-data-table--density-${density}`]: true,
    }"
  >
    <slot name="top" v-bind="slotProps" />

    <GkTableScroll :max-height="maxHeight" :borderless="!bordered">
      <div class="gk-data-table__surface" :class="{ 'gk-data-table__surface--loading': loading }">
        <GkSpinner
          v-if="loading"
          class="gk-data-table__loading-spinner"
          aria-hidden="true"
        />
        <template v-if="!isMobileLayout">
          <GkTable :density="density" :aria-busy="loading">
            <caption v-if="caption" class="gk-data-table__caption">
              {{ caption }}
            </caption>
            <thead
              v-if="!hideDefaultHeader"
              class="gk-data-table__thead"
              :class="{ 'gk-data-table__thead--sticky': fixedHeader }"
            >
              <template v-if="!hasNestedHeaders">
                <tr>
                  <th
                    v-if="showSelect"
                    class="gk-data-table__th gk-data-table__th--select"
                    scope="col"
                  >
                    <GkCheckbox
                      v-if="!hideSelectAll"
                      v-model="selectAllModel"
                      :indeterminate="selectAllIndeterminate"
                      aria-label="Select all"
                    />
                  </th>
                  <th
                    v-if="showExpand"
                    class="gk-data-table__th gk-data-table__th--expand"
                    scope="col"
                  />
                  <th
                    v-for="col in leafColumns"
                    :key="col.key"
                    scope="col"
                    class="gk-data-table__th"
                    :class="[cellAlign(col.align), stickyClass(col)]"
                    :aria-sort="leafSortable(col.key) ? ariaSortFor(col.key) : undefined"
                    :style="{
                      width: col.width != null ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : undefined,
                      minWidth: col.minWidth != null ? (typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth) : undefined,
                      maxWidth: col.maxWidth != null ? (typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth) : undefined,
                    }"
                  >
                    <slot
                      :name="`header.${col.key}`"
                      :column="col"
                      :sort-by="sortBy"
                      :toggle-sort="() => toggleSort(col.key)"
                    >
                      <div class="gk-data-table__th-inner">
                        <span class="gk-data-table__th-title">{{ col.title }}</span>
                        <button
                          v-if="leafSortable(col.key)"
                          type="button"
                          class="gk-data-table__sort-btn"
                          :aria-label="`Sort by ${col.title ?? col.key}`"
                          @click="toggleSort(col.key)"
                        >
                          <span class="gk-data-table__sort-icon" aria-hidden="true">
                            <span v-if="sortState(col.key) === 'asc'">▲</span>
                            <span v-else-if="sortState(col.key) === 'desc'">▼</span>
                            <span v-else>⇅</span>
                          </span>
                        </button>
                      </div>
                    </slot>
                  </th>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(row, ri) in theadRows" :key="`hr-${ri}`">
                  <th
                    v-if="showSelect && ri === 0"
                    class="gk-data-table__th gk-data-table__th--select"
                    scope="col"
                    :rowspan="theadDepth"
                  >
                    <GkCheckbox
                      v-if="!hideSelectAll"
                      v-model="selectAllModel"
                      :indeterminate="selectAllIndeterminate"
                      aria-label="Select all"
                    />
                  </th>
                  <th
                    v-if="showExpand && ri === 0"
                    class="gk-data-table__th gk-data-table__th--expand"
                    scope="col"
                    :rowspan="theadDepth"
                  />
                  <th
                    v-for="cell in row"
                    :key="`${cell.key}-${ri}`"
                    scope="col"
                    class="gk-data-table__th"
                    :class="[cellAlign(cell.column.align), stickyClass(cell.column)]"
                    :aria-sort="headerSortable(cell) ? ariaSortFor(cell.column.key) : undefined"
                    :colspan="cell.colSpan"
                    :rowspan="cell.rowSpan"
                  >
                    <slot
                      :name="`header.${cell.column.key}`"
                      :column="cell.column"
                      :sort-by="sortBy"
                      :toggle-sort="() => toggleSort(cell.column.key)"
                    >
                      <div class="gk-data-table__th-inner">
                        <span class="gk-data-table__th-title">{{ cell.title }}</span>
                        <button
                          v-if="headerSortable(cell)"
                          type="button"
                          class="gk-data-table__sort-btn"
                          :aria-label="`Sort by ${cell.title}`"
                          @click="toggleSort(cell.column.key)"
                        >
                          <span class="gk-data-table__sort-icon" aria-hidden="true">
                            <span v-if="sortState(cell.column.key) === 'asc'">▲</span>
                            <span v-else-if="sortState(cell.column.key) === 'desc'">▼</span>
                            <span v-else>⇅</span>
                          </span>
                        </button>
                      </div>
                    </slot>
                  </th>
                </tr>
              </template>
            </thead>
            <tbody>
              <slot name="body.prepend" v-bind="slotProps" />
              <template v-if="!pagedItems.length && !loading">
                <tr>
                  <td
                    class="gk-data-table__td gk-data-table__td--empty"
                    :colspan="emptyColspan"
                  >
                    <slot name="no-data">No data available</slot>
                  </td>
                </tr>
              </template>
              <template v-for="(row, ri) in rowsForTemplate" :key="rowKey(row, ri)">
                <tr
                  v-if="row.type === 'group'"
                  class="gk-data-table__tr gk-data-table__tr--group"
                >
                  <td
                    class="gk-data-table__td gk-data-table__td--group"
                    :colspan="groupColspan"
                  >
                    <slot name="group-header" :group-key="row.key" :group-value="row.value" :depth="row.depth">
                      {{ row.key }}: {{ row.value }}
                    </slot>
                  </td>
                </tr>
                <tr
                  v-else
                  class="gk-data-table__tr"
                  :class="{ 'gk-data-table__tr--stripe': striped && ri % 2 === 1 }"
                  @click="(e) => onRowClick(row.item, e)"
                >
                  <td v-if="showSelect" class="gk-data-table__td gk-data-table__td--select">
                    <GkCheckbox
                      :model-value="selection.isSelected(row.item)"
                      :disabled="!selectable(row.item)"
                      aria-label="Select row"
                      @update:model-value="() => selection.toggle(row.item)"
                    />
                  </td>
                  <td v-if="showExpand" class="gk-data-table__td gk-data-table__td--expand">
                    <button
                      type="button"
                      class="gk-data-table__expand-btn"
                      :aria-expanded="expand.isExpanded(row.item)"
                      aria-label="Expand row"
                      @click.stop="expand.toggle(row.item)"
                    >
                      {{ expand.isExpanded(row.item) ? '▼' : '▶' }}
                    </button>
                  </td>
                  <td
                    v-for="col in leafColumns"
                    :key="col.key"
                    class="gk-data-table__td"
                    :class="[
                      cellAlign(col.align),
                      stickyClassCell(col),
                      { 'gk-data-table__td--nowrap': col.nowrap },
                    ]"
                  >
                    <slot
                      :name="`item.${col.key}`"
                      :item="row.item"
                      :column="col"
                      :value="getRowValue(row.item, col)"
                    >
                      {{ getRowValue(row.item, col) }}
                    </slot>
                  </td>
                </tr>
                <tr
                  v-if="row.type === 'item' && showExpand && expand.isExpanded(row.item)"
                  class="gk-data-table__tr gk-data-table__tr--expanded"
                >
                  <td class="gk-data-table__td gk-data-table__td--expanded" :colspan="expandColspan">
                    <slot name="expanded-row" :item="row.item">
                      <pre class="gk-data-table__expanded-fallback">{{ JSON.stringify(row.item, null, 2) }}</pre>
                    </slot>
                  </td>
                </tr>
              </template>
              <slot name="body.append" v-bind="slotProps" />
            </tbody>
          </GkTable>
        </template>

        <div v-else class="gk-data-table__mobile">
          <div
            v-for="(row, ri) in pagedItems"
            :key="`m-${ri}-${String(getItemKey(row, itemValue))}`"
            class="gk-data-table__mobile-card"
            @click="(e) => onRowClick(row, e)"
          >
            <div v-if="showSelect" class="gk-data-table__mobile-select">
              <GkCheckbox
                :model-value="selection.isSelected(row)"
                :disabled="!selectable(row)"
                aria-label="Select row"
                @update:model-value="() => selection.toggle(row)"
              />
            </div>
            <div
              v-for="col in leafColumns"
              :key="col.key"
              class="gk-data-table__mobile-row"
            >
              <div class="gk-data-table__mobile-label">{{ col.title }}</div>
              <div class="gk-data-table__mobile-value">
                <slot
                  :name="`item.${col.key}`"
                  :item="row"
                  :column="col"
                  :value="getRowValue(row, col)"
                >
                  {{ getRowValue(row, col) }}
                </slot>
              </div>
            </div>
          </div>
          <div v-if="!pagedItems.length && !loading" class="gk-data-table__mobile-empty">
            <slot name="no-data">No data available</slot>
          </div>
        </div>
      </div>
    </GkTableScroll>

    <div v-if="!hideDefaultFooter" class="gk-data-table__footer">
      <div class="gk-data-table__footer-start">
        <slot name="footer.prepend" v-bind="slotProps" />
      </div>
      <div class="gk-data-table__footer-mid">
        <label v-if="itemsPerPageOptions.length" class="gk-data-table__page-size">
          <span class="gk-data-table__page-size-label">Rows per page</span>
          <select
            v-model.number="itemsPerPage"
            class="gk-data-table__page-size-select"
          >
            <option v-for="n in itemsPerPageOptions" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </label>
      </div>
      <GkPagination
        v-model="page"
        :length="effectivePageCount"
        :dir="dir"
        :disabled="loading"
      />
      <div class="gk-data-table__footer-end">
        <slot name="footer.append" v-bind="slotProps" />
      </div>
    </div>

    <slot name="bottom" v-bind="slotProps" />
  </div>
</template>

<style scoped>
.gk-data-table {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  width: 100%;
}

.gk-data-table__surface {
  position: relative;
}

.gk-data-table__surface--loading tbody {
  opacity: var(--gk-table-loading-opacity);
  pointer-events: none;
}

.gk-data-table__loading-spinner {
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 2;
}

.gk-data-table__caption {
  caption-side: top;
  text-align: start;
  padding: var(--gk-space-2) var(--gk-table-cell-padding-x);
  font-weight: 600;
  color: var(--gk-table-header-text);
}

.gk-data-table__thead {
  background: var(--gk-table-header-bg);
  color: var(--gk-table-header-text);
}

.gk-data-table__thead--sticky th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--gk-table-header-bg);
  box-shadow: 0 1px 0 var(--gk-table-border);
}

.gk-data-table__th,
.gk-data-table__td {
  padding: var(--gk-table-cell-padding-y) var(--gk-table-cell-padding-x);
  border-bottom: 1px solid var(--gk-table-border);
  vertical-align: middle;
  text-align: start;
}

.gk-data-table__th--sticky-start,
.gk-data-table__td--sticky-start {
  position: sticky;
  left: 0;
  z-index: 1;
  background: var(--gk-color-surface);
  box-shadow: var(--gk-table-sticky-shadow-start);
}

.gk-data-table__thead .gk-data-table__th--sticky-start {
  z-index: 3;
  background: var(--gk-table-header-bg);
}

.gk-data-table__th--sticky-end,
.gk-data-table__td--sticky-end {
  position: sticky;
  right: 0;
  z-index: 1;
  background: var(--gk-color-surface);
  box-shadow: var(--gk-table-sticky-shadow-end);
}

.gk-data-table__thead .gk-data-table__th--sticky-end {
  z-index: 3;
  background: var(--gk-table-header-bg);
}

.gk-data-table__cell--end {
  text-align: end;
}

.gk-data-table__cell--center {
  text-align: center;
}

.gk-data-table__th-inner {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-1);
  width: 100%;
}

.gk-data-table__sort-btn {
  border: none;
  background: transparent;
  padding: var(--gk-space-1);
  cursor: pointer;
  color: inherit;
  border-radius: var(--gk-radius-sm);
}

.gk-data-table__sort-btn:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-data-table__sort-icon {
  font-size: var(--gk-table-sort-icon-size);
  opacity: 0.75;
}

.gk-data-table__tr--stripe {
  background: var(--gk-table-stripe);
}

.gk-data-table--hover tbody .gk-data-table__tr:hover:not(.gk-data-table__tr--group) {
  background: var(--gk-table-row-hover);
}

.gk-data-table__td--empty {
  text-align: center;
  color: var(--gk-color-text-muted);
  padding: var(--gk-space-6);
}

.gk-data-table__td--group {
  font-weight: 600;
  background: color-mix(in srgb, var(--gk-color-primary) 6%, transparent);
}

.gk-data-table__td--expanded {
  background: var(--gk-color-surface-elevated);
}

.gk-data-table__expanded-fallback {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  white-space: pre-wrap;
}

.gk-data-table__expand-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: var(--gk-space-1);
}

.gk-data-table__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--gk-space-3) var(--gk-space-4);
  margin-block-start: var(--gk-space-2);
  padding-block-start: var(--gk-space-3);
  border-block-start: 1px solid var(--gk-table-border);
}

.gk-data-table__footer-mid {
  margin-inline-end: auto;
}

/* Shrink-wrap page buttons to the end; default GkPagination is width:100% which stretches the row */
.gk-data-table__footer :deep(.gk-pagination) {
  width: auto;
  max-width: 100%;
  flex: 0 1 auto;
}

.gk-data-table__footer :deep(.gk-pagination__list) {
  justify-content: flex-end;
}

.gk-data-table__page-size {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-tight);
  color: var(--gk-color-text-muted);
}

.gk-data-table__page-size-select {
  min-width: 4.25rem;
  min-height: var(--gk-control-min-height-sm);
  padding-block: var(--gk-space-1);
  padding-inline: var(--gk-space-2);
  border: 1px solid var(--gk-color-border-strong);
  border-radius: var(--gk-radius-md);
  background-color: var(--gk-color-surface);
  color: var(--gk-color-text);
  font: inherit;
  font-size: var(--gk-font-size-sm);
  font-weight: 500;
  line-height: var(--gk-line-height-tight);
  cursor: pointer;
}

.gk-data-table__page-size-select:hover:not(:disabled) {
  border-color: var(--gk-color-primary);
}

.gk-data-table__page-size-select:focus {
  outline: none;
}

.gk-data-table__page-size-select:focus-visible {
  outline: var(--gk-focus-ring-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-data-table__mobile-card {
  border: 1px solid var(--gk-table-border);
  border-radius: var(--gk-table-radius);
  padding: var(--gk-space-3);
  margin-bottom: var(--gk-space-3);
  background: var(--gk-color-surface);
}

.gk-data-table__mobile-row {
  display: grid;
  grid-template-columns: minmax(6rem, 35%) 1fr;
  gap: var(--gk-space-2);
  padding: var(--gk-space-1) 0;
  border-bottom: 1px solid var(--gk-color-border);
}

.gk-data-table__mobile-row:last-child {
  border-bottom: none;
}

.gk-data-table__mobile-label {
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-data-table__mobile-value {
  font-size: var(--gk-font-size-sm);
  word-break: break-word;
}

.gk-data-table__mobile-empty {
  padding: var(--gk-space-6);
  text-align: center;
  color: var(--gk-color-text-muted);
}

.gk-data-table--density-compact .gk-data-table__th,
.gk-data-table--density-compact .gk-data-table__td {
  min-height: var(--gk-table-density-compact-min-height);
  padding-top: var(--gk-space-2);
  padding-bottom: var(--gk-space-2);
}

.gk-data-table--density-comfortable .gk-data-table__th,
.gk-data-table--density-comfortable .gk-data-table__td {
  min-height: var(--gk-table-density-comfortable-min-height);
}
</style>
