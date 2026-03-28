<script setup lang="ts">
import type { GkSkeletonNode } from './gk-skeleton-tree'
import GkSkeletonBone from './GkSkeletonBone.vue'

defineProps<{
  node: GkSkeletonNode
}>()
</script>

<template>
  <div class="gk-skeleton-loader__bone" :class="`gk-skeleton-loader__${node.bone}`">
    <GkSkeletonBone v-for="(c, i) in node.children" :key="i" :node="c" />
  </div>
</template>
