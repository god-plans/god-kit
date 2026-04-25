<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkMenu } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkMenu v-model="open">
    <template #activator="{ props }">
      <GkButton type="button" v-bind="props">Menu</GkButton>
    </template>

    <button type="button" class="item" role="menuitem" @click.stop="open = false">
      Profile
    </button>
    <button type="button" class="item" role="menuitem">
      Settings
    </button>
  </GkMenu>
</template>

<style scoped>
.item {
  display: block;
  width: 100%;
  padding: var(--gk-space-2) var(--gk-space-3);
  border: 0;
  border-radius: var(--gk-radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.item:hover {
  background: var(--gk-color-bg);
}
</style>
