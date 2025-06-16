import {basePath} from '~/constants/basePath'
import {
    HIDE_SIDEBAR_NEWSLETTER_CODE,
    NEWSLETTER_GATE_CODE,
} from '~/constants/articleFeatureCodes'
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,

    isGallery: state => state.data.images > 1,
    images: state => state.data.images,
    body: state => state.data.body,
    byline: state => state.data.byline,
    backToLink: state => ({
        name: 'news-category',
        params: {
            category: state.data.subcategory.category.slug
        }
    }),
    category: state => state.data.subcategory.category.name,
    title: state => state.data.title,
    subtitle: state => state.data.subtitle,
    description: state => state.data.description,
    subcategoryLinkTo: state => ({
        name: 'news-category-subcategory',
        params: {
            category: state.data.subcategory.category.slug,
            subcategory: state.data.subcategory.slug
        }
    }),
    subcategory: state => state.data.subcategory.name,
    datePublished: state => state.data.first_published_at?.slice(0, 10),
    dateModified: state => state.data.last_published_at?.slice(0, 10),
    mainImageUrl: state => state.meta?.image?.original?.url ?? '',
    authorByline: state => state.data.byline,
    next: state => {
        if (!state.data.next) {
            return null
        }

        return {
            ...state.data.next,
            image: state.data.next.main_image.image,
            linkTo: {
                name: 'news-category-news-newsId',
                params: {
                    category: state.data.next.subcategory.category.slug,
                    news: state.data.next.slug,
                    newsId: state.data.next.id
                }
            },
            label: 'NEXT POST'
        }
    },
    previous: state => {
        if (!state.data.previous) {
            return null
        }

        return {
            ...state.data.previous,
            image: state.data.previous.main_image.image,
            linkTo: {
                name: 'news-category-news-newsId',
                params: {
                    category: state.data.previous.subcategory.category.slug,
                    news: state.data.previous.slug,
                    newsId: state.data.previous.id
                }
            },
            label: 'PREVIOUS POST'
        }
    },
    // recommended: state => state.data.recommended_posts,
    recommended: state => {
      return state.data.recommended_posts?.map(post => {
          if(post.url.startsWith('http')){ // Stripping first part of address from post urls
              post.url = post.url.split('.com')[1]
          }
          return post
      })
    },
    vendors: state => state.data.vendors,
    videos: state => ({
        title: state.data.video_title,
        subtitle: state.data.video_subtitle,
        description: state.data.video_description,
        videos: state.data.videos
    }),
    route: () => {
        return this.$route
    },
    structuredData: (state, getters) => {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${basePath}${state?.meta?.path}` //article URL
            },
            "headline": state.data.title, //article headline
            "image": [
                getters.mainImageUrl //distinctive picture. Here can be add more pictures - after the comma in quotation marks
            ],
            "datePublished": getters.datePublished, // first publish date in format YYYY-MM-DD
            "dateModified": getters.dateModified, // last publish date in format YYYY-MM-DD
            "author": {
                "@type": "Person",
                "name": getters.authorByline // author of this article
            },
            "publisher": {
                "@type": "Organization",
                "name": "Inside Weddings",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${basePath}/iw_logo_png.png` // in here logo should be in png or jpg. Otherwise an error will occur
                }
            }
        }
    },
    displayNewsletterSignup: state => {
        return !state.data.body.includes(HIDE_SIDEBAR_NEWSLETTER_CODE)
    },
    hasMailGate: state => {
        return state.data.body.includes(NEWSLETTER_GATE_CODE)
    },
    mailGateBody: state => {
        return state.data.body.split(NEWSLETTER_GATE_CODE)[0]
    }

}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },

    SET_DATA(state, data) {
        const newData = { ...data }
        Object.freeze(newData)
        state.data = newData
    }

}

export const actions = {
    async hydrate({dispatch, commit, getters}, {meta, data}) {

        commit('SET_META', meta[0] ?? null)

        commit('SET_DATA', data ?? null)

        // Elements' hydration

    }
}
