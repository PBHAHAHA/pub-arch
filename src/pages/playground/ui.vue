<template>
    <div class="py-8 px-4">
        <div class="">ce</div>
        <UBadge color="primary" variant="solid">Badge</UBadge>
        <div class="text-primary">123</div>
        <UButton type="primary" color="blue" >123</UButton>
        <UButton color="primary" @click="appConfig.ui.button.font='font-medium'">加粗</UButton>
        <UButton color="blue" @click="appConfig.ui.button.font='font-light'">变细</UButton>
        <UButton color="blue" @click="appConfig.ui.primary='red'">红色</UButton>

        <br />
        <UIcon name="i-solar-align-top-linear" class="text-4xl" />
        <UIcon name="i-heroicons-light-bulb" class="text-4xl" />
        <UIcon name="i-ri-wechat-fill" class="text-4xl"  />

        <br />
        <UKbd>O</UKbd>
        <UModal v-model="showModal">
            <UCard>冰雨</UCard>
        </UModal>

        <UButton @click="onClick">通知</UButton>
    </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const showModal = ref(false);

defineShortcuts({
    meta_o: {
        handler: () => {
            showModal.value = true;
        }
    }
})

const onClick = () => {
    const toast  = useToast()
    toast.add({
        title: '通知',
        description: '这是一个通知',
        id: 1,
        icon: 'i-solar-basketball-linear',
        timeout: 0,
    })
}
</script>