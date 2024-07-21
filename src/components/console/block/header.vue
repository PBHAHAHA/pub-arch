<template>
  <div class="flex justify-between items-center h-8">
    <div>
      <slot>{{ title }}</slot>
    </div>
    <div v-if="add">
      <UButton icon="i-ri-add-line" size="xs" @click="add" />
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 属性
 */
type Props = { title: string; add?: (...payload: any[]) => void };

defineProps<Props>();
</script>
