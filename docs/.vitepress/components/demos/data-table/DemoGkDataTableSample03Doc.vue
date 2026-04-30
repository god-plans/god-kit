<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample03.vue'
import source from './DemoGkDataTableSample03.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 3: Multi-sort"
    description="Set multi-sort so each sortable header toggles; order in sortBy is the compare order."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
