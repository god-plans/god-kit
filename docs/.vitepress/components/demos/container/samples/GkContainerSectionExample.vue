<script setup lang="ts">
import { GkContainer } from 'god-kit/vue'
</script>

<template>
  <GkContainer tag="section" max-width="sm">
    <p class="gk-doc-p">
      Use semantic tags when the container represents a landmark region.
    </p>
  </GkContainer>
</template>

<style scoped>
.gk-doc-p {
  margin: 0;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
}
</style>
