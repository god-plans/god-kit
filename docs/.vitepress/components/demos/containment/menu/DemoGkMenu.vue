<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkMenu } from 'god-kit/vue'

const open = ref(false)
const placement = ref<'bottom-start' | 'bottom-end'>('bottom-start')
const persistent = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-menu-demo">
    <div class="gk-doc-menu-demo__toolbar">
      <label class="gk-doc-menu-demo__label">
        Placement
        <select v-model="placement" class="gk-doc-menu-demo__select">
          <option value="bottom-start">bottom-start</option>
          <option value="bottom-end">bottom-end</option>
        </select>
      </label>
      <label class="gk-doc-menu-demo__label">
        <input v-model="persistent" type="checkbox" />
        Persistent
      </label>
    </div>
    <GkMenu v-model="open" :placement="placement" :persistent="persistent">
      <template #activator="{ props }">
        <GkButton type="button" v-bind="props">Menu</GkButton>
      </template>
      <button type="button" class="gk-doc-menu-demo__item" role="menuitem" @click.stop="open = false">
        Action (stops close)
      </button>
      <button type="button" class="gk-doc-menu-demo__item" role="menuitem">Another item</button>
    </GkMenu>
  </div>
</template>

<style scoped>
.gk-doc-menu-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gk-space-3);
}

.gk-doc-menu-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}

.gk-doc-menu-demo__label {
  display: flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-doc-menu-demo__select {
  font: inherit;
  padding: var(--gk-space-1) var(--gk-space-2);
  border-radius: var(--gk-radius-sm);
  border: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
}

.gk-doc-menu-demo__item {
  display: block;
  width: 100%;
  margin: 0;
  padding: var(--gk-space-2) var(--gk-space-3);
  font: inherit;
  font-size: var(--gk-font-size-sm);
  text-align: start;
  color: inherit;
  background: transparent;
  border: none;
  border-radius: var(--gk-radius-sm);
  cursor: pointer;
}

.gk-doc-menu-demo__item:hover {
  background: var(--gk-color-bg);
}

.gk-doc-menu-demo__item:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}
</style>
