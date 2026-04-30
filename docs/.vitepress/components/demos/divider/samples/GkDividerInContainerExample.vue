<script setup lang="ts">
import { GkContainer, GkDivider } from 'god-kit/vue'
</script>

<template>
  <GkContainer max-width="sm">
    <p class="gk-doc-p">
      In container
    </p>
    <GkDivider />
    <p class="gk-doc-p">
      Below divider
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
