// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // 源文件
  srcDir: 'src',
  // 配置
  runtimeConfig: {
    public: {
      appName: 'yubing'
    },
    surreal: {
      rootUser: 'root',
      rootPass: '123456'
    }
  },
  modules: [
    '@nuxt/ui'
  ],
  colorMode: {
    classSuffix: ''
  },
  ui: {
    icons: ['solar','ri'], //https://icones.js.org/collection/solar|ri
  }
})
