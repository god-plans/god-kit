<script setup lang="ts">
import { GkButton, GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const err = ref('')

function validate() {
  err.value = email.value.includes('@') ? '' : 'Enter a valid email.'
}
</script>

<template>
  <form class="gk-doc-form" @submit.prevent="validate">
    <GkField label="Email" :error="err">
      <GkInput v-model="email" type="email" autocomplete="email" />
    </GkField>
    <GkButton type="submit" variant="primary">
      Validate
    </GkButton>
  </form>
</template>

<style scoped>
.gk-doc-form {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
  max-width: 20rem;
}
</style>
