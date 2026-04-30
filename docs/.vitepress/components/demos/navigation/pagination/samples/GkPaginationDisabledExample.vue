<script setup lang="ts">
import { GkPagination } from 'god-kit/vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <GkPagination
    v-model="page"
    :length="1"
    disabled
    aria-label="Results pagination (disabled)"
  />
</template>
