<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample05.vue'
import source from './DemoGkDataTableSample05.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 5: Expandable rows"
    description="show-expand plus #expanded-row; v-model:expanded tracks open rows by itemValue."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
