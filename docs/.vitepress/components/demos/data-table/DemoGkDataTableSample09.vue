<script setup lang="ts">
import { computed, ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const allRows = ref(
  Array.from({ length: 47 }, (_, i) => ({
    id: i,
    name: `Row ${i}`,
    region: ['eu', 'us', 'ap'][i % 3]!,
    status: ['ok', 'warn', 'idle'][i % 3]!,
  }))
)
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
const loading = ref(false)

const total = computed(() => allRows.value.length)

const pageItems = computed(() => {
  const ipp = itemsPerPage.value
  const start = (page.value - 1) * ipp
  return allRows.value.slice(start, start + ipp)
})

const headers = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'region', title: 'Region' },
  { key: 'status', title: 'Status' },
]
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      mode="server"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="pageItems"
      :items-length="total"
      :loading="loading"
      :bordered="false"
      density="compact"
      caption="Server mode (simulated slice)"
    />
  </div>
</template>
