<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_EXPANSION_PANEL } from '../../../injection'

defineOptions({ inheritAttrs: false })

const panel = inject(GK_EXPANSION_PANEL, null)
if (!panel) {
  throw new Error('GkExpansionPanelTitle must be used inside GkExpansionPanel')
}

const expanded = computed(() => panel.isExpanded.value)
const disabled = computed(() => panel.disabled.value)
</script>

<template>
  <button
    type="button"
    class="gk-expansion-panel-title"
    :id="panel.titleId"
    :aria-expanded="expanded"
    :aria-controls="panel.contentId"
    :disabled="disabled"
    @click="panel.toggle"
  >
    <span class="gk-expansion-panel-title__text">
      <slot />
    </span>
    <span class="gk-expansion-panel-title__icon" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.gk-expansion-panel-title {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--gk-space-3);
  margin: 0;
  padding: var(--gk-space-4);
  font: inherit;
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-tight);
  text-align: start;
  color: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
}

.gk-expansion-panel-title:disabled {
  cursor: not-allowed;
  opacity: var(--gk-opacity-disabled);
}

.gk-expansion-panel-title:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-expansion-panel-title__text {
  flex: 1;
  min-width: 0;
}

.gk-expansion-panel-title__icon {
  flex-shrink: 0;
  display: flex;
  transition: transform var(--gk-duration-normal) var(--gk-easing-standard);
}
</style>
