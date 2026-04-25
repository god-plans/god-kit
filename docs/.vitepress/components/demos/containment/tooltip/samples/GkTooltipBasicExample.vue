<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
</script>

<template>
  <GkTooltip text="Saved to your profile">
    <template #activator="{ props }">
      <GkButton type="button" v-bind="props">Hover / focus</GkButton>
    </template>
  </GkTooltip>
</template>
