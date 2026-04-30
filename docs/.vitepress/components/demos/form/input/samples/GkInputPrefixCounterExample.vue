<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const amount = ref('')
</script>

<template>
  <GkField label="With prefix & counter">
    <GkInput
      v-model="amount"
      prefix="$"
      placeholder="0.00"
      :counter="12"
      persistent-counter
    />
  </GkField>
</template>
