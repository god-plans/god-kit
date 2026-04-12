<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'name', title: 'Service', sortable: true },
  { key: 'uptime', title: 'Uptime %', sortable: true, align: 'end' as const },
  { key: 'version', title: 'Version' },
]
const items = ref([
  { id: 's1', region: 'eu', name: 'API', uptime: 99.9, version: '2.4.1' },
  { id: 's2', region: 'eu', name: 'Worker', uptime: 99.5, version: '2.4.0' },
  { id: 's3', region: 'us', name: 'API', uptime: 99.8, version: '2.4.1' },
  { id: 's4', region: 'us', name: 'Worker', uptime: 99.2, version: '2.3.9' },
  { id: 's5', region: 'ap', name: 'API', uptime: 99.7, version: '2.4.1' },
  { id: 's6', region: 'ap', name: 'Worker', uptime: 99.4, version: '2.4.0' },
])
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([{ key: 'region', order: 'asc' }])
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="items"
      :group-by="['region']"
      :bordered="false"
      density="compact"
      caption="Grouped by region (current page)"
    >
      <template #group-header="{ groupKey, groupValue }">
        <span class="dt-group">Region: {{ String(groupValue) }} ({{ groupKey }})</span>
      </template>
    </GkDataTable>
  </div>
</template>

<style scoped>
.dt-group {
  font-weight: 600;
}
</style>
