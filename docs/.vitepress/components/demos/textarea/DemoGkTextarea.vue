<script setup lang="ts">
import { GkField, GkTextarea } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const notes = ref('Hello')
</script>

<template>
  <div class="gk-doc-demo">
    <GkField label="Notes">
      <GkTextarea v-model="notes" :rows="3" />
    </GkField>
  </div>
</template>
