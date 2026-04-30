<script setup lang="ts">
import { ref } from 'vue'
import {
  GkExpansionPanel,
  GkExpansionPanels,
  GkExpansionPanelText,
  GkExpansionPanelTitle,
} from 'god-kit/vue'

const multiOpen = ref<(string | number)[]>(['b'])
</script>

<template>
  <div class="gk-doc-expansion-sample">
    <GkExpansionPanels v-model="multiOpen" multiple>
      <GkExpansionPanel value="a">
        <GkExpansionPanelTitle>Alpha</GkExpansionPanelTitle>
        <GkExpansionPanelText>Alpha body.</GkExpansionPanelText>
      </GkExpansionPanel>
      <GkExpansionPanel value="b">
        <GkExpansionPanelTitle>Beta</GkExpansionPanelTitle>
        <GkExpansionPanelText>
          Beta body (open by default in this demo).
        </GkExpansionPanelText>
      </GkExpansionPanel>
    </GkExpansionPanels>
  </div>
</template>

<style scoped>
.gk-doc-expansion-sample {
  max-width: 32rem;
}
</style>
