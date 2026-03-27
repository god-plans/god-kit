<script setup lang="ts">
import { GkContainer } from '@god-plan/god-kit/vue'
</script>

<template>
  <div class="gk-doc-demo gk-doc-demo--dark">
    <GkContainer max-width="sm">
      <p class="gk-doc-p">
        Narrow container with horizontal padding.
      </p>
    </GkContainer>
  </div>
</template>

<style scoped>
.gk-doc-p {
  margin: 0;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
}
</style>
