<script setup lang="ts">
import { ref } from 'vue'
import { GkDataTable } from 'god-kit/vue'

const selected = ref<unknown[]>([])
const headers = [
  { key: 'task', title: 'Task' },
  { key: 'status', title: 'Status' },
  { key: 'assignee', title: 'Assignee' },
  { key: 'due', title: 'Due' },
]
const items = ref([
  { id: 't1', task: 'Deploy API', status: 'Done', assignee: 'Alex', due: 'Apr 02' },
  { id: 't2', task: 'Security audit', status: 'Blocked', assignee: 'Sam', due: 'Apr 10' },
  { id: 't3', task: 'Docs refresh', status: 'In progress', assignee: 'Jordan', due: 'Apr 14' },
  { id: 't4', task: 'Load test', status: 'Todo', assignee: 'Riley', due: 'Apr 20' },
])
function itemSelectable(row: Record<string, unknown>) {
  return row.status !== 'Blocked'
}
</script>

<template>
  <div class="vp-demo vp-demo--data-table">
    <GkDataTable
      v-model:selected="selected"
      show-select
      item-value="id"
      :item-selectable="itemSelectable"
      :bordered="false"
      density="compact"
      :headers="headers"
      :items="items"
      caption="Selection (Blocked rows cannot be selected)"
    />
  </div>
</template>
