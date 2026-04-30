<script setup lang="ts">
import { GkField, GkTextarea } from 'god-kit/vue'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <GkField label="Description">
    <GkTextarea
      v-model.trim="description"
      :rows="6"
      placeholder="Write details…"
    />
  </GkField>
</template>
