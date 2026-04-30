<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkSpinnerSizesExample from './samples/GkSpinnerSizesExample.vue'
import sizesSource from './samples/GkSpinnerSizesExample.vue?raw'
import GkSpinnerOnFilledExample from './samples/GkSpinnerOnFilledExample.vue'
import onFilledSource from './samples/GkSpinnerOnFilledExample.vue?raw'
import GkSpinnerButtonExample from './samples/GkSpinnerButtonExample.vue'
import buttonSource from './samples/GkSpinnerButtonExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Sizes"
      description="sm and md inline spinners with explicit labels."
      :source="sizesSource"
    >
      <GkSpinnerSizesExample />
    </GkDocsExample>

    <GkDocsExample
      title="On filled surfaces"
      description="tone on-filled keeps contrast on primary-colored regions."
      :source="onFilledSource"
    >
      <GkSpinnerOnFilledExample />
    </GkDocsExample>

    <GkDocsExample
      title="Button loading"
      description="GkButton shows a spinner and accepts loading-label for assistive text."
      :source="buttonSource"
    >
      <GkSpinnerButtonExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
