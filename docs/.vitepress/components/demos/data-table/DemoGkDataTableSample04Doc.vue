<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample04.vue'
import source from './DemoGkDataTableSample04.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 4: Row selection"
    description="show-select and v-model:selected; use item-selectable to skip rows (e.g. read-only)."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
