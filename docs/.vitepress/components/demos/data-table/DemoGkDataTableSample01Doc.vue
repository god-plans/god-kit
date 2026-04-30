<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample01.vue'
import source from './DemoGkDataTableSample01.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 1: Basic client table"
    description="Use when you only need columns, local sort, and paging."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
