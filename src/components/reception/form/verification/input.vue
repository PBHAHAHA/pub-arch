<template>
  <div class="flex gap-4 justify-between">
    <UInput
      class="!ring-0 !w-9 text-center font-medium"
      maxlength="1"
      autocomplete="off"
      size="lg"
      v-for="(value, index) in items"
      :key="index"
      :value="value"
      ref="refs"
      @input="onInput(index, $event)"
      @paste="onPaste(index, $event)"
    />
    <div class="flex gap-3">
      <UButton
        class="!ring-0"
        variant="soft"
        @click="send"
        label="发送"
        size="xs"
      />
      <UButton
        class="!ring-0"
        variant="soft"
        @click="submit"
        label="确认"
        size="xs"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type UInput from "@nuxt/ui/dist/runtime/components/forms/Input.vue";

/**
 * 数据
 */
const items = ref<Array<string>>(new Array(4).fill(""));
const refs = ref<Array<InstanceType<typeof UInput>>>([]);

/**
 * 输入时
 */
const onInput = (index: number, event: Event) => {
  const { value } = event.target as HTMLInputElement;

  items.value[index] = value;

  if (value.length === 1) {
    if (index < items.value.length - 1) {
      refs.value[index + 1].input!.focus();
    }
  }
};

/**
 * 粘贴时
 */
const onPaste = (_: number, event: ClipboardEvent) => {
  const text = event
    .clipboardData!.getData("text")
    .replace(/\D/g, "")
    .slice(0, 4);

  items.value.forEach((_, index) => {
    items.value[index] = text[index];
  });

  refs.value.forEach((item) => item.input?.blur());
};

const verificationCode = computed(() => {
  return items.value.join("");
});

const canSubmit = computed(() => {
  return verificationCode.value.length === 4;
});

/**
 * 重置
 */
const send = () => {};

/**
 * 提交
 */
const submit = () => {
  if (canSubmit.value) {
    useToast().add({ title: "验证通过" });
  } else {
    useToast().add({ title: "验证码填写有误" });
  }
};
</script>
