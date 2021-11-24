import colors from 'vuetify/es5/util/colors';

export default {
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~/plugins/axios', ssr: true },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    'nuxt-i18n',
    ['cookie-universal-nuxt', { alias: 'cookie' }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000,
    https: false,
    prefix: '/api',
    withCredentials: true,
    credentials: true,
  },

  /*
   ** i18n module configuration
   ** https://nuxt-community.github.io/nuxt-i18n/basic-usage.html
   */
  i18n: {
    seo: false,
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'de',
    },
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.ts',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.ts',
      },
    ],
    parsePages: false, // Disable babel parsing
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#4c7b9b',
          background: '#212E38',
          backgroundPages: '#F5F5FA',
          accent: '#86b0cc',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.darken3,
          error: colors.deepOrange.darken3,
          success: colors.lightGreen.darken3,
        },
        dark: {
          primary: '#4c7b9b',
          background: '#212E38',
          backgroundPages: '#F5F5FA',
          accent: '#86b0cc',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.darken3,
          error: colors.deepOrange.darken3,
          success: colors.lightGreen.darken3,
        },
      },
    },
  },
  /**
   * Middlewares
   */
  router: {
    middleware: ['auth'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
};
