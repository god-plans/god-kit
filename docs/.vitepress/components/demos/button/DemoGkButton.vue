<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkButtonVariantsExample from './samples/GkButtonVariantsExample.vue'
import variantsSource from './samples/GkButtonVariantsExample.vue?raw'
import GkButtonStylesExample from './samples/GkButtonStylesExample.vue'
import stylesSource from './samples/GkButtonStylesExample.vue?raw'
import GkButtonEdgeExample from './samples/GkButtonEdgeExample.vue'
import edgeSource from './samples/GkButtonEdgeExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Variants"
      description="Primary, secondary, ghost, and danger for hierarchy and emphasis."
      :source="variantsSource"
    >
      <GkButtonVariantsExample />
    </GkDocsExample>

    <GkDocsExample
      title="Slim, stacked, loading, link"
      description="Compact layout, icon column, async submit with loading, and anchor rendering via href."
      :source="stylesSource"
    >
      <GkButtonStylesExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly and disabled"
      description="Readonly keeps visual affordance while blocking clicks; disabled applies inactive styling."
      :source="edgeSource"
    >
      <GkButtonEdgeExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
