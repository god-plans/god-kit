<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkBottomSheetBasicExample from './samples/GkBottomSheetBasicExample.vue'
import basicSource from './samples/GkBottomSheetBasicExample.vue?raw'
import GkBottomSheetInsetExample from './samples/GkBottomSheetInsetExample.vue'
import insetSource from './samples/GkBottomSheetInsetExample.vue?raw'
import GkBottomSheetScrollableExample from './samples/GkBottomSheetScrollableExample.vue'
import scrollableSource from './samples/GkBottomSheetScrollableExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic bottom sheet"
      description="Use a bottom sheet for short mobile-first contextual tasks."
      :source="basicSource"
      best-practice="Provide aria-labelledby and a close button; sheets still need clear escape routes."
    >
      <GkBottomSheetBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Inset sheet"
      description="Inset mode adds viewport edge breathing room."
      :source="insetSource"
      best-practice="Use inset when the sheet contains controls that should not touch the screen edge."
    >
      <GkBottomSheetInsetExample />
    </GkDocsExample>

    <GkDocsExample
      title="Scrollable content"
      description="Constrain tall sheets with maxHeight and scrollable."
      :source="scrollableSource"
      best-practice="For long content, keep the close or primary action reachable inside the scrollable region."
    >
      <GkBottomSheetScrollableExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
