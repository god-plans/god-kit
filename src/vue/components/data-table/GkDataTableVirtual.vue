<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
import GkTableScroll from './GkTableScroll.vue'
import { getLeafColumns } from '../../data-table/flattenColumns'
import { getRowValue } from '../../data-table/helpers'
import type { GkDataTableColumn } from '../../data-table/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    headers: GkDataTableColumn<Record<string, unknown>>[]
    items: Record<string, unknown>[]
    /** Scrollport height (passed to `GkTableScroll` `max-height`) */
    height: string | number
    /** Estimated row height in px (variable row heights: measure after paint; see TanStack Virtual docs) */
    estimateSize?: number
    bordered?: boolean
    /** CSS grid min width per column (e.g. `8rem`) */
    columnMinWidth?: string
  }>(),
  {
    estimateSize: 48,
    bordered: true,
    columnMinWidth: '8rem',
  }
)

const scrollRef = ref<InstanceType<typeof GkTableScroll> | null>(null)

function getScrollEl(): HTMLElement | null {
  const inst = scrollRef.value as unknown as { $el?: HTMLElement } | null
  return inst?.$el ?? null
}

const virtualizer = useVirtualizer(
  computed(() => ({
    count: props.items.length,
    getScrollElement: getScrollEl,
    estimateSize: () => props.estimateSize,
    overscan: 6,
  }))
)

const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())

const leafColumns = computed(() => getLeafColumns(props.headers))

const gridTemplate = computed(() => {
  const n = Math.max(1, leafColumns.value.length)
  return `repeat(${n}, minmax(${props.columnMinWidth}, 1fr))`
})

function itemAt(index: number): Record<string, unknown> {
  return props.items[index] ?? {}
}
</script>

<template>
  <div class="gk-data-table-virtual">
    <div
      class="gk-data-table-virtual__header"
      :style="{ gridTemplateColumns: gridTemplate }"
      role="row"
    >
      <div
        v-for="col in leafColumns"
        :key="col.key"
        class="gk-data-table-virtual__head-cell"
        role="columnheader"
      >
        {{ col.title }}
      </div>
    </div>
    <GkTableScroll
      ref="scrollRef"
      :max-height="height"
      :borderless="!bordered"
      class="gk-data-table-virtual__scroll"
    >
      <div
        class="gk-data-table-virtual__body"
        :style="{ height: `${totalSize}px`, position: 'relative' }"
      >
        <div
          v-for="v in virtualItems"
          :key="String(v.key)"
          class="gk-data-table-virtual__row"
          :data-index="v.index"
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: `${v.size}px`,
            transform: `translateY(${v.start}px)`,
            display: 'grid',
            gridTemplateColumns: gridTemplate,
          }"
        >
          <div
            v-for="col in leafColumns"
            :key="col.key"
            class="gk-data-table-virtual__cell"
            role="cell"
          >
            <slot
              :name="`item.${col.key}`"
              :item="itemAt(v.index)"
              :column="col"
              :value="getRowValue(itemAt(v.index), col)"
            >
              {{ getRowValue(itemAt(v.index), col) }}
            </slot>
          </div>
        </div>
      </div>
    </GkTableScroll>
  </div>
</template>

<style scoped>
.gk-data-table-virtual {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.gk-data-table-virtual__header {
  display: grid;
  gap: 0;
  background: var(--gk-table-header-bg);
  color: var(--gk-table-header-text);
  font-weight: 600;
  font-size: var(--gk-font-size-sm);
  border: 1px solid var(--gk-table-border);
  border-bottom: none;
  border-radius: var(--gk-table-radius) var(--gk-table-radius) 0 0;
}

.gk-data-table-virtual__head-cell {
  padding: var(--gk-table-cell-padding-y) var(--gk-table-cell-padding-x);
  border-inline-end: 1px solid var(--gk-table-border);
  border-bottom: 1px solid var(--gk-table-border);
}

.gk-data-table-virtual__head-cell:last-child {
  border-inline-end: none;
}

.gk-data-table-virtual__scroll {
  border-radius: 0 0 var(--gk-table-radius) var(--gk-table-radius);
}

.gk-data-table-virtual__body {
  position: relative;
  width: 100%;
}

.gk-data-table-virtual__row {
  border-bottom: 1px solid var(--gk-table-border);
  background: var(--gk-color-surface);
  font-size: var(--gk-font-size-sm);
  align-items: center;
}

.gk-data-table-virtual__cell {
  padding: var(--gk-space-2) var(--gk-table-cell-padding-x);
  border-inline-end: 1px solid var(--gk-table-border);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gk-data-table-virtual__cell:last-child {
  border-inline-end: none;
}
</style>
