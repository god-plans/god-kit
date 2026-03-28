<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkTooltip } from '@god-plan/god-kit/vue'

const placement = ref<'top' | 'bottom' | 'start' | 'end'>('bottom')
const interactive = ref(false)
const openOnClick = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-tooltip-demo">
    <div class="gk-doc-tooltip-demo__toolbar">
      <label class="gk-doc-tooltip-demo__label">
        Placement
        <select v-model="placement" class="gk-doc-tooltip-demo__select">
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="start">start</option>
          <option value="end">end</option>
        </select>
      </label>
      <label class="gk-doc-tooltip-demo__label">
        <input v-model="interactive" type="checkbox" />
        Interactive
      </label>
      <label class="gk-doc-tooltip-demo__label">
        <input v-model="openOnClick" type="checkbox" />
        Open on click
      </label>
    </div>
    <GkTooltip
      :placement="placement"
      :interactive="interactive"
      :open-on-hover="!openOnClick"
      :open-on-focus="!openOnClick"
      :open-on-click="openOnClick"
      text="Short help text. With interactive mode you can move the pointer onto this panel."
    >
      <template #activator="{ props }">
        <GkButton type="button" v-bind="props">
          {{ openOnClick ? 'Click me' : 'Hover / focus' }}
        </GkButton>
      </template>
    </GkTooltip>
  </div>
</template>

<style scoped>
.gk-doc-tooltip-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gk-space-3);
}

.gk-doc-tooltip-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  align-items: center;
}

.gk-doc-tooltip-demo__label {
  display: flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-doc-tooltip-demo__select {
  font: inherit;
  padding: var(--gk-space-1) var(--gk-space-2);
  border-radius: var(--gk-radius-sm);
  border: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
}
</style>
