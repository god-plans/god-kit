<script setup lang="ts">
import GkSnackbar from './GkSnackbar.vue'
import { gkSnackbarQueueState } from './gk-snackbar-queue'

function remove(id: string) {
  const i = gkSnackbarQueueState.items.findIndex((x) => x.id === id)
  if (i >= 0) gkSnackbarQueueState.items.splice(i, 1)
}
</script>

<template>
  <GkSnackbar
    v-for="(item, index) in gkSnackbarQueueState.items"
    :key="item.id"
    v-model="item.open"
    :queue-index="index"
    v-bind="item.options"
    @after-leave="remove(item.id)"
  />
</template>
