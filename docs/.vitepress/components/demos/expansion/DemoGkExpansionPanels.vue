<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkExpansionAccordionExample from './samples/GkExpansionAccordionExample.vue'
import accordionSource from './samples/GkExpansionAccordionExample.vue?raw'
import GkExpansionMultipleExample from './samples/GkExpansionMultipleExample.vue'
import multipleSource from './samples/GkExpansionMultipleExample.vue?raw'
import GkExpansionDisabledExample from './samples/GkExpansionDisabledExample.vue'
import disabledSource from './samples/GkExpansionDisabledExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Accordion"
      description="Default multiple=false: at most one panel is expanded at a time."
      :source="accordionSource"
    >
      <GkExpansionAccordionExample />
    </GkDocsExample>

    <GkDocsExample
      title="Multiple open"
      description="Set multiple to allow several sections expanded together."
      :source="multipleSource"
    >
      <GkExpansionMultipleExample />
    </GkDocsExample>

    <GkDocsExample
      title="Disabled group"
      description="disabled prevents toggling; use for read-only review UIs."
      :source="disabledSource"
    >
      <GkExpansionDisabledExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
