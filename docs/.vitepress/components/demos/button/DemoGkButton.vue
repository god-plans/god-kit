<script setup lang="ts">
import { GkButton } from 'god-kit/vue'
import { ref } from 'vue'

const busy = ref(false)
function submit() {
  busy.value = true
  setTimeout(() => {
    busy.value = false
  }, 1200)
}
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <div class="gk-doc-row">
      <GkButton variant="primary">
        Primary
      </GkButton>
      <GkButton variant="secondary">
        Secondary
      </GkButton>
      <GkButton variant="ghost">
        Ghost
      </GkButton>
      <GkButton variant="danger">
        Danger
      </GkButton>
    </div>
    <div class="gk-doc-row">
      <GkButton size="sm" slim variant="secondary">
        Slim
      </GkButton>
      <GkButton stacked variant="secondary">
        <span aria-hidden="true">+</span>
        <span>Stacked</span>
      </GkButton>
      <GkButton :loading="busy" variant="primary" @click="submit">
        Submit
      </GkButton>
      <GkButton href="https://example.com" target="_blank" rel="noopener noreferrer" variant="ghost">
        Link
      </GkButton>
    </div>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  align-items: center;
}
</style>
