<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkTextareaBasicExample from './samples/GkTextareaBasicExample.vue'
import basicSource from './samples/GkTextareaBasicExample.vue?raw'
import GkTextareaTrimExample from './samples/GkTextareaTrimExample.vue'
import trimSource from './samples/GkTextareaTrimExample.vue?raw'
import GkTextareaReadonlyExample from './samples/GkTextareaReadonlyExample.vue'
import readonlySource from './samples/GkTextareaReadonlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="Multiline text inside GkField."
      :source="basicSource"
    >
      <GkTextareaBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Trim on blur"
      description="v-model.trim clears leading/trailing whitespace when the control loses focus."
      :source="trimSource"
    >
      <GkTextareaTrimExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly"
      description="Read-only body with optional field error region for validation messaging."
      :source="readonlySource"
    >
      <GkTextareaReadonlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
