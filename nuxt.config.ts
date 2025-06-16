// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app :{
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        bodyAttrs: {
            class: 'preload'
        },
        htmlAttrs: {
            lang: 'en'
        },
        title: 'Inside Weddings - Wedding Planning - Wedding Ideas - Real Weddings',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                // hid: 'description',
                name: 'description',
                content: 'Inside Weddings has everything you need to plan your wedding. Find your dream wedding dress ' +
                    'and browse real weddings, expert tips, and wedding vendors.'
            },
            {
                name: 'shareaholic:site_id',
                content: '6c4f794ab911d3d23bf392657117f496'
            },
            {
              //  hid: 'robots',
               name: 'robots',
               content: process.env.APP_ENV === 'production' ? '' : 'noindex'
            },
            {
                name: 'facebook-domain-verification',
                content: 'qylowfv940oko5xr9hujys41mglh8t'
            }
        ],

        link: [

            {
                rel: 'preconnect',
                href: 'https://icdn2.insideweddings.com'
            },
            // {
            //     rel: 'preconnect',
            //     href: 'https://fonts.gstatic.com'
            // },
            // {
            //     rel: 'preload',
            //     as: 'style',
            //     onload: 'this.onload=null;this.rel="stylesheet"',
            //     href: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Martel:wght@400;700&family=Nunito:wght@400;700&family=Vollkorn:ital,wght@1,400;1,600&display=swap'
            // }
            {
                rel: 'preload',
                href: '/fonts/O-Nunito-Regular.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: "anonymous"
            },
            {
                rel: 'preload',
                href: '/fonts/O-DidotLTStd-Regular.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: "anonymous"
            },
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
        ],
        script: [
            {
                src: '/lazysizes.min.js',
                fetchpriority: 'high',
                async: true
            },
            {
                src: process.env.IW_JS_FILE,
                defer: true
            },
            // { // for testing adding here, but should be in the google tag manager
            //     src: 'https://insideweddings.uservoice.com/widget_environment/TM3EP7MMPVszEnnYpOj1A.js',
            //     defer: true,
            // },
            // {
            //    src: 'https://www.googletagmanager.com/gtag/js?id=UA-9824992-1',
            //    async: true
            // },
            //
            //{
            //    src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-53c01bf2774624c5',
            //    defer: true
            //},
            //{
            //    src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58421f607361adb6',
            //    defer: true
            //},
            //{
            //    src: 'https://cdn.adapex.io/hb/aaw.inw.js',
            //    defer: true,
            //}
        ]
    },
    proxy: [
        // Proxies /sitemap.xml to https://api.donew.insideweddings.com/sitemap.xml
        'https://api.donew.insideweddings.com/sitemap.xml',
        'https://api.donew.insideweddings.com/sitemap-core.xml',
        'https://api.donew.insideweddings.com/sitemap-news.xml',
        'https://api.donew.insideweddings.com/sitemap-weddings.xml',
        'https://api.donew.insideweddings.com/sitemap-gallery-*.xml',
        'https://api.donew.insideweddings.com/sitemap-vendors.xml',

        'https://insideweddings-frontend-production.s3.us-west-2.amazonaws.com/ads.txt'
    ],

    robots: {
        UserAgent: '*',
        Sitemap: 'https://donew.insideweddings.com/sitemap.xml',
        Disallow: ['/global_search', '*/search?', '*/search_results?']
    },

    gtm: {
        //id: 'GTM-WXX47T2', // develop
        id: 'GTM-K5B3DG8',
        autoInit: true,
        respectDoNotTrack: false,
        scriptDefer: true,
    },

    sentry: {
        dsn: 'https://20ea3eafedf94d54a1637ac60a524197@o945373.ingest.sentry.io/5894259', // Enter your project's DSN here
        // Additional Module Options go here
        // https://sentry.nuxtjs.org/sentry/options
        config: {
            // Add native Sentry config here
            // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
        },
    },

    http: {
        baseURL: process.env.BASE_URL || 'https://donew.insideweddings.com/iwadmin/api/v2/',
        https: true,
        //debug: true,
        //retry: 3
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extractCSS: { ignoreOrder: true },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
          },
        filenames: {
            css: ({isDev}) => (isDev ? '[name].css' : '[id].[contenthash].css')
        },
        optimizeCSS: true,
        cssSourceMap: true,
        analyze: false,
        transpile: ['vue-youtube'],
        extend(config, { isDev, isClient }) {
            if (isClient && !isDev) {
                // Add jsdom as an external dependency
                config.externals = {
                    'jsdom': 'commonjs jsdom'
                };
            }
        }
    },

    /*
     ** Router property -  https://nuxtjs.org/docs/2.x/features/file-system-routing#the-router-property
     */
    router: {
        middleware: ['mobile', 'isGoogleBot', 'colorSwapper' /*, 'ampRedirect' */],
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
  }
})