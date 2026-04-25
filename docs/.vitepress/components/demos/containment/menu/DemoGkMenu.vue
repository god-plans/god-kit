<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkMenuBasicExample from './samples/GkMenuBasicExample.vue'
import basicSource from './samples/GkMenuBasicExample.vue?raw'
import GkMenuPersistentExample from './samples/GkMenuPersistentExample.vue'
import persistentSource from './samples/GkMenuPersistentExample.vue?raw'
import GkMenuPlacementExample from './samples/GkMenuPlacementExample.vue'
import placementSource from './samples/GkMenuPlacementExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic menu"
      description="Bind activator props to the trigger and use direct menu item children."
      :source="basicSource"
      best-practice="Use role='menuitem' on direct actionable children and only stop propagation when an item should keep the menu open."
    >
      <GkMenuBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Placement and offset"
      description="Use placement to align the menu relative to its activator."
      :source="placementSource"
      best-practice="Prefer start/end placements that match the trigger edge; use offset for visual spacing only."
    >
      <GkMenuPlacementExample />
    </GkDocsExample>

    <GkDocsExample
      title="Persistent menu"
      description="Persistent menus require an explicit close action."
      :source="persistentSource"
      best-practice="Use persistent sparingly; short action menus should normally dismiss on outside click or Escape."
    >
      <GkMenuPersistentExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
