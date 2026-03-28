<script setup lang="ts">
import { ref } from 'vue'
import { GkPagination } from 'god-kit/vue'

const page = ref(3)
const length = ref(24)
const showEnds = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-pagination-demo">
    <div class="gk-doc-pagination-demo__toolbar">
      <label class="gk-doc-pagination-demo__label">
        Length (pages)
        <input v-model.number="length" class="gk-doc-pagination-demo__input" type="number" min="1" max="100" />
      </label>
      <label class="gk-doc-pagination-demo__label">
        <input v-model="showEnds" type="checkbox" />
        First / last
      </label>
    </div>
    <GkPagination
      v-model="page"
      :length="length"
      :total-visible="7"
      :show-first-last-page="showEnds"
    />
    <p class="gk-doc-pagination-demo__meta">Page {{ page }} of {{ length }}</p>
  </div>
</template>

<style scoped>
.gk-doc-pagination-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  max-width: 36rem;
}

.gk-doc-pagination-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  align-items: center;
}

.gk-doc-pagination-demo__label {
  display: flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-doc-pagination-demo__input {
  width: 4rem;
  font: inherit;
  padding: var(--gk-space-1) var(--gk-space-2);
  border-radius: var(--gk-radius-sm);
  border: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
}

.gk-doc-pagination-demo__meta {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
