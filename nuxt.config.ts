import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'
// import shrinkRay from 'shrink-ray-current'
// import logger from 'connect-logger'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-06-17',

  css: ['./assets/styles/globals.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api : 'modern',

          additionalData: `
            // @use './assets/styles/globals.scss' as *;
            @use './assets/styles/partials/mixins.scss' as *; 
            @use './assets/styles/partials.scss' as *;
          `
        }
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { class: 'preload' },
      title: 'Inside Weddings - Wedding Planning - Wedding Ideas - Real Weddings',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          //   hid: 'description',
          name: 'description',
          content:
            'Inside Weddings has everything you need to plan your wedding. Find your dream wedding dress and browse real weddings, expert tips, and wedding vendors.'
        },
        { name: 'shareaholic:site_id', content: '6c4f794ab911d3d23bf392657117f496' },
        {
          //   hid: 'robots',
          name: 'robots',
          content: process.env.APP_ENV === 'production' ? '' : 'noindex'
        },
        {
          name: 'facebook-domain-verification',
          content: 'qylowfv940oko5xr9hujys41mglh8t'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://icdn2.insideweddings.com' },
        {
          rel: 'preload',
          href: '/fonts/O-Nunito-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        },
        {
          rel: 'preload',
          href: '/fonts/O-DidotLTStd-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          src: '/lazysizes.min.js',
          fetchpriority: 'high',
          async: true
        },
        {
          src: process.env.IW_JS_FILE || '',
          defer: true
        }
      ]
    }
  },

  build: {
    transpile: ['vue-youtube'],
    optimizeCSS: true,
    cssSourceMap: true,
    filenames: {
      css: ({ isDev }) => (isDev ? '[name].css' : '[id].[contenthash].css')
    },
    extend(config, { isClient, isDev }) {
      if (!isDev && isClient) {
        config.externals = {
          jsdom: 'commonjs jsdom'
        }
      }
    }
  },

  //   modules: [
  //     '@nuxt/http',
  //     '@nuxtjs/sentry',
  //     '@nuxtjs/gtm',
  //     '@nuxtjs/robots',
  //     '@nuxtjs/proxy',
  //     '@nuxtjs/redirect-module',
  //     '@nuxtjs/component-cache'
  //   ],
  modules: ['@pinia/nuxt'],

  buildModules: ['@nuxtjs/style-resources'],

  styleResources: {
    scss: ['./assets/styles/globals.scss']
  },

  plugins: [],

  components: true,

  http: {
    baseURL: process.env.BASE_URL || 'https://donew.insideweddings.com/iwadmin/api/v2/',
    https: true
  },

  sentry: {
    dsn: 'https://20ea3eafedf94d54a1637ac60a524197@o945373.ingest.sentry.io/5894259',
    config: {}
  },

  gtm: {
    id: 'GTM-K5B3DG8',
    autoInit: true,
    respectDoNotTrack: false,
    scriptDefer: true
  },

  robots: {
    UserAgent: '*',
    Sitemap: 'https://donew.insideweddings.com/sitemap.xml',
    Disallow: ['/global_search', '*/search?', '*/search_results?']
  },

  proxy: [
    'https://api.donew.insideweddings.com/sitemap.xml',
    'https://api.donew.insideweddings.com/sitemap-core.xml',
    'https://api.donew.insideweddings.com/sitemap-news.xml',
    'https://api.donew.insideweddings.com/sitemap-weddings.xml',
    'https://api.donew.insideweddings.com/sitemap-gallery-*.xml',
    'https://api.donew.insideweddings.com/sitemap-vendors.xml',
    'https://insideweddings-frontend-production.s3.us-west-2.amazonaws.com/ads.txt'
  ],

  router: {
    middleware: ['mobile', 'isGoogleBot', 'colorSwapper'],
    trailingSlash: true
  },

  redirect: [
    {
      from: '^/weddings/(.*)/images-gallery/?$',
      to: '/weddings/$1/',
      statusCode: 301
    }
  ],

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  serverMiddleware: [
    '~server/middleware-server/cacheControl.js',
    '~server/middleware-server/redirects.js',

  ]
  //   serverMiddleware: [
  //     logger({ format: '%date %status %method %url (%time)' }),
  //     '~/middleware-server/cacheControl.js',
  //     '~/middleware-server/redirects.js'
  //   ],

  //   render: {
  //     compressor: shrinkRay(),
  //     ssrLog: 'collapsed',
  //     resourceHints: false,
  //     ssr: true,
  //     injectScripts: false,
  //     static: {
  //       maxAge: 60 * 60 * 24 * 365 * 1000
  //     }
  //   }
})
