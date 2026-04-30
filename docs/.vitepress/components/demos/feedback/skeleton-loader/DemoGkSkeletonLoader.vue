<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkSkeletonCardExample from './samples/GkSkeletonCardExample.vue'
import cardSource from './samples/GkSkeletonCardExample.vue?raw'
import GkSkeletonSwapExample from './samples/GkSkeletonSwapExample.vue'
import swapSource from './samples/GkSkeletonSwapExample.vue?raw'
import GkSkeletonBoilerplateExample from './samples/GkSkeletonBoilerplateExample.vue'
import boilerplateSource from './samples/GkSkeletonBoilerplateExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Card preset"
      description="Skeleton-only mode with type card and loading true."
      :source="cardSource"
    >
      <GkSkeletonCardExample />
    </GkDocsExample>

    <GkDocsExample
      title="Swap with content"
      description="When a default slot exists, loading toggles between bones and real markup."
      :source="swapSource"
    >
      <GkSkeletonSwapExample />
    </GkDocsExample>

    <GkDocsExample
      title="Boilerplate list row"
      description="boilerplate disables live-region semantics for decorative placeholders."
      :source="boilerplateSource"
    >
      <GkSkeletonBoilerplateExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
