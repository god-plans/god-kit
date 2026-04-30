<script setup lang="ts">
import { GkButton, GkField, GkForm, GkInput } from 'god-kit/vue'
import type { SubmitEventPromise } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const last = ref('')

/** Simulates async validation so `isValidating` / submit loading stay on for ~1s */
async function demoValidate() {
  await new Promise<void>((r) => setTimeout(r, 1000))
  return { valid: true, errors: [] }
}

function onSubmit(e: SubmitEventPromise) {
  e.then((r) => {
    last.value = r.valid ? `ok: ${email.value}` : 'invalid'
  })
}
</script>

<template>
  <GkForm :validate="demoValidate" @submit="onSubmit">
    <template #default="{ isValidating, validate }">
      <GkField label="Email">
        <GkInput
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
        />
      </GkField>
      <div class="gk-doc-row">
        <GkButton
          type="button"
          variant="secondary"
          @click="validate"
        >
          Validate
        </GkButton>

        <GkButton
          type="submit"
          variant="primary"
          :loading="isValidating"
        >
          Submit test
        </GkButton>
      </div>
      <p v-if="last" class="gk-doc-muted">
        {{ last }}
      </p>
    </template>
  </GkForm>
</template>

<style scoped>
.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--gk-space-2);
  gap: var(--gk-space-2);
}

.gk-doc-muted {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
