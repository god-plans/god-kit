<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
]
const items = ref([
  { id: 1, name: 'Ada', role: 'Dev' },
  { id: 2, name: 'Grace', role: 'Admin' },
])
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
</script>

<template>
  <GkDataTable
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="items"
    caption="Team"
    striped
  />
</template>
