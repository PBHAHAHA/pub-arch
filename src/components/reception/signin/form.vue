<template>
  <form class="space-y-4">
    <ReceptionFormIdentifierInput scene="signin" />
    <ReceptionFormVerificationInput v-if="signinMethod === 'verification'" />
    <ReceptionFormPasswordInput withReset v-if="signinMethod === 'password'" />
    <div class="py-4">
      <ReceptionElementButton label="登录">
        <template #description>
          <div class="text-center">
            <UButton
              label="还没有账户，创建新账户"
              variant="link"
              color="white"
              size="xs"
              trailingIcon="i-solar-arrow-right-linear"
              to="/reception/signup"
            />
          </div>
        </template>
      </ReceptionElementButton>
    </div>
  </form>
</template>

<script setup lang="ts">
const signinMethod = useState("signinMethod");
</script>
