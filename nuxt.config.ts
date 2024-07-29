// https://nuxt.com/docs/api/configuration/nuxt-config
import type { Algorithm } from "jsonwebtoken";
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
      scope: "common",
      tokenName: "bingyu",
    },
    api: {
      pageSize: 10,
    },
    // JWT
    jwt: {
      publicKey: "",
      privateKey: "",
      expiresIn: "7d",
      algorithm: "RS256" as Algorithm,
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
