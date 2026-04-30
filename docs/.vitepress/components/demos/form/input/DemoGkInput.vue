<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkInputBasicExample from './samples/GkInputBasicExample.vue'
import basicSource from './samples/GkInputBasicExample.vue?raw'
import GkInputPrefixCounterExample from './samples/GkInputPrefixCounterExample.vue'
import prefixCounterSource from './samples/GkInputPrefixCounterExample.vue?raw'
import GkInputEdgeCaseExample from './samples/GkInputEdgeCaseExample.vue'
import edgeCaseSource from './samples/GkInputEdgeCaseExample.vue?raw'
</script>

<template>
  <div class="gk-doc-containment-demo">
    <GkDocsExample
      title="Basic"
      description="Minimal GkField + GkInput with v-model."
      :source="basicSource"
      best-practice="Always wrap in GkField when you have a visible label so id and aria-describedby stay aligned."
    >
      <GkInputBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Prefix & counter"
      description="Static prefix text and a character counter; persistent counter stays visible."
      :source="prefixCounterSource"
      best-practice="Use v-model.trim on text-like types when you want blur-time trimming."
    >
      <GkInputPrefixCounterExample />
    </GkDocsExample>

    <GkDocsExample
      title="Readonly, suffix, and disabled search"
      description="Readonly input with suffix; disabled search with number + trim modifiers."
      :source="edgeCaseSource"
      best-practice="For standalone inputs, pass ariaLabel so the control has an accessible name."
    >
      <GkInputEdgeCaseExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-containment-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
