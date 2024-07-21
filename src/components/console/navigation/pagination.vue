<template>
  <UPagination
    :modelValue="modelValue"
    @update:modelValue="onUpdate"
    :pageCount="pageCount"
    :total="total"
    :activeButton="pagination.activeButton"
    :inactiveButton="pagination.inactiveButton"
    :prevButton="pagination.prevButton"
    :nextButton="pagination.nextButton"
  />
</template>
<script setup lang="ts">
const { pagination } = useAppConfig();
/**
 * 属性
 */
type Props = { pageCount: number; total: number; modelValue: number };

defineProps<Props>();

/**
 * 事件
 */
const emit = defineEmits();

const onUpdate = (value: number) => {
  emit("update:modelValue", value);
};
</script>
