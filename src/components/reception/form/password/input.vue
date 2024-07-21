<template>
  <UInput
    class="!ring-0"
    autocomplete="current-password"
    :type="inputType"
    size="lg"
    placeholder="密码"
  >
    <template #trailing>
      <div class="flex gap-2 items-center">
        <UTooltip
          text="切换密码可见性"
          class="!ring-0"
          :ui="{ ring: 'ring-0' }"
          v-if="withVisibility"
        >
          <UButton
            class="pointer-events-auto"
            :icon="visibilityIcon"
            size="2xs"
            variant="soft"
            padded
            @click="onClickVisibility"
          />
        </UTooltip>
        <UTooltip
          text="找回密码"
          class="!ring-0"
          :ui="{ ring: 'ring-0' }"
          v-if="withReset"
        >
          <UButton
            class="pointer-events-auto"
            icon="i-ri-rotate-lock-fill"
            size="2xs"
            variant="soft"
            padded
          />
        </UTooltip>
      </div>
    </template>
  </UInput>
</template>
<script setup lang="ts">
/**
 * 属性
 */
type Props = { withReset?: boolean; withVisibility?: boolean };

withDefaults(defineProps<Props>(), {
  withReset: false,
  withVisibility: true,
});

/**
 * 输入类型
 */
const inputType = ref("password");

/**
 * 可见性小图标
 */
const visibilityIcon = computed(() => {
  return inputType.value === "password" ? "i-ri-eye-off-line" : "i-ri-eye-line";
});

/**
 * 切换可见性
 */
const onClickVisibility = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>
