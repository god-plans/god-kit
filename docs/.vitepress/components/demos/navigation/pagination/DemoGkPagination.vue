<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkPaginationBasicExample from './samples/GkPaginationBasicExample.vue'
import basicSource from './samples/GkPaginationBasicExample.vue?raw'
import GkPaginationRtlExample from './samples/GkPaginationRtlExample.vue'
import rtlSource from './samples/GkPaginationRtlExample.vue?raw'
import GkPaginationDisabledExample from './samples/GkPaginationDisabledExample.vue'
import disabledSource from './samples/GkPaginationDisabledExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="v-model page, total pages, visible window, and optional first/last controls."
      :source="basicSource"
    >
      <GkPaginationBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="RTL & active color"
      description="Right-to-left swaps control direction; active-color sets ink on the filled page button."
      :source="rtlSource"
    >
      <GkPaginationRtlExample />
    </GkDocsExample>

    <GkDocsExample
      title="Disabled"
      description="Single-page or loading states can disable the whole nav; set aria-label when context matters."
      :source="disabledSource"
    >
      <GkPaginationDisabledExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
