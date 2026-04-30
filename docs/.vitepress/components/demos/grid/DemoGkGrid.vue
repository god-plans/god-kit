<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkGridTwoColumnExample from './samples/GkGridTwoColumnExample.vue'
import twoColSource from './samples/GkGridTwoColumnExample.vue?raw'
import GkGridResponsiveExample from './samples/GkGridResponsiveExample.vue'
import responsiveSource from './samples/GkGridResponsiveExample.vue?raw'
import GkGridChromeExample from './samples/GkGridChromeExample.vue'
import chromeSource from './samples/GkGridChromeExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Two columns"
      description="Simple grid with gap and two cells."
      :source="twoColSource"
    >
      <GkGridTwoColumnExample />
    </GkDocsExample>

    <GkDocsExample
      title="Responsive columns and guides"
      description="Three columns on wide viewports, one on narrow, with dashed cell outlines."
      :source="responsiveSource"
    >
      <GkGridResponsiveExample />
    </GkDocsExample>

    <GkDocsExample
      title="Chrome row"
      description="data-gk-grid-chrome marks non-cell rows when show-grid-lines is on."
      :source="chromeSource"
    >
      <GkGridChromeExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
