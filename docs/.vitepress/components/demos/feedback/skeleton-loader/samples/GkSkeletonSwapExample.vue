<script setup lang="ts">
import { GkButton, GkSkeletonLoader } from 'god-kit/vue'
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div class="gk-doc-stack">
    <GkButton type="button" variant="secondary" @click="loading = !loading">
      {{ loading ? 'Show content' : 'Show skeleton' }}
    </GkButton>
    <GkSkeletonLoader :loading="loading" type="card" loading-text="Loading card">
      <div class="gk-doc-skeleton-demo__content">
        <p class="gk-doc-skeleton-demo__title">Loaded card</p>
        <p class="gk-doc-skeleton-demo__body">
          Default slot content appears when <code>loading</code> is false.
        </p>
      </div>
    </GkSkeletonLoader>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-skeleton-demo__content {
  padding: var(--gk-space-3);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
}

.gk-doc-skeleton-demo__title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}

.gk-doc-skeleton-demo__body {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}
</style>
