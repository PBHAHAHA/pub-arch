<template>
  <div class="space-y-10">
    <ConsoleBlockHeader
      :title="emojiTitle"
      @click="
        () => {
          setTitle('Console');
        }
      "
    />
  </div>
</template>
<script setup lang="ts">
const store = useConsoleStore();
const { setTitle } = store;
const { title, emojiTitle } = storeToRefs(store);
console.log(store);
// store.$onAction((context) => {
//   console.log("执行动作前～", context);

//   context.after((result) => {
//     useToast().add({
//       title: `完成`,
//       description: `执行了 ${context.store.$id} 仓库里的 ${context.name} 动作 ，得到的结果是 ${result}。`,
//     });
//   });

//   context.onError((error: any) => {
//     if (error.name === "Error") {
//       useToast().add({
//         title: `错误`,
//         description: `${error.message}`,
//       });
//     }
//   });
// });
store.$subscribe(
  (mutation, state) => {
    console.log(mutation, state);
  },
  { detached: true }
);
definePageMeta({
  layout: "console",
});

/**
 * 页头
 */
useHead({
  title: () => store.title,
});

const pinia = usePinia();

watch(
  pinia.state,
  (state) => {
    console.log(state);
  },
  { deep: true }
);
</script>
