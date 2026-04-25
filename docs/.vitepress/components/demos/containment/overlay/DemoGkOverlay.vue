<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkOverlayBasicExample from './samples/GkOverlayBasicExample.vue'
import basicSource from './samples/GkOverlayBasicExample.vue?raw'
import GkOverlayPersistentExample from './samples/GkOverlayPersistentExample.vue'
import persistentSource from './samples/GkOverlayPersistentExample.vue?raw'
import GkOverlayWidePanelExample from './samples/GkOverlayWidePanelExample.vue'
import widePanelSource from './samples/GkOverlayWidePanelExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic overlay"
      description="Use GkOverlay when you want custom surface markup but standard scrim, Escape, focus restore, and body scroll lock."
      :source="basicSource"
      best-practice="Always connect aria-labelledby and aria-describedby to visible content when the overlay behaves like a dialog."
    >
      <GkOverlayBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Persistent overlay"
      description="Persistent mode prevents scrim and Escape dismiss."
      :source="persistentSource"
      best-practice="Persistent overlays must include an explicit close or completion action inside the panel."
    >
      <GkOverlayPersistentExample />
    </GkDocsExample>

    <GkDocsExample
      title="Custom panel width"
      description="Use contentMaxWidth for wide custom panels while keeping overlay behavior consistent."
      :source="widePanelSource"
      best-practice="Keep layout styling in your panel; let GkOverlay own only the layer, scrim, focus, and scroll-lock mechanics."
    >
      <GkOverlayWidePanelExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
