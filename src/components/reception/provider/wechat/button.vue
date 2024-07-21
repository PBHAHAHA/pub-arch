<template>
  <UButton block size="xl" color="white" class="!ring-0">
    <template #leading>
      <UIcon
        name="i-ri-wechat-fill"
        class="bg-green-500 dark:bg-green-400 text-xl"
      />
    </template>
    <span class="text-green-500 dark:text-green-400">
      <slot>{{ label }}</slot>
    </span>
  </UButton>
</template>
<script setup lang="ts">
/**
 * 属性
 */
type Props = { scene: "signin" | "signup" };

const props = defineProps<Props>();

/**
 * 数据
 */
const label = computed(() => {
  return props.scene === "signin" ? "通过微信登录" : "通过微信注册";
});
</script>
