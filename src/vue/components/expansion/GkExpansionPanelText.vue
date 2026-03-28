<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_EXPANSION_PANEL } from '../../../injection'

defineOptions({ inheritAttrs: false })

const panel = inject(GK_EXPANSION_PANEL, null)
if (!panel) {
  throw new Error('GkExpansionPanelText must be used inside GkExpansionPanel')
}

const expanded = computed(() => panel.isExpanded.value)
</script>

<template>
  <div
    :id="panel.contentId"
    class="gk-expansion-panel-text"
    role="region"
    :aria-labelledby="panel.titleId"
    :hidden="!expanded"
  >
    <div class="gk-expansion-panel-text__inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gk-expansion-panel-text {
  box-sizing: border-box;
}

.gk-expansion-panel-text__inner {
  padding: 0 var(--gk-space-4) var(--gk-space-4);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
