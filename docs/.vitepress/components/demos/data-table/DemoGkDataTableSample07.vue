<script setup lang="ts">
import { GkDataTable } from 'god-kit/vue'

const headers = [
  {
    key: 'q1',
    title: 'Q1',
    children: [
      { key: 'a', title: 'Alpha', sortable: true },
      { key: 'b', title: 'Beta', sortable: true },
      { key: 'c', title: 'Gamma', sortable: true },
    ],
  },
  {
    key: 'q2',
    title: 'Q2',
    children: [
      { key: 'x', title: 'X', sortable: true },
      { key: 'y', title: 'Y', sortable: true },
    ],
  },
  { key: 'total', title: 'Total', sortable: true, fixed: 'end' as const },
]
const items = [
  { id: 1, a: 10, b: 20, c: 5, x: 4, y: 8, total: 47 },
  { id: 2, a: 12, b: 8, c: 14, x: 6, y: 3, total: 43 },
  { id: 3, a: 7, b: 22, c: 9, x: 11, y: 7, total: 56 },
]
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      :headers="headers"
      :items="items"
      :max-height="320"
      :bordered="false"
      density="compact"
      caption="Nested headers + fixed total column"
    />
  </div>
</template>
