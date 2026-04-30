<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkSnackbarDeclarativeExample from './samples/GkSnackbarDeclarativeExample.vue'
import declarativeSource from './samples/GkSnackbarDeclarativeExample.vue?raw'
import GkSnackbarProgrammaticExample from './samples/GkSnackbarProgrammaticExample.vue'
import programmaticSource from './samples/GkSnackbarProgrammaticExample.vue?raw'
import GkSnackbarPersistentExample from './samples/GkSnackbarPersistentExample.vue'
import persistentSource from './samples/GkSnackbarPersistentExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Declarative"
      description="v-model, timer strip, placement, and action slot. Mount one GkSnackbarHost at app root if you also use pushGkSnackbar."
      :source="declarativeSource"
    >
      <GkSnackbarDeclarativeExample />
    </GkDocsExample>

    <GkDocsExample
      title="Programmatic queue"
      description="GkSnackbarHost plus pushGkSnackbar for toasts from non-template code."
      :source="programmaticSource"
      best-practice="Keep a single host near the app root so stacking and z-index stay consistent."
    >
      <GkSnackbarProgrammaticExample />
    </GkDocsExample>

    <GkDocsExample
      title="Manual dismiss"
      description="timeout -1 with actions; use isActive from the actions slot props to close."
      :source="persistentSource"
    >
      <GkSnackbarPersistentExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
