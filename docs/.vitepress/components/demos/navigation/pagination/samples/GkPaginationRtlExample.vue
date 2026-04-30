<script setup lang="ts">
import { GkPagination } from 'god-kit/vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <GkPagination
    v-model="page"
    :length="42"
    :total-visible="9"
    show-first-last-page
    dir="rtl"
    active-color="var(--gk-color-primary)"
  />
</template>
