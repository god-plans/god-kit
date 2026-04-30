<script setup lang="ts">
import { GkField, GkTextarea } from 'god-kit/vue'
import { ref } from 'vue'

const notes = ref('Hello')
</script>

<template>
  <GkField label="Notes">
    <GkTextarea v-model="notes" :rows="3" />
  </GkField>
</template>
