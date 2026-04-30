<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample02.vue'
import source from './DemoGkDataTableSample02.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 2: Client search"
    description="Use v-model:search for a quick filter; omit search-keys to search all leaf columns."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
