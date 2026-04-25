<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'
import GkDocsCodeBlock from '../../../GkDocsCodeBlock.vue'

const open = ref(false)
const closeScript = '</' + 'script>'
const options = reactive({
  fullscreen: false,
  scrollable: false,
  persistent: false,
  showScrim: true,
  width: '',
  maxWidth: '28rem',
})

const generatedCode = computed(() => `<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const open = ref(false)
${closeScript}

<template>
  <GkButton type="button" @click="open = true">Open dialog</GkButton>
  <GkDialog
    v-model="open"${options.fullscreen ? '\n    fullscreen' : ''}${options.scrollable ? '\n    scrollable' : ''}${options.persistent ? '\n    persistent' : ''}${!options.showScrim ? '\n    :show-scrim="false"' : ''}${options.width ? `\n    width="${options.width}"` : ''}${options.maxWidth ? `\n    max-width="${options.maxWidth}"` : ''}
    aria-labelledby="dialog-title"
  >
    <h2 id="dialog-title">Dialog title</h2>
    <p>Dialog content.</p>
    <GkButton type="button" @click="open = false">Close</GkButton>
  </GkDialog>
</template>`)
</script>

<template>
  <section class="playground">
    <div class="controls">
      <label><input v-model="options.fullscreen" type="checkbox" /> fullscreen</label>
      <label><input v-model="options.scrollable" type="checkbox" /> scrollable</label>
      <label><input v-model="options.persistent" type="checkbox" /> persistent</label>
      <label><input v-model="options.showScrim" type="checkbox" /> showScrim</label>
      <label>width <input v-model="options.width" placeholder="420px" /></label>
      <label>maxWidth <input v-model="options.maxWidth" placeholder="28rem" /></label>
      <GkButton type="button" size="sm" @click="open = true">Preview</GkButton>
    </div>
    <GkDialog
      v-model="open"
      :fullscreen="options.fullscreen"
      :scrollable="options.scrollable"
      :persistent="options.persistent"
      :show-scrim="options.showScrim"
      :width="options.width || undefined"
      :max-width="options.maxWidth || undefined"
      aria-labelledby="dialog-play-title"
    >
      <h2 id="dialog-play-title">Dialog title</h2>
      <p v-for="n in options.scrollable ? 8 : 1" :key="n">Dialog content {{ n }}.</p>
      <GkButton type="button" @click="open = false">Close</GkButton>
    </GkDialog>
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: var(--gk-space-4);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
}

.controls label {
  display: flex;
  gap: var(--gk-space-2);
  align-items: center;
  font-size: var(--gk-font-size-sm);
}

.controls input:not([type='checkbox']) {
  width: 100%;
}
</style>
