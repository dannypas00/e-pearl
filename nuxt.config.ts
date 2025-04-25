// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    esbuild: {
      options: {
        target: 'es2022',
      },
    },
  },

  runtimeConfig: {
    public: {
      minecraft: {
        host: process.env.PUBLIC_MINECRAFT_HOST,
        port: Number(process.env.PUBLIC_MINECRAFT_PORT),
        name: process.env.PUBLIC_MINECRAFT_NAME,
      },
    },
  },
});