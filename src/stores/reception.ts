/**
 * ReceptionStore
 */
export const useReceptionStore = defineStore("reception", () => {
  /**
   * State 🌴
   */
  const input = ref({
    name: "",
    password: "",
    identifier: "",
    verification: "",
  });

  // 注册数据
  const signupInput = computed(() => {
    return {
      name: input.value.name,
      password: input.value.password,
    };
  });

  // 注册
  const signup = async () => {
    try {
      await $fetch(`/api/reception/signup`, {
        method: "POST",
        body: signupInput.value,
        ...useFetchInterceptor(),
      });

      useToast().add({ title: "注册成功" });
    } catch (error) {}
  };

  // 登录方法
  const signinMethod = useState("signinMethod");

  // 登录数据
  const signinInput = computed(() => {
    if (signinMethod.value === "password") {
      return {
        identifier: input.value.identifier,
        password: input.value.password,
      };
    }
    if (signinMethod.value === "verification") {
      return {
        identifier: input.value.identifier,
        verification: input.value.verification,
      };
    }
  });

  // 验证码数据
  const verifyInput = computed(() => {
    return {
      identifier: input.value.identifier,
    };
  });
  // 登录
  const signin = async () => {
    try {
      await $fetch(`/api/reception/signin`, {
        method: "POST",
        body: signinInput.value,
        ...useFetchInterceptor(),
      });

      useToast().add({ title: "登录成功" });
    } catch (error) {}
  };

  // 验证码
  const verify = async () => {
    try {
      await $fetch(`/api/reception/verification`, {
        method: "POST",
        body: verifyInput.value,
        ...useFetchInterceptor(),
      });

      useToast().add({ title: "验证码发送成功" });
    } catch (error) {}
  };

  return { input, signup, signin, verify };
});
