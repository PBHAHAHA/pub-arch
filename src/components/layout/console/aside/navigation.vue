<template>
  <UVerticalNavigation :links="links" :ui="ui" />
</template>
<script lang="ts" setup>
import type { VerticalNavigationLink } from "@nuxt/ui/dist/runtime/types/vertical-navigation";
/**
 * 链接项目
 */
const links: Array<VerticalNavigationLink> = [
  {
    label: "控制台",
    icon: "i-solar-command-linear",
    to: "/console",
  },
  {
    label: "初创",
    icon: "i-solar-rocket-2-outline",
    to: "/console/startups",
  },
  {
    label: "订阅",
    icon: "i-solar-water-sun-linear",
    to: "/console/subscriptions",
  },
  {
    label: "用户",
    icon: "i-solar-user-linear",
    to: "/console/users",
  },
  {
    label: "设置",
    icon: "i-solar-tuning-linear",
    to: "/console/settings",
  },
];

/**
 * 界面
 */
const ui = /*ui*/ {
  wrapper: "relative ",
  icon: {
    base: "flex-shrink-0 w-6 h-6",
  },
  padding: "px-3 py-2",
  font: "font-normal",
  label: "truncate relative md:hidden lg:block",
  base: `group relative flex items-center gap-1.5 
  focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none 
  focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 
  dark:focus-visible:before:ring-primary-400 before:absolute
  before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75
  md:justify-center lg:justify-start`,
  active: `text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800 
    md:before:bg-transparent md:dark:before:bg-transparent lg:before:bg-gray-100 lg:dark:before:bg-gray-800`,
};
</script>
