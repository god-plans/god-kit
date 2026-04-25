<script setup lang="ts">
import { GkCard } from 'god-kit/vue'
</script>

<template>
  <GkCard
    href="https://example.com"
    target="_blank"
    rel="noopener noreferrer"
    variant="outlined"
    hover
    :max-width="320"
    title="As a link"
    text="Root is an anchor; opens in a new tab."
  />
</template>
