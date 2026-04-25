<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkNavigationDrawerLocationExample from './samples/GkNavigationDrawerLocationExample.vue'
import locationSource from './samples/GkNavigationDrawerLocationExample.vue?raw'
import GkNavigationDrawerRailExample from './samples/GkNavigationDrawerRailExample.vue'
import railSource from './samples/GkNavigationDrawerRailExample.vue?raw'
import GkNavigationDrawerTemporaryExample from './samples/GkNavigationDrawerTemporaryExample.vue'
import temporarySource from './samples/GkNavigationDrawerTemporaryExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Temporary drawer"
      description="Temporary drawers teleport to body and use scrim/Escape/body scroll lock."
      :source="temporarySource"
      best-practice="Add a meaningful aria-label and include a close control inside temporary drawer content."
    >
      <GkNavigationDrawerTemporaryExample />
    </GkDocsExample>

    <GkDocsExample
      title="Rail and expand on hover"
      description="Rail mode uses a collapsed width and can expand while hovered."
      :source="railSource"
      best-practice="In docked app layouts, reserve main content space yourself with grid or margin."
    >
      <GkNavigationDrawerRailExample />
    </GkDocsExample>

    <GkDocsExample
      title="Location"
      description="Use start/end for direction-aware placement."
      :source="locationSource"
      best-practice="Validate location and dir combinations in RTL apps."
    >
      <GkNavigationDrawerLocationExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
