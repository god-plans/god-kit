<script setup lang="ts">
import { GkAlert } from 'god-kit/vue'
import { ref } from 'vue'

const closableOpen = ref(true)
</script>

<template>
  <div class="gk-doc-stack">
    <GkAlert
      v-model="closableOpen"
      variant="success"
      title="Closable"
      closable
      border
    >
      Dismiss sets <code>v-model</code> to <code>false</code> and removes the alert.
    </GkAlert>
    <p v-if="!closableOpen" class="gk-doc-demo-reset">
      <button type="button" class="gk-doc-link-button" @click="closableOpen = true">
        Show closable example again
      </button>
    </p>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
}

.gk-doc-demo-reset {
  margin: 0;
}

.gk-doc-link-button {
  font: inherit;
  color: var(--gk-color-primary, LinkText);
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
</style>
