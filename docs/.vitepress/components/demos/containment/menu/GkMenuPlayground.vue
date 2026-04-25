<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { GkButton, GkMenu } from 'god-kit/vue'
import GkDocsCodeBlock from '../../../GkDocsCodeBlock.vue'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

const open = ref(false)
const closeScript = '</' + 'script>'
const options = reactive({
  placement: 'bottom-start' as Placement,
  persistent: false,
  showScrim: false,
  closeOnContentClick: true,
})
const placements: Placement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end']

const generatedCode = computed(() => `<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkMenu } from 'god-kit/vue'

const open = ref(false)
${closeScript}

<template>
  <GkMenu
    v-model="open"
    placement="${options.placement}"${options.persistent ? '\n    persistent' : ''}${options.showScrim ? '\n    show-scrim' : ''}${!options.closeOnContentClick ? '\n    :close-on-content-click="false"' : ''}
  >
    <template #activator="{ props }">
      <GkButton type="button" v-bind="props">Menu</GkButton>
    </template>
    <button type="button" role="menuitem">Action</button>
  </GkMenu>
</template>`)
</script>

<template>
  <section class="playground">
    <div class="controls">
      <label>placement <select v-model="options.placement"><option v-for="p in placements" :key="p">{{ p }}</option></select></label>
      <label><input v-model="options.persistent" type="checkbox" /> persistent</label>
      <label><input v-model="options.showScrim" type="checkbox" /> showScrim</label>
      <label><input v-model="options.closeOnContentClick" type="checkbox" /> closeOnContentClick</label>
    </div>
    <GkMenu
      v-model="open"
      :placement="options.placement"
      :persistent="options.persistent"
      :show-scrim="options.showScrim"
      :close-on-content-click="options.closeOnContentClick"
    >
      <template #activator="{ props }">
        <GkButton type="button" v-bind="props">Preview menu</GkButton>
      </template>
      <button type="button" class="item" role="menuitem">Action</button>
    </GkMenu>
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

.item {
  display: block;
  width: 100%;
  padding: var(--gk-space-2) var(--gk-space-3);
  border: 0;
  background: transparent;
  color: inherit;
  text-align: start;
}
</style>
