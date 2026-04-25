<script setup lang="ts">
import { computed, reactive } from 'vue'
import { GkButton, GkTooltip } from 'god-kit/vue'
import GkDocsCodeBlock from '../../../GkDocsCodeBlock.vue'

type Placement = 'top' | 'bottom' | 'start' | 'end'

const closeScript = '</' + 'script>'
const options = reactive({
  placement: 'bottom' as Placement,
  text: 'Short help text.',
  interactive: false,
  openOnClick: false,
})
const placements: Placement[] = ['top', 'bottom', 'start', 'end']

const generatedCode = computed(() => `<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
${closeScript}

<template>
  <GkTooltip
    text="${options.text.replace(/"/g, '&quot;')}"
    placement="${options.placement}"${options.interactive ? '\n    interactive' : ''}${options.openOnClick ? '\n    :open-on-hover="false"\n    :open-on-focus="false"\n    open-on-click' : ''}
  >
    <template #activator="{ props }">
      <GkButton type="button" v-bind="props">Help</GkButton>
    </template>
  </GkTooltip>
</template>`)
</script>

<template>
  <section class="playground">
    <div class="controls">
      <label>placement <select v-model="options.placement"><option v-for="p in placements" :key="p">{{ p }}</option></select></label>
      <label>text <input v-model="options.text" /></label>
      <label><input v-model="options.interactive" type="checkbox" /> interactive</label>
      <label><input v-model="options.openOnClick" type="checkbox" /> openOnClick</label>
    </div>
    <GkTooltip
      :text="options.text"
      :placement="options.placement"
      :interactive="options.interactive"
      :open-on-hover="!options.openOnClick"
      :open-on-focus="!options.openOnClick"
      :open-on-click="options.openOnClick"
    >
      <template #activator="{ props }">
        <GkButton type="button" v-bind="props">
          {{ options.openOnClick ? 'Click help' : 'Hover / focus help' }}
        </GkButton>
      </template>
    </GkTooltip>
    <GkDocsCodeBlock :code="generatedCode" />
  </section>
</template>

<style scoped>
.playground,
.controls {
  display: grid;
  gap: var(--gk-space-3);
}

.controls {
  padding: var(--gk-space-4);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
}
</style>
