<script setup lang="ts">
import { GkRadio, GkRadioGroup } from 'god-kit/vue'
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const saving = ref(false)
</script>

<template>
  <div class="gk-doc-stack">
    <label class="gk-doc-inline">
      <input v-model="saving" type="checkbox" />
      <span>Disable group</span>
    </label>
    <GkRadioGroup
      v-model="theme"
      aria-label="Theme"
      :disabled="saving"
    >
      <GkRadio value="light">
        Light
      </GkRadio>
      <GkRadio value="dark">
        Dark
      </GkRadio>
    </GkRadioGroup>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  max-width: 20rem;
}

.gk-doc-inline {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
