<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkCheckboxBasicExample from './samples/GkCheckboxBasicExample.vue'
import basicSource from './samples/GkCheckboxBasicExample.vue?raw'
import GkCheckboxIndeterminateExample from './samples/GkCheckboxIndeterminateExample.vue'
import indeterminateSource from './samples/GkCheckboxIndeterminateExample.vue?raw'
import GkCheckboxReadonlyExample from './samples/GkCheckboxReadonlyExample.vue'
import readonlySource from './samples/GkCheckboxReadonlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="Boolean v-model with a visible label."
      :source="basicSource"
    >
      <GkCheckboxBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Native value & indeterminate"
      description="Optional value attribute; indeterminate is cleared after the user toggles."
      :source="indeterminateSource"
      best-practice="Use indeterminate only for partial selection, not as a third persistent state."
    >
      <GkCheckboxIndeterminateExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly"
      description="Readonly prevents toggling while keeping focus styles."
      :source="readonlySource"
    >
      <GkCheckboxReadonlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
