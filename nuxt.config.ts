// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-lodash',
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    experimental: {
      websocket: true,
    },
    esbuild: {
      options: {
        target: 'es2022',
      },
    },
  },

  runtimeConfig: {
    minecraft: {
      host: process.env.MINECRAFT_HOST,
    },
    rcon: {
      port: Number(process.env.RCON_PORT),
      password: process.env.RCON_PASSWORD,
    },
    query: {
      port: Number(process.env.QUERY_PORT),
    },
    public: {
      minecraft: {
        host: process.env.PUBLIC_MINECRAFT_HOST,
        port: Number(process.env.PUBLIC_MINECRAFT_PORT),
        name: process.env.PUBLIC_MINECRAFT_NAME,
      },
    },
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },
});
