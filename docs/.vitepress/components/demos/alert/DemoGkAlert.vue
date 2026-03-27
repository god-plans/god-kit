<script setup lang="ts">
import { GkAlert } from '@god-plan/god-kit/vue'
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <GkAlert variant="neutral">
      Neutral message.
    </GkAlert>
    <GkAlert variant="info">
      Info message.
    </GkAlert>
    <GkAlert variant="success">
      Success message.
    </GkAlert>
    <GkAlert variant="warning">
      Warning message.
    </GkAlert>
    <GkAlert variant="danger" role="alert">
      Danger message.
    </GkAlert>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
}
</style>
