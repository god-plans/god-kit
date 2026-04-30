<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <GkField label="Example">
    <GkInput v-model="value" placeholder="Type here" />
  </GkField>
</template>
