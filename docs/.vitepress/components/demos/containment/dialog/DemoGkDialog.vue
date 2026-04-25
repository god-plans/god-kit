<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkDialogBasicExample from './samples/GkDialogBasicExample.vue'
import basicSource from './samples/GkDialogBasicExample.vue?raw'
import GkDialogFullscreenExample from './samples/GkDialogFullscreenExample.vue'
import fullscreenSource from './samples/GkDialogFullscreenExample.vue?raw'
import GkDialogScrollableExample from './samples/GkDialogScrollableExample.vue'
import scrollableSource from './samples/GkDialogScrollableExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Standard dialog"
      description="Compose GkDialog with a button and v-model."
      :source="basicSource"
      best-practice="Always provide aria-labelledby and keep an explicit close or completion action inside the dialog."
    >
      <GkDialogBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Scrollable dialog"
      description="Use scrollable when body content can exceed the available height."
      :source="scrollableSource"
      best-practice="Keep primary actions reachable and avoid putting critical controls below long scrolling content."
    >
      <GkDialogScrollableExample />
    </GkDocsExample>

    <GkDocsExample
      title="Fullscreen dialog"
      description="Use fullscreen for immersive or mobile-first flows."
      :source="fullscreenSource"
      best-practice="Fullscreen dialogs should still include a visible heading and close affordance."
    >
      <GkDialogFullscreenExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
