<template>
    <div>
        <LazyHydrate when-idle>
            <Breadcrumbs :title="categoryTitle"/>
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
import {processAdsOnPage} from '~/utils/adapex'
import {getRelatedVendorCategory} from "~/utils/news";
import LazyHydrate from "vue-lazy-hydration";
import {mapGetters} from 'vuex'
import IMAGE_SIZES from "~/constants/imageSizes";
import {getImageSrcSet} from "~/utils/imgSrcSet";


const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'index',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {
        LazyHydrate
    },
    data: () => ({
        currentPage: 1,
        loading: false
    }),
    computed: {
        ...mapGetters('api/news', ['totalPages', 'categoryTitle']),
        moreNewsAvailable() {
            return this.totalPages > this.currentPage
        }
    },
    async asyncData({req, $http, store, route, redirect}) {
        // NEWS
        const page = route.query.page ?? 1
        const limit = 10
        const categorySlug = route.params.category
        const subcategorySlug = route.params.subcategory

        const params = {
            fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
            limit,
            offset: (page - 1) * limit,
            order: '-first_published_at',
            sections: ['vendors-widget', 'extra-news-widget'],
            subcategory__category__slug: categorySlug,
            subcategory__slug: subcategorySlug
        }

        const paramsParsed = createParamsString(params)

        // VENDORS FOR CAROUSEL
        const vendorCarouselCategory = getRelatedVendorCategory(subcategorySlug)
        const categories = vendorCarouselCategory?.relatedVendorCategory
        const isVenue = vendorCarouselCategory?.relatedVendorIsVenue || false

        const vendorParams = {
            fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*)',
            isVenue,
            limit: 15,
            offset: 0,
            sections: 'vendors-categories',
            willingToTravel: true,
        }
        if (categories) {
            vendorParams.categories = categories
        }

        const vendorParamsParsed = createParamsString(vendorParams)

        const [meta, data, vendors] = await requestData(
            $http,
            getMetaUri(req, route),
            `news/${paramsParsed}`,
            `vendors_search/${vendorParamsParsed}`
        )

        if (page > 1 && data.items.length === 0) { // No news found on this page
            redirect(301, '/news/')
        }

        data.vendors = vendors;
        data.categoryTitle = vendorCarouselCategory?.title || vendorCarouselCategory?.name || null

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
    },
    methods: {
        async loadMoreNews() {
            this.currentPage += 1

            const page = this.currentPage
            const categorySlug = this.$route.params.category
            const subcategorySlug = this.$route.params.subcategory
            const limit = 10

            const params = {
                fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
                limit,
                offset: (page - 1) * limit,
                order: '-first_published_at',
                subcategory__category__slug: categorySlug,
                subcategory__slug: subcategorySlug
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
    }
}
</script>

<style lang="scss" scoped>

.listing-section {
    margin-top: 2rem;
}

</style>
