<script setup lang="ts">
import { GkTab, GkTabs, GkTabsWindowItem } from 'god-kit/vue'
import { ref } from 'vue'

const tab = ref(1)
</script>

<template>
  <GkTabs v-model="tab" grow>
    <GkTab :value="1">
      First
    </GkTab>
    <GkTab :value="2" disabled>
      Second (disabled)
    </GkTab>
    <GkTab :value="3">
      Third
    </GkTab>
    <template #window>
      <GkTabsWindowItem :value="1">
        <p class="gk-doc-tabs-sample__panel">
          Panel one content.
        </p>
      </GkTabsWindowItem>
      <GkTabsWindowItem :value="2">
        <p class="gk-doc-tabs-sample__panel">
          Panel two content.
        </p>
      </GkTabsWindowItem>
      <GkTabsWindowItem :value="3">
        <p class="gk-doc-tabs-sample__panel">
          Panel three content.
        </p>
      </GkTabsWindowItem>
    </template>
  </GkTabs>
</template>

<style scoped>
.gk-doc-tabs-sample__panel {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
