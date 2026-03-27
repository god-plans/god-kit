<script setup lang="ts">
import { GkDivider } from '@god-plan/god-kit/vue'
</script>

<template>
  <div class="gk-doc-demo">
    <p class="gk-doc-p">
      Above
    </p>
    <GkDivider />
    <p class="gk-doc-p">
      Below
    </p>
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
