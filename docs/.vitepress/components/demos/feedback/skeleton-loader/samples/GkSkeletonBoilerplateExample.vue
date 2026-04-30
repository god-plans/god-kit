<script setup lang="ts">
import { GkSkeletonLoader } from 'god-kit/vue'
</script>

<template>
  <GkSkeletonLoader
    type="list-item-avatar"
    boilerplate
    class="gk-doc-skeleton-demo--mt"
  />
</template>

<style scoped>
.gk-doc-skeleton-demo--mt {
  max-width: 24rem;
}
</style>
