<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkSelectSingleExample from './samples/GkSelectSingleExample.vue'
import singleSource from './samples/GkSelectSingleExample.vue?raw'
import GkSelectMultipleExample from './samples/GkSelectMultipleExample.vue'
import multipleSource from './samples/GkSelectMultipleExample.vue?raw'
import GkSelectReadonlyExample from './samples/GkSelectReadonlyExample.vue'
import readonlySource from './samples/GkSelectReadonlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Single select"
      description="Options array and placeholder inside GkField."
      :source="singleSource"
    >
      <GkSelectSingleExample />
    </GkDocsExample>

    <GkDocsExample
      title="Multiple"
      description="Array v-model and native size for visible rows."
      :source="multipleSource"
    >
      <GkSelectMultipleExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly"
      description="Readonly select reverts changes and sets aria-readonly."
      :source="readonlySource"
    >
      <GkSelectReadonlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
