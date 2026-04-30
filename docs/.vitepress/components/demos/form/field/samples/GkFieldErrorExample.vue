<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('not-an-email')
const emailError = ref('Use an address with @.')
</script>

<template>
  <GkField label="Email" :error="emailError">
    <GkInput v-model="email" type="email" autocomplete="email" />
  </GkField>
</template>
