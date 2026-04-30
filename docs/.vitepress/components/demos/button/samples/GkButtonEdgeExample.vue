<script setup lang="ts">
import { GkButton } from 'god-kit/vue'
import { ref } from 'vue'

const readonly = ref(true)
</script>

<template>
  <div class="gk-doc-row">
    <GkButton :readonly="readonly" variant="secondary">
      Readonly
    </GkButton>
    <GkButton disabled variant="secondary">
      Disabled
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
