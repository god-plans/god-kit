<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_TABS } from '../../../../injection'
import type { GkTabsContext } from '../../../../injection'

const props = defineProps<{
  value: string | number
}>()

const tabs = inject(GK_TABS, null) as GkTabsContext | null

const selected = computed(() => tabs?.modelValue.value === props.value)
const panelId = computed(() => (tabs ? tabs.panelId(props.value) : ''))
const tabId = computed(() => (tabs ? tabs.tabId(props.value) : ''))
</script>

<template>
  <div
    v-if="tabs"
    :id="panelId"
    class="gk-tabs-window-item"
    role="tabpanel"
    :tabindex="selected ? 0 : -1"
    :aria-labelledby="tabId"
    :hidden="!selected"
  >
    <slot />
  </div>
</template>

<style scoped>
.gk-tabs-window-item {
  box-sizing: border-box;
  padding: var(--gk-space-3) 0;
  outline: none;
}

.gk-tabs-window-item:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}
</style>
