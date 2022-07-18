import colors from 'vuetify/es5/util/colors'
import config from './config'
export default {
  server: {
    host: '0.0.0.0', // default: localhost,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - online_schedule_director',
    title: 'online_schedule_director',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios.js',
    '~/plugins/initThemeChange.client.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    'cookie-universal-nuxt'
  ],

  styleResources: {
    scss: [
      // Site-wide mixins and functions
      '@/assets/styles/mixins/typography.scss'
    ]
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    hostUrl: process.env.HOST_URL
  },

  axios: {
    baseURL: config.apiUrl,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  },

  svgSprite: {
    input: '~/assets/svg/'
  },

  router: {
    middleware: ['auth']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    optionsPath: '~/vuetify.options.js',
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
