<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkMenu } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkMenu v-model="open" persistent show-scrim>
    <template #activator="{ props }">
      <GkButton type="button" variant="secondary" v-bind="props">
        Persistent menu
      </GkButton>
    </template>

    <p class="hint">Outside click and Escape stay open.</p>
    <GkButton type="button" size="sm" slim @click="open = false">
      Close
    </GkButton>
  </GkMenu>
</template>

<style scoped>
.hint {
  margin: 0 0 var(--gk-space-2);
  padding: var(--gk-space-2) var(--gk-space-3);
  color: var(--gk-color-text-muted);
}
</style>
