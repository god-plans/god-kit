<script setup lang="ts">
import { GkButton } from '@god-plan/god-kit/vue'
</script>

<template>
  <div class="gk-doc-demo gk-doc-row">
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
</template>

<style scoped>
.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  align-items: center;
}
</style>
