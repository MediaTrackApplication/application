// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: false,
    },
  },

  ssr: false,

  supabase: {
    redirectOptions: {
      callback: '/confirm',
      exclude: ['/signup'],
      include: undefined,
      login: '/signin',
      saveRedirectToCookie: false,
    },
  },
})
