<script setup lang="ts">
import { ref } from 'vue'
import { GkCard } from 'god-kit/vue'

const count = ref(0)
</script>

<template>
  <GkCard
    clickable
    variant="plain"
    :max-width="320"
    title="Clickable surface"
    :text="`Role is button; clicks: ${count}`"
    @click="count++"
  />
</template>
