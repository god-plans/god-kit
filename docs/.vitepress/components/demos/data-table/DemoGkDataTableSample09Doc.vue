<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import Demo from './DemoGkDataTableSample09.vue'
import source from './DemoGkDataTableSample09.vue?raw'
</script>

<template>
  <GkDocsExample
    title="Sample 9: Server mode (simulated)"
    description="mode=&quot;server&quot; with items slice and items-length; loading for fetch UX."
    :source="source"
  >
    <Demo />
  </GkDocsExample>
</template>
