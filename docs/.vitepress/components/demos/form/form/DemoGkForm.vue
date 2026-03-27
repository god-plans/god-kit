<script setup lang="ts">
import { GkButton, GkField, GkForm, GkInput } from '@god-plan/god-kit/vue'
import type { SubmitEventPromise } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const last = ref('')

function onSubmit(e: SubmitEventPromise) {
  e.then((r) => {
    last.value = r.valid ? `ok: ${email.value}` : 'invalid'
  })
}
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
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
</style>
