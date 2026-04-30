<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkRadioBasicExample from './samples/GkRadioBasicExample.vue'
import basicSource from './samples/GkRadioBasicExample.vue?raw'
import GkRadioDisabledExample from './samples/GkRadioDisabledExample.vue'
import disabledSource from './samples/GkRadioDisabledExample.vue?raw'
import GkRadioReadonlyExample from './samples/GkRadioReadonlyExample.vue'
import readonlySource from './samples/GkRadioReadonlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="GkRadioGroup owns v-model; children declare value."
      :source="basicSource"
      best-practice="Give the group an aria-label or visible heading for context."
    >
      <GkRadioBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Disabled group"
      description="Pass disabled on the group to lock every option."
      :source="disabledSource"
    >
      <GkRadioDisabledExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly review"
      description="Readonly prevents changing the selection while preserving announced values."
      :source="readonlySource"
    >
      <GkRadioReadonlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
