<script setup lang="ts">
import { GkCard } from 'god-kit/vue'
</script>

<template>
  <GkCard
    :max-width="400"
    title="Invoice #1042"
    subtitle="Acme Corp - due in 3 days"
    text="The amount is ready for review."
  >
    Extra paragraph in the default slot.
  </GkCard>
</template>
