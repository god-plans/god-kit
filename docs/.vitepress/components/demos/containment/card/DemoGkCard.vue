<script setup lang="ts">
import { ref } from 'vue'
import {
  GkButton,
  GkCard,
  GkCardActions,
  GkCardText,
} from 'god-kit/vue'

const loading = ref(false)
const clickCount = ref(0)
</script>

<template>
  <div class="gk-doc-card-demo">
    <p class="gk-doc-card-demo__section-title">
      1. Basic
    </p>
    <GkCard :max-width="400">
      <p class="gk-doc-card-demo__p">
        Default <strong>elevated</strong> surface with design-token border and shadow. Use
        the default slot for any body content.
      </p>
    </GkCard>

    <p class="gk-doc-card-demo__section-title">
      2. Convenience title, subtitle, and text
    </p>
    <GkCard
      :max-width="400"
      title="Invoice #1042"
      subtitle="Acme Corp · due in 3 days"
      text="The amount is ready for review. You can add more detail in the main slot below."
    >
      <p class="gk-doc-card-demo__p gk-doc-card-demo__p--tight">
        Extra paragraph in the default slot.
      </p>
    </GkCard>

    <p class="gk-doc-card-demo__section-title">
      3. Image and actions
    </p>
    <GkCard
      :max-width="400"
      image="https://picsum.photos/seed/gkkit-card/800/400"
      title="Landscape"
      subtitle="Picsum sample media"
    >
      <GkCardText>
        Top media uses <code>object-fit: cover</code> and a token min-height. Use
        <strong>GkCardActions</strong> for a right-aligned action row.
      </GkCardText>
      <template #actions>
        <GkCardActions>
          <GkButton type="button" variant="secondary" size="sm" slim>Later</GkButton>
          <GkButton type="button" size="sm" slim>Open</GkButton>
        </GkCardActions>
      </template>
    </GkCard>

    <p class="gk-doc-card-demo__section-title">
      4. Prepend and append slots
    </p>
    <GkCard :max-width="400">
      <template #prepend>
        <div class="gk-doc-card-demo__dot" aria-hidden="true" />
      </template>
      <template #title>
        Custom title slot
      </template>
      <template #subtitle>
        With a color chip in prepend
      </template>
      <template #append>
        <span class="gk-doc-card-demo__badge">New</span>
      </template>
      <p class="gk-doc-card-demo__p gk-doc-card-demo__p--tight">
        Use <strong>#prepend</strong> / <strong>#append</strong> for icons, avatars, or
        status chips. <strong>prependAvatar</strong> / <strong>appendAvatar</strong> are
        also available as URL props on <strong>GkCard</strong>.
      </p>
    </GkCard>

    <p class="gk-doc-card-demo__section-title">
      5. Link, states, and variants
    </p>
    <div class="gk-doc-card-demo__row gk-doc-card-demo__row--top">
      <GkCard
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        :max-width="220"
        title="As a link"
        text="Root is an anchor; opens in a new tab."
      />
      <div class="gk-doc-card-demo__load-block">
        <GkButton
          type="button"
          size="sm"
          variant="secondary"
          @click="loading = !loading"
        >
          {{ loading ? 'Stop' : 'Start' }} loading
        </GkButton>
        <GkCard
          variant="outlined"
          :loading="loading"
          :max-width="220"
          title="Loading state"
          text="Overlay uses the design-token loader background. The toggle sits outside the card to avoid nested interactive controls."
        />
      </div>
      <GkCard
        variant="plain"
        clickable
        :max-width="220"
        title="Clickable surface"
        :text="`Role is button; clicks (keyboard or pointer): ${clickCount}`"
        @click="clickCount++"
      />
      <GkCard
        variant="tonal"
        flat
        disabled
        :max-width="220"
        title="Disabled + tonal"
        text="Tonal background with flat (no lift). Not interactive."
      />
    </div>
  </div>
</template>

<style scoped>
.gk-doc-card-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-5);
  align-items: flex-start;
}

.gk-doc-card-demo__section-title {
  margin: 0;
  font-size: var(--gk-text-body-s-size);
  font-weight: 600;
  color: var(--gk-color-text-muted);
}

.gk-doc-card-demo__p {
  margin: 0;
  font-size: var(--gk-text-body-s-size);
  line-height: var(--gk-line-height-normal);
}

.gk-doc-card-demo__p--tight {
  margin-top: var(--gk-space-2);
}

.gk-doc-card-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-4);
  align-items: flex-start;
  width: 100%;
}

.gk-doc-card-demo__row--top {
  align-items: flex-start;
}

.gk-doc-card-demo__load-block {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  align-items: flex-start;
}

.gk-doc-card-demo__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--gk-color-primary);
  margin-top: 0.35rem;
}

.gk-doc-card-demo__badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: var(--gk-text-body-xs-size);
  font-weight: 600;
  line-height: var(--gk-text-body-xs-line-height);
  color: var(--gk-color-on-primary);
  background: var(--gk-color-primary);
  border-radius: var(--gk-radius-sm);
}
</style>
