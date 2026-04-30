<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkContainerSmExample from './samples/GkContainerSmExample.vue'
import smSource from './samples/GkContainerSmExample.vue?raw'
import GkContainerFullExample from './samples/GkContainerFullExample.vue'
import fullSource from './samples/GkContainerFullExample.vue?raw'
import GkContainerSectionExample from './samples/GkContainerSectionExample.vue'
import sectionSource from './samples/GkContainerSectionExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Narrow max width"
      description="sm max-width with default horizontal padding."
      :source="smSource"
    >
      <GkContainerSmExample />
    </GkDocsExample>

    <GkDocsExample
      title="Full width, no padding"
      description="full removes the side padding for bleed layouts."
      :source="fullSource"
    >
      <GkContainerFullExample />
    </GkDocsExample>

    <GkDocsExample
      title="Section landmark"
      description="tag=&quot;section&quot; for a named document region."
      :source="sectionSource"
    >
      <GkContainerSectionExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
