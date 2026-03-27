<script setup lang="ts">
import { GkCheckbox } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const ok = ref(false)
const locked = ref(false)
const tri = ref(false)
const indeterminate = ref(true)

function onTriUpdate() {
  indeterminate.value = false
}
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <label class="gk-doc-inline">
      <GkCheckbox v-model="ok" />
      <span>Accept terms</span>
    </label>

    <label class="gk-doc-inline">
      <GkCheckbox v-model="ok" value="terms" />
      <span>With native <code>value</code></span>
    </label>

    <label class="gk-doc-inline">
      <GkCheckbox
        v-model="tri"
        :indeterminate="indeterminate"
        @update:model-value="onTriUpdate"
      />
      <span>Indeterminate (clears after first toggle)</span>
    </label>

    <label class="gk-doc-inline">
      <GkCheckbox v-model="locked" readonly />
      <span>Readonly (cannot toggle)</span>
    </label>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
}

.gk-doc-inline {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
}
</style>
