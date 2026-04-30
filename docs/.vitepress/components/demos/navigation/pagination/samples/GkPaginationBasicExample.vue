<script setup lang="ts">
import { GkPagination } from 'god-kit/vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <GkPagination
    v-model="page"
    :length="12"
    :total-visible="7"
    show-first-last-page
  />
</template>
