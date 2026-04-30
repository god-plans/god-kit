<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const apiKey = ref('')
const apiKeyError = ref('')
</script>

<template>
  <GkField label="API key" label-sr-only :error="apiKeyError || undefined">
    <GkInput v-model="apiKey" aria-label="API key" placeholder="sk-…" />
  </GkField>
</template>
