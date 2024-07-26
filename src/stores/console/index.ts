export const useConsoleStore = defineStore("console", () => {
  const title = ref("控制台");
  /**
   * Getters 🌵
   */
  const emojiTitle = computed(() => {
    return `${title.value} 🦄`;
  });

  /**
   * Actions 🚀
   */

  const setTitle = (data: string) => {
    title.value = data;
  };
  return {
    title,
    emojiTitle,
    setTitle,
  };
});
