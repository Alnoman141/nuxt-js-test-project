export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  publicRuntimeConfig: {
    axios: {
        // baseURL: process.env.BASE_URL||'http://mypremo-api.audacityit.work/api/'
        baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/',
        proxy: true
    }
},
axios: {
  proxy: true
},

proxy: {
  '/api/': { target: 'http://localhost:3000/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
},

// server: {
//   port: 0
// },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
