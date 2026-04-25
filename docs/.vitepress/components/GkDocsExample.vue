<script setup lang="ts">
import GkDocsCodeBlock from './GkDocsCodeBlock.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    source: string
    bestPractice?: string
    language?: string
  }>(),
  {
    language: 'vue',
  }
)
</script>

<template>
  <section class="gk-docs-example">
    <header class="gk-docs-example__header">
      <h3 class="gk-docs-example__title">{{ title }}</h3>
      <p v-if="description" class="gk-docs-example__description">
        {{ description }}
      </p>
      <p v-if="bestPractice" class="gk-docs-example__note">
        <strong>Best practice:</strong> {{ bestPractice }}
      </p>
    </header>

    <div class="gk-docs-example__preview">
      <slot />
    </div>

    <GkDocsCodeBlock :code="source" :language="language" />
  </section>
</template>

<style scoped>
.gk-docs-example {
  display: grid;
  gap: var(--gk-space-3);
  margin: var(--gk-space-6) 0;
}

.gk-docs-example__header {
  display: grid;
  gap: var(--gk-space-2);
}

.gk-docs-example__title {
  margin: 0;
  font-size: var(--gk-text-heading-s-size);
  font-weight: var(--gk-text-heading-s-weight);
  line-height: var(--gk-text-heading-s-line-height);
  color: var(--gk-color-text);
}

.gk-docs-example__description,
.gk-docs-example__note {
  margin: 0;
  max-width: 52rem;
  font-size: var(--gk-text-body-s-size);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}

.gk-docs-example__note {
  padding: var(--gk-space-2) var(--gk-space-3);
  border: 1px solid
    color-mix(in srgb, var(--gk-color-primary) 22%, var(--gk-color-border));
  border-radius: var(--gk-radius-md);
  background: color-mix(in srgb, var(--gk-color-primary) 7%, transparent);
}

.gk-docs-example__note strong {
  color: var(--gk-color-text);
}

.gk-docs-example__preview {
  padding: var(--gk-space-4);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-surface);
  box-shadow: var(--gk-elevation-1);
}
</style>
