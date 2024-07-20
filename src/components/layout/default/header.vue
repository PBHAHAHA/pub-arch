<template>
    <header class="flex justify-between py-3 px-4 ">
        <AppLogo color="text-[#f48400]"></AppLogo>
        <UserAccountDropdown></UserAccountDropdown>
    </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
console.log(colorMode.value);
</script>

<style lang="css">
.dark-mode {
    @apply bg-black text-white;
}
.light-mode {
    @apply bg-white text-black;
}
</style>