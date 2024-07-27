// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // 源文件
  srcDir: "src",
  // 配置
  runtimeConfig: {
    public: {
      appName: "yubing",
    },
    surreal: {
      rootUser: "root",
      rootPass: "123456",
      url: "http://127.0.0.1:3303/rpc",
      namespace: "bingyu",
      database: "app",
    },
    api: {
      pageSize: 10,
    },
  },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  colorMode: {
    classSuffix: "",
  },
  pinia: {
    storesDirs: ["./src/stores/**"],
  },
  ui: {
    icons: ["solar", "ri"], //https://icones.js.org/collection/solar|ri
  },
});
