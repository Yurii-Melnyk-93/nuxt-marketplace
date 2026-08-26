import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['picsum.photos'],
    provider: 'none',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Nuxt Marketplace',
      titleTemplate: '%s — Nuxt Marketplace',
      meta: [
        {
          name: 'description',
          content: 'A small e-commerce marketplace built with Nuxt — browse products, search, filter, and shop.',
        },
      ],
    },
  },
})
