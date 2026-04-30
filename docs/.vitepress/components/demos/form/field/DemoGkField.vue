<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkFieldBasicExample from './samples/GkFieldBasicExample.vue'
import basicSource from './samples/GkFieldBasicExample.vue?raw'
import GkFieldErrorExample from './samples/GkFieldErrorExample.vue'
import errorSource from './samples/GkFieldErrorExample.vue?raw'
import GkFieldSrOnlyExample from './samples/GkFieldSrOnlyExample.vue'
import srOnlySource from './samples/GkFieldSrOnlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="Submit runs simple validation and sets the field error string."
      :source="basicSource"
      best-practice="Keep one control per GkField so label and aria-describedby stay unambiguous."
    >
      <GkFieldBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Static error"
      description="Pass :error from your validation layer to show invalid state and the alert region."
      :source="errorSource"
    >
      <GkFieldErrorExample />
    </GkDocsExample>

    <GkDocsExample
      title="Visually hidden label"
      description="label-sr-only keeps a proper label for assistive tech when the visible heading lives elsewhere."
      :source="srOnlySource"
    >
      <GkFieldSrOnlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
