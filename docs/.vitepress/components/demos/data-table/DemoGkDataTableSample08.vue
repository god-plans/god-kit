<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'label', title: 'Label', sortable: true },
  { key: 'category', title: 'Category' },
  { key: 'score', title: 'Score', align: 'end' as const },
  { key: 'updated', title: 'Updated' },
]
const items = ref(
  Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    category: ['Alpha', 'Beta', 'Gamma'][i % 3]!,
    score: 60 + ((i * 7) % 40),
    updated: `2026-04-${String((i % 28) + 1).padStart(2, '0')}`,
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
      :headers="headers"
      :items="items"
      :bordered="false"
      density="compact"
      striped
      fixed-header
      :max-height="280"
      mobile="auto"
      caption="Compact, striped, sticky header, scroll, mobile:auto"
    />
  </div>
</template>
