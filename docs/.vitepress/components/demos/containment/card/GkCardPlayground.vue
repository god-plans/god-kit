<script setup lang="ts">
import { computed, reactive } from 'vue'
import { GkButton, GkCard } from 'god-kit/vue'
import GkDocsCodeBlock from '../../../GkDocsCodeBlock.vue'

type CardVariant = 'elevated' | 'outlined' | 'tonal' | 'plain'
type CardDensity = 'comfortable' | 'compact'

const closeScript = '</' + 'script>'

const options = reactive({
  variant: 'elevated' as CardVariant,
  density: 'comfortable' as CardDensity,
  title: 'Editable GkCard',
  subtitle: 'Generated code updates as you edit',
  text: 'Use this playground to learn the core props without a full SFC compiler.',
  image: '',
  href: '',
  flat: false,
  hover: true,
  loading: false,
  disabled: false,
  rounded: true,
  clickable: false,
})

const variants: CardVariant[] = ['elevated', 'outlined', 'tonal', 'plain']
const densities: CardDensity[] = ['comfortable', 'compact']

function resetOptions() {
  options.variant = 'elevated'
  options.density = 'comfortable'
  options.title = 'Editable GkCard'
  options.subtitle = 'Generated code updates as you edit'
  options.text = 'Use this playground to learn the core props without a full SFC compiler.'
  options.image = ''
  options.href = ''
  options.flat = false
  options.hover = true
  options.loading = false
  options.disabled = false
  options.rounded = true
  options.clickable = false
}

function q(v: string) {
  return v.replace(/"/g, '&quot;')
}

function attr(name: string, value: string | undefined) {
  return value ? `\n    ${name}="${q(value)}"` : ''
}

function boolAttr(name: string, enabled: boolean) {
  return enabled ? `\n    ${name}` : ''
}

const generatedCode = computed(() => {
  const cardAttrs = [
    attr('variant', options.variant !== 'elevated' ? options.variant : undefined),
    attr('density', options.density !== 'comfortable' ? options.density : undefined),
    attr('title', options.title),
    attr('subtitle', options.subtitle),
    attr('text', options.text),
    attr('image', options.image),
    attr('href', options.href),
    options.href ? attr('target', '_blank') : '',
    options.href ? attr('rel', 'noopener noreferrer') : '',
    boolAttr('flat', options.flat),
    boolAttr('hover', options.hover),
    boolAttr('loading', options.loading),
    boolAttr('disabled', options.disabled),
    boolAttr(':rounded="false"', !options.rounded),
    boolAttr('clickable', options.clickable && !options.href),
    '\n    :max-width="360"',
  ].join('')

  return `<script setup lang="ts">
import { GkCard } from 'god-kit/vue'
${closeScript}

<template>
  <GkCard${cardAttrs}
  />
</template>`
})
</script>

<template>
  <section class="gk-card-playground">
    <div class="gk-card-playground__controls" aria-label="GkCard playground controls">
      <label class="gk-card-playground__field">
        <span>Variant</span>
        <select v-model="options.variant">
          <option v-for="v in variants" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>

      <label class="gk-card-playground__field">
        <span>Density</span>
        <select v-model="options.density">
          <option v-for="d in densities" :key="d" :value="d">{{ d }}</option>
        </select>
      </label>

      <label class="gk-card-playground__field">
        <span>Title</span>
        <input v-model="options.title" type="text" />
      </label>

      <label class="gk-card-playground__field">
        <span>Subtitle</span>
        <input v-model="options.subtitle" type="text" />
      </label>

      <label class="gk-card-playground__field gk-card-playground__field--wide">
        <span>Text</span>
        <textarea v-model="options.text" rows="3" />
      </label>

      <label class="gk-card-playground__field">
        <span>Image URL</span>
        <input v-model="options.image" type="url" placeholder="https://..." />
      </label>

      <label class="gk-card-playground__field">
        <span>Href</span>
        <input v-model="options.href" type="url" placeholder="https://..." />
      </label>

      <div class="gk-card-playground__checks">
        <label><input v-model="options.flat" type="checkbox" /> flat</label>
        <label><input v-model="options.hover" type="checkbox" /> hover</label>
        <label><input v-model="options.loading" type="checkbox" /> loading</label>
        <label><input v-model="options.disabled" type="checkbox" /> disabled</label>
        <label><input v-model="options.rounded" type="checkbox" /> rounded</label>
        <label>
          <input v-model="options.clickable" :disabled="!!options.href" type="checkbox" />
          clickable
        </label>
      </div>

      <GkButton type="button" variant="secondary" size="sm" @click="resetOptions">
        Reset options
      </GkButton>
    </div>

    <div class="gk-card-playground__preview">
      <GkCard
        :variant="options.variant"
        :density="options.density"
        :title="options.title"
        :subtitle="options.subtitle"
        :text="options.text"
        :image="options.image || undefined"
        :href="options.href || undefined"
        :target="options.href ? '_blank' : undefined"
        :rel="options.href ? 'noopener noreferrer' : undefined"
        :flat="options.flat"
        :hover="options.hover"
        :loading="options.loading"
        :disabled="options.disabled"
        :rounded="options.rounded"
        :clickable="options.clickable && !options.href"
        :max-width="360"
      />
    </div>

    <GkDocsCodeBlock :code="generatedCode" />
  </section>
</template>

<style scoped>
.gk-card-playground {
  display: grid;
  gap: var(--gk-space-4);
}

.gk-card-playground__controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gk-space-3);
  padding: var(--gk-space-4);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-surface);
}

.gk-card-playground__field {
  display: grid;
  gap: var(--gk-space-1);
  font-size: var(--gk-text-body-s-size);
  color: var(--gk-color-text-muted);
}

.gk-card-playground__field--wide {
  grid-column: 1 / -1;
}

.gk-card-playground__field span {
  font-weight: 600;
  color: var(--gk-color-text);
}

.gk-card-playground__field input,
.gk-card-playground__field select,
.gk-card-playground__field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-sm);
  background: var(--gk-color-surface);
  color: var(--gk-color-text);
  font: inherit;
  padding: 0.5rem 0.625rem;
}

.gk-card-playground__field textarea {
  resize: vertical;
}

.gk-card-playground__checks {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  font-size: var(--gk-text-body-s-size);
  color: var(--gk-color-text);
}

.gk-card-playground__checks label {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-1);
}

.gk-card-playground__preview {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--gk-space-4);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  background: color-mix(in srgb, var(--gk-color-primary) 4%, var(--gk-color-surface));
}

@media (max-width: 700px) {
  .gk-card-playground__controls {
    grid-template-columns: 1fr;
  }
}
</style>
