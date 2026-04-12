<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'title', title: 'Title', sortable: true },
  { key: 'owner', title: 'Owner' },
  { key: 'status', title: 'Status' },
  { key: 'priority', title: 'Priority', align: 'center' as const },
]
const items = ref([
  {
    id: 'x1',
    title: 'RFC-42 Auth',
    owner: 'Team A',
    status: 'Review',
    priority: 'P1',
    notes: 'OAuth2 + refresh rotation.',
  },
  {
    id: 'x2',
    title: 'RFC-77 Cache',
    owner: 'Team B',
    status: 'Draft',
    priority: 'P2',
    notes: 'CDN + stale-while-revalidate.',
  },
  {
    id: 'x3',
    title: 'RFC-91 Observability',
    owner: 'Team C',
    status: 'Approved',
    priority: 'P1',
    notes: 'Tracing + structured logs.',
  },
])
const expanded = ref<unknown[]>([])
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])

function notesFor(item: Record<string, unknown>) {
  return typeof item.notes === 'string' ? item.notes : ''
}
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      v-model:expanded="expanded"
      item-value="id"
      show-expand
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Expandable rows"
    >
      <template #expanded-row="{ item }">
        <p class="dt-expand">
          <strong>Detail:</strong>
          {{ notesFor(item) }}
        </p>
      </template>
    </GkDataTable>
  </div>
</template>

<style scoped>
.dt-expand {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
