<script setup lang="ts">
import { computed, useSlots } from 'vue'
import GkCardSubtitle from './GkCardSubtitle.vue'
import GkCardTitle from './GkCardTitle.vue'

const props = withDefaults(
  defineProps<{
    title?: string | number
    subtitle?: string | number
    prependAvatar?: string
    appendAvatar?: string
    density?: 'comfortable' | 'compact'
  }>(),
  { density: 'comfortable' }
)

const slots = useSlots()

const hasPrepend = computed(
  () => !!(slots.prepend || props.prependAvatar)
)
const hasAppend = computed(
  () => !!(slots.append || props.appendAvatar)
)
const hasTitle = computed(
  () => props.title != null || !!slots.title
)
const hasSubtitle = computed(
  () => props.subtitle != null || !!slots.subtitle
)
</script>

<template>
  <div
    class="gk-card-item"
    :class="{
      'gk-card-item--compact': density === 'compact',
    }"
  >
    <div v-if="hasPrepend" class="gk-card-item__prepend">
      <slot name="prepend">
        <img
          v-if="prependAvatar"
          :src="prependAvatar"
          alt=""
          class="gk-card-item__avatar"
          width="40"
          height="40"
        />
      </slot>
    </div>

    <div class="gk-card-item__content">
      <GkCardTitle v-if="hasTitle">
        <slot name="title">{{
          title != null ? String(title) : undefined
        }}</slot>
      </GkCardTitle>
      <GkCardSubtitle v-if="hasSubtitle">
        <slot name="subtitle">{{
          subtitle != null ? String(subtitle) : undefined
        }}</slot>
      </GkCardSubtitle>
      <slot />
    </div>

    <div v-if="hasAppend" class="gk-card-item__append">
      <slot name="append">
        <img
          v-if="appendAvatar"
          :src="appendAvatar"
          alt=""
          class="gk-card-item__avatar"
          width="40"
          height="40"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.gk-card-item {
  display: flex;
  align-items: flex-start;
  gap: var(--gk-space-3);
  box-sizing: border-box;
  padding: 0 0 var(--gk-space-3);
}

.gk-card-item--compact {
  gap: var(--gk-space-2);
  padding-bottom: var(--gk-space-2);
}

.gk-card-item__prepend,
.gk-card-item__append {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
}

.gk-card-item__content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-1);
}

.gk-card-item__avatar {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--gk-color-border);
}
</style>
