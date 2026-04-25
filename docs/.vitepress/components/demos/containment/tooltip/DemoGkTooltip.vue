<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkTooltipBasicExample from './samples/GkTooltipBasicExample.vue'
import basicSource from './samples/GkTooltipBasicExample.vue?raw'
import GkTooltipClickExample from './samples/GkTooltipClickExample.vue'
import clickSource from './samples/GkTooltipClickExample.vue?raw'
import GkTooltipInteractiveExample from './samples/GkTooltipInteractiveExample.vue'
import interactiveSource from './samples/GkTooltipInteractiveExample.vue?raw'
import GkTooltipPlacementExample from './samples/GkTooltipPlacementExample.vue'
import placementSource from './samples/GkTooltipPlacementExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Hover and focus"
      description="Default tooltips open on hover and focus."
      :source="basicSource"
      best-practice="Always bind activator props so aria-describedby and keyboard triggers stay connected."
    >
      <GkTooltipBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Placement"
      description="Choose an edge relative to the activator."
      :source="placementSource"
      best-practice="Keep tooltips close to the control they describe and prefer short text."
    >
      <GkTooltipPlacementExample />
    </GkDocsExample>

    <GkDocsExample
      title="Interactive tooltip"
      description="Interactive mode lets the pointer enter the tooltip panel."
      :source="interactiveSource"
      best-practice="Use interactive only when the tooltip has content users must hover into; otherwise keep tooltips passive."
    >
      <GkTooltipInteractiveExample />
    </GkDocsExample>

    <GkDocsExample
      title="Open on click"
      description="Use click-triggered tooltips for touch-friendly hints."
      :source="clickSource"
      best-practice="For essential workflow content, prefer a menu, popover, or dialog over a tooltip."
    >
      <GkTooltipClickExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
