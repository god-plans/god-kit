<script setup lang="ts">
import { ref } from 'vue'
import { GkTab, GkTabs, GkTabsWindowItem } from 'god-kit/vue'

const tab = ref(1)
const align = ref<'start' | 'title' | 'center' | 'end'>('start')
const slider = ref<'fade' | 'grow' | 'shift'>('shift')
const direction = ref<'horizontal' | 'vertical'>('horizontal')
</script>

<template>
  <div class="gk-doc-demo gk-doc-tabs-demo">
    <div class="gk-doc-tabs-demo__toolbar">
      <label class="gk-doc-tabs-demo__label">
        Align
        <select v-model="align" class="gk-doc-tabs-demo__select">
          <option value="start">start</option>
          <option value="title">title</option>
          <option value="center">center</option>
          <option value="end">end</option>
        </select>
      </label>
      <label class="gk-doc-tabs-demo__label">
        Slider
        <select v-model="slider" class="gk-doc-tabs-demo__select">
          <option value="shift">shift</option>
          <option value="fade">fade</option>
          <option value="grow">grow</option>
        </select>
      </label>
      <label class="gk-doc-tabs-demo__label">
        Direction
        <select v-model="direction" class="gk-doc-tabs-demo__select">
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
      </label>
    </div>

    <GkTabs v-model="tab" :align-tabs="align" :slider-transition="slider" :direction="direction" grow>
      <GkTab :value="1">First</GkTab>
      <GkTab :value="2" disabled>Second (disabled)</GkTab>
      <GkTab :value="3">Third</GkTab>
      <template #window>
        <GkTabsWindowItem :value="1">
          <p class="gk-doc-tabs-demo__panel">Panel one content.</p>
        </GkTabsWindowItem>
        <GkTabsWindowItem :value="2">
          <p class="gk-doc-tabs-demo__panel">Panel two content.</p>
        </GkTabsWindowItem>
        <GkTabsWindowItem :value="3">
          <p class="gk-doc-tabs-demo__panel">Panel three content.</p>
        </GkTabsWindowItem>
      </template>
    </GkTabs>
  </div>
</template>

<style scoped>
.gk-doc-tabs-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  max-width: 28rem;
}

.gk-doc-tabs-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  align-items: center;
}

.gk-doc-tabs-demo__label {
  display: flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-doc-tabs-demo__select {
  font: inherit;
  padding: var(--gk-space-1) var(--gk-space-2);
  border-radius: var(--gk-radius-sm);
  border: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
}

.gk-doc-tabs-demo__panel {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
