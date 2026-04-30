<script setup lang="ts">
import { ref } from 'vue'
import {
  GkExpansionPanel,
  GkExpansionPanels,
  GkExpansionPanelText,
  GkExpansionPanelTitle,
} from 'god-kit/vue'

const accordionOpen = ref<(string | number)[]>([])
</script>

<template>
  <div class="gk-doc-expansion-sample">
    <GkExpansionPanels v-model="accordionOpen">
      <GkExpansionPanel value="a">
        <GkExpansionPanelTitle>Section one</GkExpansionPanelTitle>
        <GkExpansionPanelText>
          Content for the first section. Opening another section closes this one.
        </GkExpansionPanelText>
      </GkExpansionPanel>
      <GkExpansionPanel value="b">
        <GkExpansionPanelTitle>Section two</GkExpansionPanelTitle>
        <GkExpansionPanelText>Content for the second section.</GkExpansionPanelText>
      </GkExpansionPanel>
    </GkExpansionPanels>
  </div>
</template>

<style scoped>
.gk-doc-expansion-sample {
  max-width: 32rem;
}
</style>
