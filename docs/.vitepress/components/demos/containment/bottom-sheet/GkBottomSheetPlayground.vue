<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'
import GkDocsCodeBlock from '../../../GkDocsCodeBlock.vue'

const open = ref(false)
const closeScript = '</' + 'script>'
const options = reactive({
  inset: false,
  scrollable: true,
  persistent: false,
  showScrim: true,
  maxHeight: '420px',
})

const generatedCode = computed(() => `<script setup lang="ts">
import { ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'

const open = ref(false)
${closeScript}

<template>
  <GkButton type="button" @click="open = true">Open sheet</GkButton>
  <GkBottomSheet
    v-model="open"${options.inset ? '\n    inset' : ''}${options.scrollable ? '\n    scrollable' : ''}${options.persistent ? '\n    persistent' : ''}${!options.showScrim ? '\n    :show-scrim="false"' : ''}${options.maxHeight ? `\n    max-height="${options.maxHeight}"` : ''}
    aria-labelledby="sheet-title"
  >
    <h2 id="sheet-title">Sheet title</h2>
    <p>Sheet content.</p>
  </GkBottomSheet>
</template>`)
</script>

<template>
  <section class="playground">
    <div class="controls">
      <label><input v-model="options.inset" type="checkbox" /> inset</label>
      <label><input v-model="options.scrollable" type="checkbox" /> scrollable</label>
      <label><input v-model="options.persistent" type="checkbox" /> persistent</label>
      <label><input v-model="options.showScrim" type="checkbox" /> showScrim</label>
      <label>maxHeight <input v-model="options.maxHeight" /></label>
      <GkButton type="button" size="sm" @click="open = true">Preview</GkButton>
    </div>
    <GkBottomSheet
      v-model="open"
      :inset="options.inset"
      :scrollable="options.scrollable"
      :persistent="options.persistent"
      :show-scrim="options.showScrim"
      :max-height="options.maxHeight || undefined"
      aria-labelledby="sheet-play-title"
    >
      <h2 id="sheet-play-title">Sheet title</h2>
      <p v-for="n in 6" :key="n">Sheet content {{ n }}.</p>
      <GkButton type="button" @click="open = false">Close</GkButton>
    </GkBottomSheet>
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
</style>
