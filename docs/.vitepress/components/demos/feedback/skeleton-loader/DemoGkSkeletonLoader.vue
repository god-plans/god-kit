<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkSkeletonLoader } from 'god-kit/vue'

const loading = ref(true)
</script>

<template>
  <div class="gk-doc-demo gk-doc-skeleton-demo">
    <div class="gk-doc-skeleton-demo__toolbar">
      <GkButton type="button" variant="secondary" @click="loading = !loading">
        {{ loading ? 'Show content' : 'Show skeleton' }}
      </GkButton>
    </div>
    <GkSkeletonLoader :loading="loading" type="card" loading-text="Loading card">
      <div class="gk-doc-skeleton-demo__content">
        <p class="gk-doc-skeleton-demo__title">Loaded card</p>
        <p class="gk-doc-skeleton-demo__body">
          Default slot content appears when <code>loading</code> is false.
        </p>
      </div>
    </GkSkeletonLoader>

    <GkSkeletonLoader type="list-item-avatar" boilerplate class="gk-doc-skeleton-demo--mt" />
  </div>
</template>

<style scoped>
.gk-doc-skeleton-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-skeleton-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
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

.gk-doc-skeleton-demo--mt {
  max-width: 24rem;
}
</style>
