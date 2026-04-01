<script setup lang="ts">
import { GkButton, GkField, GkForm, GkInput } from 'god-kit/vue'
import type { SubmitEventPromise } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const last = ref('')
const disabledMode = ref(false)
const readonlyMode = ref(false)

function onSubmit(e: SubmitEventPromise) {
  e.then((r) => {
    last.value = r.valid ? `ok: ${email.value}` : 'invalid'
  })
}
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <h4 class="gk-doc-heading">Basic</h4>
    <GkForm @submit="onSubmit">
      <template #default="{ isValidating, validate }">
        <GkField label="Email">
          <GkInput v-model="email" type="email" autocomplete="email" placeholder="you@example.com" />
        </GkField>
        <div class="gk-doc-row">
          <GkButton type="button" variant="secondary" @click="validate">
            Validate
          </GkButton>
          <GkButton type="submit" variant="primary" :loading="isValidating">
            Submit
          </GkButton>
        </div>
        <p v-if="last" class="gk-doc-muted">{{ last }}</p>
      </template>
    </GkForm>

    <h4 class="gk-doc-heading">Advanced / edge case</h4>
    <div class="gk-doc-row">
      <label><input v-model="disabledMode" type="checkbox" /> Disabled</label>
      <label><input v-model="readonlyMode" type="checkbox" /> Readonly</label>
    </div>
    <GkForm :disabled="disabledMode" :readonly="readonlyMode">
      <template #default="{ isDisabled, isReadonly }">
        <p class="gk-doc-muted">Form flags -> disabled: {{ isDisabled }}, readonly: {{ isReadonly }}</p>
      </template>
    </GkForm>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
  max-width: 22rem;
}

.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
}

.gk-doc-muted {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}

.gk-doc-heading {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
