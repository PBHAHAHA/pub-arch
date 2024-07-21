<template>
  <div>
    <div
      v-if="title"
      class="font-normal text-sm text-white dark:text-black mb-3"
    >
      {{ title }}
    </div>
    <UButton block size="xl" :variant="variant" :ui="ui" :to="to">
      <slot>{{ label }}</slot>
    </UButton>
    <div
      v-if="description || $slots.description"
      class="text-white dark:text-black text-xs py-2"
    >
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 属性
 */
type Props = {
  label?: string;
  variant?: "solid" | "outline";
  to?: string;
  title?: string;
  description?: string;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "solid",
});
</script>
