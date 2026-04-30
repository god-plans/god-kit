<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkDividerHorizontalExample from './samples/GkDividerHorizontalExample.vue'
import horizontalSource from './samples/GkDividerHorizontalExample.vue?raw'
import GkDividerVerticalExample from './samples/GkDividerVerticalExample.vue'
import verticalSource from './samples/GkDividerVerticalExample.vue?raw'
import GkDividerInContainerExample from './samples/GkDividerInContainerExample.vue'
import containerSource from './samples/GkDividerInContainerExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Horizontal"
      description="Separates stacked blocks."
      :source="horizontalSource"
    >
      <GkDividerHorizontalExample />
    </GkDocsExample>

    <GkDocsExample
      title="Vertical"
      description="Inline flex groups with a vertical separator."
      :source="verticalSource"
    >
      <GkDividerVerticalExample />
    </GkDocsExample>

    <GkDocsExample
      title="Inside container"
      description="Combine with GkContainer for page-width rhythm."
      :source="containerSource"
    >
      <GkDividerInContainerExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
