<template>
    <div>
        <div v-if="!$isAMP">
            <Breadcrumbs :title="title"/>
            <NewsArticleHeader/>
            <NewsArticleBody/>
            <NewsArticleRecommendedPosts v-if="recommended.length"/>
            <PageLayoutMargin>
                <NewsArticlePrevOrNextPost/>
            </PageLayoutMargin>
        </div>
        <div v-else>
            <Breadcrumbs :title="title" class="breadcrumbs"/>
            <div class="page-layout-margin">

                <amp-img :height="images[0].image.original.height"
                         :srcset="getSrcSet(images[0].image)"
                         :width="images[0].image.original.width" layout="intrinsic"/>

                <div class="headings-wrapper">
                    <h1 class="title">{{ title }}</h1>
                    <h2 class="subtitle">{{ subtitle }}</h2>
                </div>
                <div class="intro">
                    <p class="description">
                        {{ description }}
                        <span v-if="byline" class="byline">
                            By {{ byline }}
                        </span>
                    </p>
                </div>
            </div>

            <div class="html-body">
                <template v-for="(paragraph, index) in splitBody" :key="index">
                    <div v-html="paragraph" />
                    <div v-if="insertAdAfterParagraph(index) === 1" class="ad-container">
                        <AdUnit :amp-ad-slot-id="1"/>
                    </div>
                    <div v-if="insertAdAfterParagraph(index) === 2" class="ad-container">
                        <AdUnit :amp-ad-slot-id="2"/>
                    </div>
                    <div v-if="insertAdAfterParagraph(index) === 3" class="ad-container">
                        <AdUnit :amp-ad-slot-id="3"/>
                    </div>
                    <div v-if="insertAdAfterParagraph(index) === 4" class="ad-container">
                        <AdUnit :amp-ad-slot-id="4"/>
                    </div>
                    <div v-if="insertAdAfterParagraph(index) === 5" class="ad-container">
                        <AdUnit :amp-ad-slot-id="5"/>
                    </div>

                </template>
            </div>

            <VendorAdvertisement
                v-if="vendors.length"
                :vendors="vendors"
            />

            <NewsArticleRecommendedPosts v-if="recommended.length"/>

            <div class="amp-pagination">
                <Link v-if="previous" :to="prevLink">
                    {{ previous.label }}
                </Link>
                <Link v-if="next" :to="nextLink">
                    {{ next.label }}
                </Link>
            </div>

        </div>
    </div>
</template>

<script>
const {getMetaUri, requestData, createParamsString} = require('~/utils/api')
import {mapGetters} from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import IMAGE_SIZES from '~/constants/imageSizes'
import {getImageSrcSet} from "~/utils/imgSrcSet";

export default {
    name: 'newsId',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {
        LazyHydrate
    },
    computed: {
        ...mapGetters('api/newsArticle', ['title', 'images', 'subtitle', 'body', 'previous', 'next', 'description', 'byline', 'recommended', 'vendors']),
        isMobile() {
            return this.$store.getters['global/config/isMobile']
        },
        splitBody() {
            let splitBody = this.parseArticleBody(this.body).split('</p>')
            splitBody = splitBody.map((par, index) => {
                if (index < splitBody.length - 1) {
                    return par + '</p>'
                }
                return par
            })
            return splitBody
        },
        prevLink() {
            const link = this.previous.linkTo
            return `/amp/news/${link.params.category}/${link.params.news}/${link.params.newsId}/`
        },
        nextLink() {
            const link = this.next.linkTo
            return `/amp/news/${link.params.category}/${link.params.news}/${link.params.newsId}/`
        }

    },
    async asyncData({req, $http, store, route, redirect}) {
        const {newsId} = route.params

        const params = {
            fields: 'id,title,first_published_at,last_published_at,subtitle,description,images,body,video_title,video_subtitle,video_description,previous,next,byline,subcategory(*,category(*)),recommended_posts(image),vendors,videos'
        }

        if (route.query?.preview_secret) {
            params.preview_secret = route.query.preview_secret
        }

        const paramsParsed = createParamsString(params)

        try {
            const [meta, data] = await requestData(
                $http,
                getMetaUri(req, route),
                `news/${newsId}/${paramsParsed}`
            )

            await store.dispatch('api/newsArticle/hydrate', {
                meta,
                data
            })
        } catch (e) {
            redirect(301, '/not-found')
        }


    },
    head() {
        const head = this.$store.getters['api/newsArticle/head']
        const structuredData = this.$store.getters['api/newsArticle/structuredData']
        const structuredDataScript = {json: structuredData, type: 'application/ld+json'}
        head.script = head.script ? [...head.script, structuredDataScript] : [structuredDataScript]
        if (this.$isAMP) {
            const articlePath = this.$route.path
            const basePage = process.env.BASE_PAGE_URL
            const ampLink = {
                rel: 'amphtml',
                href: `${basePage}/amp${articlePath}`
            }
            head.link = head.link ? [...head.link, ampLink] : [ampLink]
        } else {
            const mainImage = this.images[0].image
            if(mainImage) {
                const mainImageLink = {
                    rel: 'preload',
                    fetchpriority: 'high',
                    as: 'image',
                    imagesrcset: getImageSrcSet(mainImage),
                    imagesizes: '(max-width: 1024px) 100vw, min(calc(100vw - 26rem), 920px)'
                }
                head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
            }
        }
        return head
    },
    methods: {
        getSrcSet(image) {
           return getImageSrcSet(image)
        },
        parseArticleBody(body) {
            // Ensures article images use the media2 media server
            body = body.replace(/media-staging/g, 'media2')
            return body
        },
        insertAdAfterParagraph(index) {
            const numberOfParagraphsBetweenAds = Math.floor(this.splitBody.length / 5)
            if (index % numberOfParagraphsBetweenAds === 0) {
                return Math.floor(index / numberOfParagraphsBetweenAds)
            }
            return false
        }
    }
}
</script>

<style scoped lang="scss">
.desktop {
    display: none;
    @include medium-and-large-screens {
        display: block;
    }
}

.mobile {
    display: none;
    @include small-and-medium-screens {
        display: block;
    }
}

.breadcrumbs :deep(li) {
  line-height: 2rem;
}

</style>
