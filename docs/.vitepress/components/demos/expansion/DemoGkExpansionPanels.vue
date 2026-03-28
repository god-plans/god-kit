<script setup lang="ts">
import { ref } from 'vue'
import {
  GkExpansionPanel,
  GkExpansionPanels,
  GkExpansionPanelText,
  GkExpansionPanelTitle,
} from 'god-kit/vue'

const accordionOpen = ref<(string | number)[]>([])
const multiOpen = ref<(string | number)[]>(['b'])
</script>

<template>
  <div class="gk-doc-demo gk-doc-expansion-demo">
    <p class="gk-doc-expansion-demo__label">Accordion (single open)</p>
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

    <p class="gk-doc-expansion-demo__label">Multiple open</p>
    <GkExpansionPanels v-model="multiOpen" multiple>
      <GkExpansionPanel value="a">
        <GkExpansionPanelTitle>Alpha</GkExpansionPanelTitle>
        <GkExpansionPanelText>Alpha body.</GkExpansionPanelText>
      </GkExpansionPanel>
      <GkExpansionPanel value="b">
        <GkExpansionPanelTitle>Beta</GkExpansionPanelTitle>
        <GkExpansionPanelText>Beta body (open by default in this demo).</GkExpansionPanelText>
      </GkExpansionPanel>
    </GkExpansionPanels>
  </div>
</template>

<style scoped>
.gk-doc-expansion-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-5);
  max-width: 32rem;
}

.gk-doc-expansion-demo__label {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  font-weight: 600;
  color: var(--gk-color-text-muted);
}
</style>
