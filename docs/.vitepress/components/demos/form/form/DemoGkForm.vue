<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkFormAsyncValidationExample from './samples/GkFormAsyncValidationExample.vue'
import asyncSource from './samples/GkFormAsyncValidationExample.vue?raw'
import GkFormDisabledReadonlyExample from './samples/GkFormDisabledReadonlyExample.vue'
import flagsSource from './samples/GkFormDisabledReadonlyExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Async validation"
      description="Pass validate on GkForm; use isValidating for submit button loading."
      :source="asyncSource"
      best-practice="Handle SubmitEventPromise in submit listeners so you react after validation finishes."
    >
      <GkFormAsyncValidationExample />
    </GkDocsExample>

    <GkDocsExample
      title="Disabled & readonly"
      description="Toggle form-level disabled and readonly; slot exposes isDisabled and isReadonly."
      :source="flagsSource"
    >
      <GkFormDisabledReadonlyExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
