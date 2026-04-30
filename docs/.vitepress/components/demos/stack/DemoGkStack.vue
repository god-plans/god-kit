<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkStackColumnExample from './samples/GkStackColumnExample.vue'
import columnSource from './samples/GkStackColumnExample.vue?raw'
import GkStackRowToolbarExample from './samples/GkStackRowToolbarExample.vue'
import rowSource from './samples/GkStackRowToolbarExample.vue?raw'
import GkStackSemanticListExample from './samples/GkStackSemanticListExample.vue'
import listSource from './samples/GkStackSemanticListExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Column"
      description="Default flex column with token gap."
      :source="columnSource"
    >
      <GkStackColumnExample />
    </GkDocsExample>

    <GkDocsExample
      title="Row toolbar"
      description="Row direction with alignment, justify, and wrap."
      :source="rowSource"
    >
      <GkStackRowToolbarExample />
    </GkDocsExample>

    <GkDocsExample
      title="Semantic list"
      description="Use tag=&quot;ul&quot; when the stack represents a real list."
      :source="listSource"
    >
      <GkStackSemanticListExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
