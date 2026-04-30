<script setup lang="ts">
import { GkButton } from 'god-kit/vue'
import { ref } from 'vue'

const saving = ref(false)
</script>

<template>
  <GkButton :loading="saving" loading-label="Saving invoice" @click="saving = !saving">
    Save
  </GkButton>
</template>
