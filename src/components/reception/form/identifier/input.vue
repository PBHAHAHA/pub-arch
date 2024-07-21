<template>
  <UInput
    class="!ring-0"
    autocomplete="on"
    :placeholder="placeholder"
    size="lg"
  >
    <template #trailing>
      <div class="flex gap-2 items-center">
        <UTooltip
          text="使用密码登录"
          :ui="{ ring: 'ring-0' }"
          v-if="scene === 'signin'"
        >
          <UButton
            class="pointer-events-auto"
            icon="i-ri-lock-2-line"
            size="2xs"
            variant="soft"
            padded
            @click="onClickPassword"
          />
        </UTooltip>
        <UTooltip
          text="使用验证码登录"
          :ui="{ ring: 'ring-0' }"
          v-if="scene === 'signin'"
        >
          <UButton
            class="pointer-events-auto"
            icon="i-ri-message-3-line"
            size="2xs"
            variant="soft"
            padded
            @click="onClickVerification"
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
type Props = { scene: "signin" | "signup" };

const props = defineProps<Props>();

/**
 * 登录方式
 */
const signinMethod = useState("signinMethod", () => "password");

/**
 * 通知
 */
const signinMethodChangedMessage = (method: string) => {
  const toast = useToast();
  const id = "signin-method-changed";
  toast.remove(id);

  let title, description;

  if (method === "password") {
    title = "通过密码登录";
    description = "请输入用户密码完成登录";
  }

  if (method === "verification") {
    title = "通过验证码登录";
    description = "输入邮箱或手机点击发送验证码";
  }

  const message = {
    id,
    title,
    description,
  };

  toast.add(message);
};

/**
 * 使用密码登录
 */
const onClickPassword = () => {
  signinMethod.value = "password";
  signinMethodChangedMessage("password");
};

/**
 * 使用验证码登录
 */
const onClickVerification = () => {
  signinMethod.value = "verification";
  signinMethodChangedMessage("verification");
};

/**
 * 占位符文字
 */
const placeholder = computed(() => {
  let value;

  if (props.scene === "signin" && signinMethod.value === "password") {
    value = "名字、邮箱、手机";
  }

  if (props.scene === "signin" && signinMethod.value === "verification") {
    value = "邮箱、手机";
  }

  if (props.scene === "signup") {
    value = "名字";
  }

  return value;
});
</script>
