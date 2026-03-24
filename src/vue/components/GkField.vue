<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { GK_FIELD } from '../../injection'

const props = defineProps<{
  label?: string
  error?: string
  /** Visually hide label but keep for screen readers */
  labelSrOnly?: boolean
}>()

const baseId = useId()
const inputId = `${baseId}-control`
const errorId = `${baseId}-error`

const errorMessage = computed(() => props.error)

provide(GK_FIELD, {
  inputId,
  errorId,
  errorMessage,
})
</script>

<template>
  <div class="gk-field" :class="{ 'gk-field--error': !!error }">
    <label
      v-if="label"
      :for="inputId"
      class="gk-field__label"
      :class="{ 'gk-field__label--sr-only': labelSrOnly }"
    >
      {{ label }}
    </label>
    <div class="gk-field__control">
      <slot />
    </div>
    <p
      v-if="error"
      :id="errorId"
      class="gk-field__error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.gk-field {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  width: 100%;
}

.gk-field__label {
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-sm);
  font-weight: 600;
  color: var(--gk-color-text);
  line-height: var(--gk-line-height-tight);
}

.gk-field__label--sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.gk-field__control {
  width: 100%;
}

.gk-field__error {
  margin: 0;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-danger);
  line-height: var(--gk-line-height-normal);
}

.gk-field--error .gk-field__label {
  color: var(--gk-color-danger);
}
</style>
