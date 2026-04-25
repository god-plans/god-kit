<script setup lang="ts">
import { GkCard } from 'god-kit/vue'
</script>

<template>
  <GkCard :max-width="400">
    <template #prepend>
      <span class="status-dot" aria-hidden="true" />
    </template>

    <template #title>
      Custom title slot
    </template>

    <template #subtitle>
      With a color chip in prepend
    </template>

    <template #append>
      <span class="badge">New</span>
    </template>

    Use #prepend and #append for icons, avatars, or status chips.
  </GkCard>
</template>

<style scoped>
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--gk-color-primary);
  margin-top: 0.35rem;
}

.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: var(--gk-text-body-xs-size);
  font-weight: 600;
  line-height: var(--gk-text-body-xs-line-height);
  color: var(--gk-color-text-on-primary);
  background: var(--gk-color-primary);
  border-radius: var(--gk-radius-sm);
}
</style>
