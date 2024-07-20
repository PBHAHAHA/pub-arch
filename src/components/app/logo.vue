<template>
  <div
    :class="['logo', wrapper, height, color, { 'cursor-pointer': to }]"
    @click="to && navigateTo(to)"
  >
    <div :class="graph" v-if="showGraph">
      <span :class="['mask graph', height]"></span>
    </div>
    <div :class="graph" v-if="showText">
      <span :class="['text', height]">冰雨</span>
      <!-- <span :class=['mask text', height]></span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  wrapper?: string;
  variant?: "full" | "text" | "graph";
  color?: string;
  height?: string;
  to?: string;
  text?: string;
  graph?: string; // 图形
};

const props = withDefaults(defineProps<Props>(), {
  wrapper: "flex gap-3",
  variant: "full",
  height: "h-8",
});

const color = computed(() => {
  let value;
  if (props.color) {
    value = props.color;
  } else {
    value = "text-black dark:text-white";
  }
  return value;
});

const showText = computed(() => {
  return props.variant === "text" || props.variant === "full";
});

const showGraph = computed(() => {
  return props.variant === "graph" || props.variant === "full";
});
</script>

<style lang="css">
.logo {
}
.mask {
  display: inline-block;
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}
.graph {
  aspect-ratio: 1 / 1;
  mask-image: url("/images/logo_normal.svg");
}
.text {
  /* aspect-ratio: 16 / 9;
  mask-image: url("/images/text.svg"); */
  line-height: 2;
  font-size: 1.2srem;
  font-weight: 700;
}
</style>
