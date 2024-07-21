<template>
  <div>
    <div class="mb-6">
      <ReceptionProviderWechatButton scene="signup" />
      <ReceptionElementSeparator label="通过用户名注册" />
      <ReceptionElementButton
        label="创建账户"
        to="/reception/signup"
        description="注册即表示同意服务条款及隐私政策，其中包括 Cookie 使用条款。"
      />
    </div>
    <ReceptionElementButton
      label="登录"
      variant="outline"
      to="/reception/signin"
      title="已有账户"
    />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "reception",
});

useHead({
  title: "加入",
});
</script>
