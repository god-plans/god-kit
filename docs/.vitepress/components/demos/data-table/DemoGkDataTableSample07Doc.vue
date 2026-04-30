<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample07.vue'
import source from './DemoGkDataTableSample07.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 7: Nested headers and fixed column"
    description="children on headers for grouped titles; fixed on leaf columns for sticky edges."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
