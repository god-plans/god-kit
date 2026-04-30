<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkTabsItemsBasicExample from './samples/GkTabsItemsBasicExample.vue'
import itemsBasicSource from './samples/GkTabsItemsBasicExample.vue?raw'
import GkTabsSlotsExample from './samples/GkTabsSlotsExample.vue'
import slotsSource from './samples/GkTabsSlotsExample.vue?raw'
import GkTabsItemsDisabledExample from './samples/GkTabsItemsDisabledExample.vue'
import itemsDisabledSource from './samples/GkTabsItemsDisabledExample.vue?raw'
import GkTabsVerticalArrowsExample from './samples/GkTabsVerticalArrowsExample.vue'
import verticalArrowsSource from './samples/GkTabsVerticalArrowsExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Items (basic)"
      description="Data-driven tabs with string items and a scoped #item panel slot."
      :source="itemsBasicSource"
    >
      <GkTabsItemsBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Slots (GkTab + window)"
      description="Declare GkTab buttons and pair panels with GkTabsWindowItem in the #window slot."
      :source="slotsSource"
      best-practice="Disabled tabs are skipped by keyboard navigation; keep panel content in sync with enabled values."
    >
      <GkTabsSlotsExample />
    </GkDocsExample>

    <GkDocsExample
      title="Items with disabled entries"
      description="Use object items when you need per-tab disabled or display text."
      :source="itemsDisabledSource"
    >
      <GkTabsItemsDisabledExample />
    </GkDocsExample>

    <GkDocsExample
      title="Vertical strip with arrows"
      description="Vertical direction with scroll arrows, inset padding, and spaced tab buttons."
      :source="verticalArrowsSource"
    >
      <GkTabsVerticalArrowsExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
