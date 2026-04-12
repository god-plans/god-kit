<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const headers = [
  { key: 'city', title: 'City', sortable: true },
  { key: 'region', title: 'Subregion' },
  { key: 'country', title: 'Country' },
  { key: 'pop', title: 'Pop. (M)', align: 'end' as const },
]
const items = ref([
  { id: 1, city: 'Oslo', region: 'Eastern', country: 'NO', pop: 1.1 },
  { id: 2, city: 'Bergen', region: 'Western', country: 'NO', pop: 0.29 },
  { id: 3, city: 'Stockholm', region: 'Södermanland', country: 'SE', pop: 1.0 },
  { id: 4, city: 'Gothenburg', region: 'Västra Götaland', country: 'SE', pop: 0.58 },
  { id: 5, city: 'Copenhagen', region: 'Capital', country: 'DK', pop: 0.8 },
  { id: 6, city: 'Helsinki', region: 'Uusimaa', country: 'FI', pop: 0.66 },
])
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])
</script>

<template>
  <div class="vp-demo vp-demo--data-table dt-demo-stack">
    <label class="dt-demo-label">
      <span>Search</span>
      <input v-model="search" type="search" class="dt-demo-input" placeholder="Filter rows…" />
    </label>
    <GkDataTable
      v-model:search="search"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Offices (client filter)"
    />
  </div>
</template>

<style scoped>
.dt-demo-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.dt-demo-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.dt-demo-input {
  max-width: min(100%, 22rem);
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
</style>
