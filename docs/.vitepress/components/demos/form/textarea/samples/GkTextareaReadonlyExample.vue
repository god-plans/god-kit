<script setup lang="ts">
import { GkField, GkTextarea } from 'god-kit/vue'
import { ref } from 'vue'

const transcript = ref('Fixed transcript text.')
const error = ref('')
</script>

<template>
  <GkField label="Readonly transcript" :error="error || undefined">
    <GkTextarea v-model="transcript" readonly />
  </GkField>
</template>
