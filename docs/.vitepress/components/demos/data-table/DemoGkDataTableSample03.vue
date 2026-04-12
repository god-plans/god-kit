<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'last', title: 'Last name', sortable: true },
  { key: 'first', title: 'First name', sortable: true },
  { key: 'dept', title: 'Dept', sortable: true },
  { key: 'role', title: 'Role' },
]
const items = ref(
  Array.from({ length: 24 }, (_, i) => ({
    id: 1000 + i,
    last: ['Lovelace', 'Hopper', 'Hamilton', 'Johnson'][i % 4]!,
    first: ['Ada', 'Grace', 'Margaret', 'Katherine'][(i + 1) % 4]!,
    dept: ['Eng', 'Ops', 'Research', 'Design'][i % 4]!,
    role: ['IC', 'Lead', 'Staff'][i % 3]!,
  }))
)
const page = ref(1)
const itemsPerPage = ref(5)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      multi-sort
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Multi-sort (toggle several columns)"
    />
  </div>
</template>
