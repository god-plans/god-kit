<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import type { Slots } from 'vue'
import GkDataTable from './GkDataTable.vue'
import type { GkDataTableColumn } from '../../data-table/types'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  headers: GkDataTableColumn<Record<string, unknown>>[]
  items: Record<string, unknown>[]
  itemsLength: number
}>()

const attrs = useAttrs()
const slots: Slots = useSlots()
const slotNames = computed<string[]>(() => Object.keys(slots))
</script>

<template>
  <GkDataTable
    mode="server"
    :headers="props.headers"
    :items="props.items"
    :items-length="props.itemsLength"
    v-bind="attrs"
  >
    <template v-for="name in slotNames" :key="name" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
  </GkDataTable>
</template>
