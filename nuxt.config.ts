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

          additionalData: `@use "@/assets/styles/partials/mixins.scss" as *; @use "@/assets/styles/partials/config.scss" as *;`
        }
      },
    },
    optimizeDeps: {
    exclude: ['vuex']
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

  ],
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
  components: true,

runtimeConfig: {
    // Private environment variables (server-side only)

    // Public environment variables (accessible client-side)
    public: {
      baseUrl: process.env.BASE_URL || 'https://api.donew.insideweddings.com/api/v2/', // Fallback to default if not found
    },
  },
  hooks: {
        // This hook is called before serving the html to the browser
        'render:route': (url, page, { req, res }) => {

            const newsCss = `
            .body.--with-news-categories-menu{ margin-top: 3rem; }
            .website-header{ position: fixed; top: 0; z-index: 999; width: 100%; height: 3em; }
            .page-layout-margin.header--desktop{ display: none; }
            .website-header__contents--mobile { padding: 0 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; background-color: #fff; }
            .page-layout-margin.breadcrumbs {width: 100%;
                max-width: 1440px;
                margin-right: auto;
                margin-left: auto;
                padding-left: 1rem;
                padding-right: 1rem;
            }
            .page-layout-margin.breadcrumbs ul {
                list-style: none;
                padding-left: 0;
                line-height: 1.5;
            }
            .page-layout-margin.news-header-image { width: 100%; max-width: 1440px; padding: 0; margin: 0;}
            .page-layout-margin.news-header-image .headings-wrapper { display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;}
            .page-layout-margin.news-header-image .title {
                margin: 0;
                font-family: Didot LT Std,serif;
                font-size: 1.5rem;
                line-height: 1.8rem;
            }
            .page-layout-margin.news-header-image .subtitle {
                margin: 0.5rem 0 0;
                font-weight: 100;
                font-family: Didot LT Std,serif;
                font-size: 1.2rem;
                line-height: 1.6rem;
                font-style: italic;
            }
            .page-layout-margin.news-header-image .intro {
                display: flex;
                flex-direction: column;
                text-align: center;
                justify-content: center;
            }
            .page-layout-margin.news-header-image .side {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
            }
            .page-layout-margin.news-header-image .image {
                flex: 1;
                height: 25rem!important;
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                -o-object-position: 50% 40%;
                object-position: 50% 40%;
            }
            .page-layout-margin.news-header-imag .figure__caption.below {
                display: block;
                opacity: 1;
                position: relative;
                padding: 0.2rem 0;
                font-size: .7rem!important;
                font-family: Didot LT Std,serif;
                margin: 0.25rem 0 0;
                opacity: 0;
                text-transform: capitalize;
                font-size: 10px!important;
            }
            @media (min-width: 1025px) {
                .page-layout-margin.header--desktop{ display: block; }
                .website-header__contents--mobile { display: none;}
                .body.--with-news-categories-menu{ margin-top: 222px; }
                .website-header{ height: 165px };
                .website-header.--news-page{ height: 222px; }
                .page-layout-margin.header--desktop{ width: 100%; max-width: 1440px; margin-right: auto; margin-left: auto; padding-left: 3rem; padding-right: 3rem;}
                .page-layout-margin.breadcrumbs { padding-left: 3rem; padding-right: 3rem; }
                .container__contents--desktop .contents__top-section {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 0;
                }
                .container__contents--desktop .top-section__logo {
                    display: flex;
                    flex: 1 1 35%;
                    align-items: center;
                    margin-right: 2rem;
                    justify-content: flex-start;
                    background-color: transparent;
                    width: 100%;
                }
                .logo__a {
                    display: inline-block;
                    max-height: 40px;
                    width: inherit;
                    max-width: 470px;
                }
                .logo__a>svg {
                    height: auto;
                    max-height: inherit;
                    width: inherit;
                    max-width: inherit;
                }
                .container__contents--desktop .top-section__navigation {
                    display: flex;
                    flex: 1 1 50%;
                    align-items: center;
                    justify-content: space-between;
                    margin: 0.5rem 0;
                }
                .global-search-form {
                    flex: 1 1;
                    margin-right: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    position: relative;
                }
                .input-group {
                    display: flex;
                    flex-wrap: nowrap;
                    flex-basis: calc(50% - 0.45rem);
                }
                .input {
                    font-weight: 100;
                    border: 1px solid #d6d6d4;
                    border-radius: 0;
                    background-color: #fff;
                    color: #000;
                    padding: 0 0.8rem;
                    font-family: Nunito,sans-serif;
                    font-size: .65rem;
                    line-height: .9rem;
                    box-shadow: inset 0 0 0.1rem #f7f7f7, 0 0 0.1rem #f7f7f7;
                    letter-spacing: .1rem;
                    width: 100%;
                }
                .input-group__search-input {
                    height: calc(2rem - 2px)!important;
                    padding-right: 2rem!important;
                    max-width: 100%;
                    flex-grow: 0;
                }
                .transparent {
                    background-color: transparent;
                }
                .input-group__search-btn {
                    width: 0.8rem;
                    margin-left: -28px!important;
                    border: none!important;
                    padding: 0!important;
                    font-family: Nunito,sans-serif;
                    font-size: .6rem;
                    line-height: .8rem;
                    display: inline-block;
                    margin: 0;
                    color: #fff;
                    font-weight: 100;
                    letter-spacing: .05rem;
                    text-transform: uppercase;
                    text-decoration: none;
                    text-align: center;
                    cursor: pointer;
                }
                .nav {
                    line-height: 0;
                }
                .support-and-subscribe {
                    display: flex;
                }
                .social-links {
                    display: flex;
                    justify-content: center;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                .container__contents--desktop .bottom-section__social-links {
                    margin-left: 2rem;
                    padding-left: 2rem;
                    border-left: 1px solid #ececec;
                }
                .social-links .social-links__item:first-child {
                    padding-left: 0;
                    margin-left: 0;
                }
                .social-links .social-links__item {
                    margin: 0 0.15rem;
                    white-space: nowrap;
                    padding: 0;
                    min-width: 25px;
                    min-height: 25px;
                }
                .social-links .social-links__item a {
                    display: flex;
                }
                .container__contents--desktop .contents__bottom-section {
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    padding: 1rem 0;
                    border: 1px solid #ececec;
                    border-right: none;
                    border-left: none;
                }
                .main-navigation-container{
                    display: flex;
                    flex: 1 1 auto;
                    justify-content: center;
                }
                .main-navigation {
                    display: flex;
                    justify-content: space-between;
                    flex: 1 1;
                }
                .main-navigation .link.with-styles {
                    white-space: nowrap;
                    padding: 0 0.25rem;
                    font-weight: 100;
                    color: #000;
                    text-decoration: none;
                    font-family: Nunito,sans-serif;
                    font-size: .65rem;
                    line-height: .9rem;
                    text-transform: uppercase;
                }
                .main-navigation .link:first-child {
                    padding-left: 0;
                    margin-left: 0;
                }
                .container__contents--desktop .contents__news-categories-section {
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    padding: 1rem 0;
                    border: none;
                    border-bottom: 1px solid #ececec;
                    background: #fff;
                }
                .news-categories-navigation{
                    display: flex;
                    flex: 1 1 100%;
                    justify-content: space-between;
                    align-items: center;
                }
                .link-wrapper {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    align-items: center;
                    justify-content: center;
                }
                .news-categories-navigation .link:first-child {
                    padding-left: 0;
                    margin-left: 0;
                }
                .news-categories-navigation .link {
                    margin: 0;
                    font-family: Didot LT Std,serif;
                    font-size: .6rem;
                    line-height: .8rem;
                    font-weight: 700;
                    text-align: center;
                }
                .news-categories-navigation .with-styles {
                    font-weight: 100;
                    color: #000;
                    text-decoration: none;
                    font-family: Nunito,sans-serif;
                    font-size: .65rem;
                    line-height: .9rem;
                    text-transform: uppercase;
                }
                .sub-navigation, .sub-navigation:after {
                    position: absolute;
                    background-color: #fff;
                }
                .sub-navigation {
                    display: none;
                    visibility: hidden;
                    flex-direction: column;
                    justify-content: center;
                    top: -1rem;
                    z-index: 6;
                    padding: 2.5rem 0 0.5rem;
                    list-style: none;
                }
                .sub-navigation-overflow-wrapper {
                    padding: 0 0.2rem;
                    overflow: auto;
                    max-height: 40vh;
                }
                .sub-navigation-item {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    text-align: center;
                    padding: 0.5rem 0;
                }
                .page-layout-margin.news-header-image { padding: 0 3rem; margin: 0 auto;}
                .page-layout-margin.news-header-image .headings-wrapper { align-items: flex-start;
                    text-align: left;
                    margin-left: 20rem;}
                .page-layout-margin.news-header-image .title {
                    font-size: 2rem;
                    line-height: 2.4rem;
                }
                .page-layout-margin.news-header-image .subtitle {
                    font-size: 1.5rem;
                    line-height: 1.8rem;
                }
                .page-layout-margin.news-header-image .intro {
                    margin-top: 1rem;
                    flex-direction: row;
                    justify-content: flex-start;
                    text-align: left;
                }
                .page-layout-margin.news-header-image .side {
                    width: 15rem;
                    margin-right: 5rem;
                }
                .page-layout-margin.news-header-image .image {
                    height: 33rem!important;
                }
                .page-layout-margin.news-header-imag .figure__caption.below {
                    line-height: .8rem;
                }
            }`;
            let css = "";
            if (url.startsWith('/news/')) {
                css = `<style>${newsCss.replace(/\s+/g, ' ')}</style>`;
            }

            page.html = page.html.replace(/\s*<!--[\s\S]*?-->\s*/g, ''); // remove comments left by v-ifs
            if (page.html.includes("lite-youtube")) {
                const lastIndex = page.html.lastIndexOf('</body>');
                const liteYoutubeScript = '<script defer type="module" src="/lite-youtube.js"></script></body>';
                page.html = page.html.slice(0, lastIndex) + liteYoutubeScript + page.html.slice(lastIndex);
            }

            const cssLinkRegex = /<link rel="stylesheet" href="\/_nuxt\/[^"]+\.css"[^>]*>/g;

            // Collect CSS links and remove them from their current position
            let matches;
            const cssLinks = [];
            while ((matches = cssLinkRegex.exec(page.html)) !== null) {
                cssLinks.push(matches[0]);
            }

            // Create a single string containing all CSS links
            const cssLinksStr = cssLinks.join('\n');
            page.html = page.html.replace(cssLinkRegex, '');
            const firstLinkPos = page.html.indexOf('<link');
            page.html = page.html.slice(0, firstLinkPos) + cssLinksStr + css + page.html.slice(firstLinkPos);
        }
    }
})
