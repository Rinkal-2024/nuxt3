<template>
    <div class="vendor-page">
        <Breadcrumbs :title="name" class="desktop"/>
        <VendorPageHeader/>
        <div id="vendor-gallery-slider" class="slider">
            <div class="slide" v-for="(item, index) in sliderImages" :key="item.id" :style="calcStyle(index)">
                <Link :to="imageLink(item)">
                    <Photo
                        :image="item.image"
                        isSharable
                        :lazy="index > 0"
                        :sizes="sizes"
                        :withPhotoCreditsPosition="topRight"
                        class="slider_image"
                        withPhotoCredits
                    />
                </Link>
            </div>
            <button class="slider-btn slider-btn-next" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" class="shp0" d="M358.57 255.99L130.96 18.03C126.9 13.77 127.05 7.02 131.3 2.95C135.53 -1.12 142.28 -0.95 146.38 3.28L381.05 248.62C384.98 252.74 384.98 259.24 381.05 263.37L146.38 508.7C144.28 510.89 141.48 511.99 138.67 511.99C136.02 511.99 133.36 511.01 131.3 509.03C127.05 504.96 126.9 498.21 130.96 493.95L358.57 255.99Z" /></svg></button>
            <button class="slider-btn slider-btn-prev" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" class="shp0" d="M153.43 255.99L381.04 18.03C385.1 13.77 384.95 7.02 380.7 2.95C376.47 -1.12 369.72 -0.95 365.62 3.28L130.95 248.62C127.02 252.74 127.02 259.24 130.95 263.37L365.62 508.7C367.72 510.89 370.52 511.99 373.33 511.99C375.98 511.99 378.64 511.01 380.7 509.03C384.95 504.96 385.1 498.21 381.04 493.95L153.43 255.99Z" /></svg></button>
        </div>
        <VenuePlaces/>
        <ContactInformation/>
        <Breadcrumbs :title="name" class="mobile"/>
        <RelatedWeddings/>
        <RelatedNews/>
        <Portfolio :loading="loading" with-show-more-button
                        @loadMore="loadMorePortfolioImages"/>
        <PageSection class="vendor-videos without-top-body-margin" title="Videos" v-if="videos.length > 0">
            <div class="video-container">
                <CardStyle6
                    v-for="video in videos"
                    :key="video.id"
                    :video="video"
                />
            </div>
        </PageSection>
        <Description/>
        <GetInTouch/>
    </div>
</template>

<script>
const {getMetaUri, requestData, createParamsString} = require('~/utils/api')
import {mapGetters} from 'vuex'
import {getImageSrcSet, getImageSizes} from "~/utils/imgSrcSet";

export default {
    name: 'vendorPage',
    amp: 'hybrid',
    ampLayout: 'amp',
    computed: {
        ...mapGetters('api/vendorPage', [
            'images',
            'landscapeGalleryImages',
            'videos',
            'name'
        ]),
        sliderImages() {
            return this.landscapeGalleryImages;
        },
        sizes() {
            return getImageSizes(100);
        },
    },
    async asyncData({req, $http, store, route, redirect}) {
        const {id} = route.params

        const params = {
            fields: '*,city(id,display_name),weddings(slug,event_type_display,title,main_image),news(slug,title,subtitle,description,main_image,subcategory(*,category(*)))'
        }

        if (route.query?.preview_secret) {
            params.preview_secret = route.query.preview_secret
        }

        const paramsPortfolio = {
            fields: 'image,category(id,slug)',
            limit: 12,
            offset: 0,
            order: '-created',
            vendorId: id
        }

        const paramsParsed = createParamsString(params)
        const portfolioParamsParsed = createParamsString(paramsPortfolio)

        try {
            const [meta, data, portfolio] = await requestData(
                $http,
                getMetaUri(req, route),
                `vendors/${id}/${paramsParsed}`,
                `vendor_portfolio/${portfolioParamsParsed}`
            )

            // Get vendor's category details
            let category = null
            if (data.categories.length > 0) {
                category = await $http.$get(data.categories[0].meta.detail_url)
            }

            await store.dispatch('api/vendorPage/hydrate', {
                meta,
                data,
                portfolio,
                category
            })
        } catch (e) {
            if (e.response.status === 404) { //Vendor is gone! Redirect to vendor list
                redirect(301, '/vendor/')
            }
        }


    },
    data: () => ({
        currentPage: 1,
        loading: false
    }),
    head() {
        const head = this.$store.getters['api/vendorPage/head']
        const structuredData = this.$store.getters['api/vendorPage/structuredData']
        const structuredDataScript = {json: structuredData, type: 'application/ld+json'}
        head.script = head.script ? [...head.script, structuredDataScript] : [structuredDataScript]
        const mainImage = this.$store.getters['api/vendorPage/landscapeGalleryImages'][0]?.image;
        if (mainImage) {
            const mainImageLink = {
                 rel: 'preload',
                 fetchpriority: 'high',
                 as: 'image',
                 imagesrcset: getImageSrcSet(mainImage),
                 imagesizes: getImageSizes(100)
            }
            head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
        }
        return head
    },
    methods: {
        async loadMorePortfolioImages() {
            this.loading = true
            const {id} = this.$route.params

            const paramsPortfolio = {
                fields: 'image,category(id,slug)',
                limit: 12,
                offset: this.currentPage * 12,
                order: '-created',
                vendorId: id
            }
            const portfolioParamsParsed = createParamsString(paramsPortfolio)
            const portfolioImages = await this.$http.$get(`vendor_portfolio/${portfolioParamsParsed}`)
            await this.$store.dispatch('api/vendorPage/addPortfolioPhotos', portfolioImages.items)
            this.currentPage++
            this.loading = false
        },
        calcStyle(index) {
            return `transform: translateX(${index * 100}%)`;
        },
        imageLink(item) {
            const categorySlug = item?.category?.slug || 'no-categorized'
            return `/inspiration/photo/${item.id}/${categorySlug}/${item.image.slug}/`;
        }
    }
}
</script>

<style lang="scss" scoped>

.breadcrumbs.mobile {
    ::v-deep ul {

        margin: 0 0.5rem;
    }

    ::v-deep li {
        line-height: 2rem;
    }
}

.video-container {
    text-align: center;
}

.vendor-videos {
 ::v-deep {
        .title {
            @include apply-font-and-size("heading", 9);
            font-weight: 100;
        }
    }
}
</style>
