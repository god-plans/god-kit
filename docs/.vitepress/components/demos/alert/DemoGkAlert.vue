<script setup lang="ts">
import GkDocsExample from '../../GkDocsExample.vue'
import GkAlertVariantsExample from './samples/GkAlertVariantsExample.vue'
import variantsSource from './samples/GkAlertVariantsExample.vue?raw'
import GkAlertTitleBorderExample from './samples/GkAlertTitleBorderExample.vue'
import titleBorderSource from './samples/GkAlertTitleBorderExample.vue?raw'
import GkAlertClosableExample from './samples/GkAlertClosableExample.vue'
import closableSource from './samples/GkAlertClosableExample.vue?raw'
import GkAlertProminentExample from './samples/GkAlertProminentExample.vue'
import prominentSource from './samples/GkAlertProminentExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Variants"
      description="Neutral through danger; use role alert only when the message is urgent."
      :source="variantsSource"
    >
      <GkAlertVariantsExample />
    </GkDocsExample>

    <GkDocsExample
      title="Title, text, and border accent"
      description="Props for heading and body plus a start-edge accent bar."
      :source="titleBorderSource"
    >
      <GkAlertTitleBorderExample />
    </GkDocsExample>

    <GkDocsExample
      title="Closable"
      description="v-model controls visibility after dismiss."
      :source="closableSource"
    >
      <GkAlertClosableExample />
    </GkDocsExample>

    <GkDocsExample
      title="Prominent"
      description="Larger padding and top border for high-visibility callouts."
      :source="prominentSource"
    >
      <GkAlertProminentExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
