<script setup lang="ts">
import { GkForm } from 'god-kit/vue'
import { ref } from 'vue'

const disabledMode = ref(false)
const readonlyMode = ref(false)
</script>

<template>
  <div class="gk-doc-stack">
    <div class="gk-doc-row">
      <label><input v-model="disabledMode" type="checkbox"> Disabled</label>
      <label><input v-model="readonlyMode" type="checkbox"> Readonly</label>
    </div>
    <GkForm :disabled="disabledMode" :readonly="readonlyMode">
      <template #default="{ isDisabled, isReadonly }">
        <p class="gk-doc-muted">
          Form flags → disabled: {{ isDisabled }}, readonly: {{ isReadonly }}
        </p>
      </template>
    </GkForm>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  max-width: 22rem;
}

.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  font-size: var(--gk-font-size-sm);
}

.gk-doc-muted {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
