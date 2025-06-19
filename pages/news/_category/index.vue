<template>
    <div>
        <LazyHydrate when-idle>
            <Breadcrumbs/>
        </LazyHydrate>
        <LazyHydrate when-idle>
            <NewsWeddingNews
                :loading="loading"
                :page="currentPage"
                :with-load-more-button="moreNewsAvailable"
                @loadMore="loadMoreNews"
            />
        </LazyHydrate>
        <!--        <template v-if="!$isAMP">-->
        <LazyHydrate never>
            <PageSectionSeparator/>
        </LazyHydrate>
        <LazyHydrate when-visible>
            <LazyNewsWeddingTipsFromThePros/>
        </LazyHydrate>
        <LazyHydrate never>
            <PageSectionSeparator/>
        </LazyHydrate>
        <LazyHydrate when-visible>
            <LazyNewsGetMoreAdviceFrom/>
        </LazyHydrate>
        <!--        </template>-->
    </div>
</template>

<script>
import IMAGE_SIZES from "~/constants/imageSizes";
import {mapGetters} from 'vuex'
import {processAdsOnPage} from '~/utils/adapex'
import LazyHydrate from "vue-lazy-hydration";
import {getImageSrcSet} from "~/utils/imgSrcSet";


const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'index',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {LazyHydrate},
    data: () => ({
        currentPage: 1,
        loading: false
    }),
    computed: {
        ...mapGetters('api/news', ['totalPages']),
        moreNewsAvailable() {
            return this.totalPages > this.currentPage
        }
    },
    created() {
        this.currentPage = this.$route.query.page ?? 1
    },
    async asyncData({req, $http, store, route, redirect}) {
        const page = route.query.page ?? 1
        const limit = 10
        const categorySlug = route.params.category

        const params = {
            fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
            limit,
            offset: (page - 1) * limit,
            order: '-first_published_at',
            sections: ['vendors-widget', 'extra-news-widget'],
            subcategory__category__slug: categorySlug
        }

        const paramsParsed = createParamsString(params)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `news/${paramsParsed}`
        )

        if (page > 1 && data.items.length === 0) { // No news found on this page
            redirect(301, '/news/')
        }

        await store.dispatch('api/news/hydrate', {
            meta,
            data
        })

    },
    watch: {
        currentPage() {
            this.$nextTick(processAdsOnPage)
        }
    },
    methods: {
        async loadMoreNews() {
            this.currentPage += 1

            const page = this.currentPage
            const categorySlug = this.$route.params.category
            const limit = 10

            const params = {
                fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
                limit,
                offset: (page - 1) * limit,
                order: '-first_published_at',
                subcategory__category__slug: categorySlug
            }

            const paramsParsed = createParamsString(params)

            const [data] = await requestData(
                this.$http,
                `news/${paramsParsed}`
            )

            await this.$store.dispatch('api/news/addMoreNews', {
                data
            })
        }
    },
    head() {
        const head = this.$store.getters['api/news/head']
        const mainImage = this.items?.length && this.items[0].main_image?.image
        if (mainImage) {
            const mainImageLink = {
                rel: 'preload',
                fetchpriority: 'high',
                as: 'image',
                imagesrcset: getImageSrcSet(mainImage),
                imagesizes: '(max-width: 1024px) 100vw, min(calc(100vw - 26rem), 920px)'
            }
            head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
        }
        return head
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.listing-section {
    margin-top: 2rem;
}

</style>
