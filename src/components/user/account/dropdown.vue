<template>
    <UDropdown :items="items">
        <div class="flex gap-4 items-center">
            <UAvatar src="/images/avatar.png"></UAvatar>
            <div v-if="withName" :class="['text-gray-600 dark:text-gray-400']"></div>
        </div>
    </UDropdown>
</template>
<script lang="ts" setup>
import type {DropdownItem} from '@nuxt/ui/dist/runtime/types'
const colorMode = useColorMode()
const currentColorModeIcon = computed(() => {
    switch(colorMode.value) {
        case 'light':
            return 'i-solar-sun-2-linear'
        case 'dark':
            return 'i-solar-moon-linear'
    } 
})
type Props = {
    withName?: boolean;
    text?: string
}

defineProps<Props>()

const currentItems = ref<'main' | 'appearance'>('main')
const mainItems = computed<DropdownItem>(() => {
    return [
        [
            {
                label: 'pub',
                avatar: {
                    src: '/images/avatar.png'
                },
            }
        ],
        [
            {
                label: '外观',
                icon: currentColorModeIcon.value,
                click: (event: PointerEvent) => {
                    event.preventDefault()
                    currentItems.value = 'appearance'
                }
            }
        ]
    ]
})

const appearanceItems = computed<DropdownItem>(() => {
    return [
        [
            {
                label: '返回',
                icon: 'i-solar-arrow-left-linear',
                click: (event: PointerEvent) => {
                    event.preventDefault()
                    currentItems.value = 'main'
                }
            },
            {
                label: '深色模式',
                icon: 'i-solar-moon-linear',
                click: (event: PointerEvent) => {
                    event.preventDefault()
                    colorMode.value = 'dark'
                }
            },
            {
                label: '浅色模式',
                icon: 'i-solar-sun-2-linear',
                click: (event: PointerEvent) => {
                    event.preventDefault()
                    colorMode.value = 'light'
                }
            },
            {
                label: '跟随系统',
                icon: 'i-solar-devices-linear',
                click: (event: PointerEvent) => {
                    event.preventDefault()
                    colorMode.value = 'system'
                }
            }
        ]
    ]
})

// 下拉菜单项目组
const items = computed(() => {
    switch(currentItems.value) {
        case 'main':
            return mainItems.value
        case 'appearance':
            return appearanceItems.value
    }
})
</script>