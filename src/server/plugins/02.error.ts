export default defineNitroPlugin(async (nitroApp) => {
  const setReconnectTimer = async () => {
    // return await useStorage().setItemRaw('reconnectTimer', timer)
  };
  nitroApp.hooks.hook("error", async (error) => {
    const _error = error as any;
    console.log(_error, "02.error");
  });
});
