<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'sku', title: 'SKU' },
  { key: 'name', title: 'Product', sortable: true },
  { key: 'category', title: 'Category' },
  { key: 'qty', title: 'Qty', sortable: true },
  { key: 'price', title: 'Price', align: 'end' as const },
  { key: 'status', title: 'Status' },
]
const items = ref([
  { id: 'a1', sku: 'SKU-100', name: 'Keyboard', category: 'Input', qty: 12, price: 79, status: 'In stock' },
  { id: 'a2', sku: 'SKU-200', name: 'Monitor', category: 'Display', qty: 4, price: 329, status: 'Low' },
  { id: 'a3', sku: 'SKU-310', name: 'Dock', category: 'Accessories', qty: 18, price: 149, status: 'In stock' },
  { id: 'a4', sku: 'SKU-055', name: 'Webcam', category: 'AV', qty: 0, price: 89, status: 'Backorder' },
  { id: 'a5', sku: 'SKU-420', name: 'Headset', category: 'AV', qty: 25, price: 129, status: 'In stock' },
  { id: 'a6', sku: 'SKU-088', name: 'Mouse', category: 'Input', qty: 40, price: 59, status: 'In stock' },
])
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
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Inventory"
    />
  </div>
</template>
