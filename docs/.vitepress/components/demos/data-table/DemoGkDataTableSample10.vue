<script setup lang="ts">
import { computed } from 'vue'
import { GkDataTableVirtual } from 'god-kit/vue'

const headers = [
  { key: 'n', title: '#', sortable: false, align: 'end' as const },
  { key: 'label', title: 'Label' },
  { key: 'status', title: 'Status' },
  { key: 'category', title: 'Category' },
]
const items = computed(() =>
  Array.from({ length: 5000 }, (_, i) => ({
    n: i + 1,
    label: `Row ${i + 1}`,
    status: ['ok', 'warn', 'idle'][i % 3]!,
    category: ['A', 'B', 'C', 'D'][i % 4]!,
  }))
)
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTableVirtual
      :headers="headers"
      :items="items"
      :height="360"
      :estimate-size="44"
      :bordered="false"
      column-min-width="5.5rem"
    />
  </div>
</template>
