<script setup lang="ts">
import { ref } from 'vue'
import { GkAlert } from '@god-plan/god-kit/vue'

const closableOpen = ref(true)
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

    <GkAlert
      variant="info"
      title="With title"
      text="Supporting line from the text prop."
      border="start"
    />

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

    <GkAlert variant="warning" prominent title="Prominent" border="top">
      Extra padding for emphasis.
    </GkAlert>
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
