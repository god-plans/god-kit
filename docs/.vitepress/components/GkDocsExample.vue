<script setup lang="ts">
import { ref } from 'vue'
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

const activeTab = ref<'preview' | 'code'>('preview')
</script>

<template>
  <section class="gk-docs-example">
    <div class="gk-docs-example__card">
      <!-- Card header: accent stripe + title + tab toggle -->
      <header class="gk-docs-example__header">
        <div class="gk-docs-example__header-text">
          <h3 class="gk-docs-example__title">{{ title }}</h3>
          <p v-if="description" class="gk-docs-example__description">
            {{ description }}
          </p>
        </div>
        <div class="gk-docs-example__tabs" role="tablist" :aria-label="`${title} view tabs`">
          <button
            role="tab"
            class="gk-docs-example__tab"
            :class="{ 'gk-docs-example__tab--active': activeTab === 'preview' }"
            :aria-selected="activeTab === 'preview'"
            type="button"
            @click="activeTab = 'preview'"
          >
            Preview
          </button>
          <button
            role="tab"
            class="gk-docs-example__tab"
            :class="{ 'gk-docs-example__tab--active': activeTab === 'code' }"
            :aria-selected="activeTab === 'code'"
            type="button"
            @click="activeTab = 'code'"
          >
            Code
          </button>
        </div>
      </header>

      <!-- Preview pane -->
      <div
        v-show="activeTab === 'preview'"
        class="gk-docs-example__preview"
        role="tabpanel"
      >
        <slot />
      </div>

      <!-- Code pane -->
      <div
        v-show="activeTab === 'code'"
        class="gk-docs-example__code"
        role="tabpanel"
      >
        <GkDocsCodeBlock :code="source" :language="language" :collapsed="false" />
      </div>
    </div>

    <!-- Best-practice note below the card -->
    <p v-if="bestPractice" class="gk-docs-example__note">
      <strong>Best practice:</strong> {{ bestPractice }}
    </p>
  </section>
</template>

<style scoped>
.gk-docs-example {
  display: grid;
  gap: var(--gk-space-2);
  margin: var(--gk-space-8) 0;
}

/* ── Card shell ── */
.gk-docs-example__card {
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: var(--gk-radius-lg, 0.75rem);
  border: 1px solid var(--gk-docs-glass-border, rgba(130, 110, 255, 0.18));
  overflow: hidden;
  /* Glass background */
  background: var(--gk-docs-glass-bg, rgba(130, 110, 255, 0.04));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  /* Gradient left accent via box-shadow + border-image trick via outline approach */
  position: relative;
}

/* gradient left-edge accent stripe */
.gk-docs-example__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  bottom: 0;
  background: linear-gradient(180deg, #7c3aed, #4f46e5, #2563eb);
  border-radius: 3px 0 0 3px;
  pointer-events: none;
}

/* ── Header ── */
.gk-docs-example__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gk-space-3);
  padding: var(--gk-space-3) var(--gk-space-4);
  border-bottom: 1px solid var(--gk-docs-glass-border, rgba(130, 110, 255, 0.12));
  background: linear-gradient(
    90deg,
    rgba(124, 58, 237, 0.07) 0%,
    transparent 60%
  );
}

.gk-docs-example__header-text {
  display: grid;
  gap: var(--gk-space-1);
  min-width: 0;
}

.gk-docs-example__title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--gk-color-text);
}

.gk-docs-example__description {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--gk-color-text-muted);
}

/* ── Tab toggle ── */
.gk-docs-example__tabs {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid var(--gk-docs-glass-border, rgba(130, 110, 255, 0.18));
  background: rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
  align-self: flex-start;
}

.gk-docs-example__tab {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--gk-color-text-muted);
  font-family: var(--gk-font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}

.gk-docs-example__tab--active {
  background: linear-gradient(135deg, #7c3aed, #4f46e5, #2563eb);
  color: #fff;
  box-shadow: 0 2px 10px rgba(124, 58, 237, 0.4);
}

.gk-docs-example__tab:not(.gk-docs-example__tab--active):hover {
  color: var(--gk-color-text);
  background: rgba(124, 58, 237, 0.1);
}

.gk-docs-example__tab:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}

/* ── Preview pane ── */
.gk-docs-example__preview {
  padding: var(--gk-space-5) var(--gk-space-4);
  /* Subtle dot-grid background pattern */
  background-image: radial-gradient(
    circle,
    rgba(130, 110, 255, 0.14) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}

/* strip the code block border since card already has one */
.gk-docs-example__code :deep(.gk-docs-code-block) {
  border-radius: 0;
  border: none;
  border-top: none;
}

/* ── Best-practice note ── */
.gk-docs-example__note {
  margin: 0;
  padding: var(--gk-space-2) var(--gk-space-3);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--gk-color-text-muted);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: var(--gk-radius-md);
  background: rgba(124, 58, 237, 0.06);
}

.gk-docs-example__note strong {
  color: #7c3aed;
}
</style>
