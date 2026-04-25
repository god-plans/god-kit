<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkCard } from 'god-kit/vue'

const loading = ref(false)
</script>

<template>
  <div class="states-example">
    <div class="states-example__stack">
      <GkButton type="button" variant="secondary" @click="loading = !loading">
        Toggle loading
      </GkButton>

      <GkCard
        variant="outlined"
        density="compact"
        :loading="loading"
        :rounded="false"
        :max-width="320"
        title="Loading compact card"
        text="The toggle is outside the card to avoid nested interactive controls."
      />
    </div>

    <GkCard
      variant="tonal"
      flat
      disabled
      :max-width="320"
      title="Disabled + tonal"
      text="Tonal background with no lift."
    />
  </div>
</template>

<style scoped>
.states-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-4);
  align-items: flex-start;
}

.states-example__stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  align-items: flex-start;
}
</style>
