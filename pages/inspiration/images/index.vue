<template>
    <div>
        <GalleriesFilters/>
        <Breadcrumbs class="galleries__breadcrumbs"/>
        <PageSection
            :description="landingPageIntroduction"
            :description-as-html="introductionIsHtml"
            :subtitle="landingPageSubtitle"
            :title="landingPageTitle"
            class="galleries-carousel-section"
            subtitleTag="h2"
            titleTag="h1"
            without-top-body-margin
        >
            <CategoryCarousel
                :categories="categories"
                urlPrefix="/inspiration/images/category/"
                linkToLabel="View gallery"
            />
        </PageSection>
        <PageSectionSeparator/>
        <PageSection without-top-body-margin :style="photoLibarySectionStyle" >
            <!--            <AdUnit ad-slot-name="galleryPhotoLibrary" />-->
            <PhotoLibrary
                :ad-units="['galleryAd1', '', 'galleryAd2', '']"
                :images="images"
                id="photo-library"
                strict-width
            />
            <template v-if="!$isAMP">
                <div v-waypoint="{ active: true, callback: loadMoreImages, intersectionOptions }"/>
                <div v-if="moreImagesAvailable" class="button-wrapper">
                    <Button id="gallery-load-more" >Load more</Button>
                    <div id="gallery-loading" class="hidden"><LoadingIndicator/></div>
                </div>
            </template>
            <div v-else class="amp-pagination reduce-margin">
                <Link v-if="currentPage > 1" :to="prevAMPPage">
                    Previous page
                </Link>
                <Link v-if="currentPage < totalPages" :to="nextAMPPage">
                    Next page
                </Link>
            </div>
            <AccordionText
                v-show="landingPageDescription"
                :html="landingPageDescription"
                low-profile
            />
        </PageSection>
    </div>
</template>

<script>
import {createParamsString, getMetaUri, requestData} from '~/utils/api'
import {mapGetters} from 'vuex'
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
Vue.use(VueWaypoint)

export default {
    name: 'galleries',
    amp: 'hybrid',
    ampLayout: 'amp',
    data: () => ({
        subtitle: 'Browse Pictures and Images by Popular Themes',
        currentPage: 1,
        loading: false,
        intersectionOptions: {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0, 1]
        }
    }),
    computed: {
        ...mapGetters('api/galleries', [
            'colors',
            'categories',
            'images',
            'totalPages',
            'landingPageTitle',
            'landingPageSubtitle',
            'landingPageIntroduction',
            'landingPageDescription'
        ]),
        moreImagesAvailable() {
            return this.currentPage < this.totalPages
        },
        introductionIsHtml() {
            return Array.isArray(this.landingPageIntroduction)
        },
        prevAMPPage() {
            return {
                path: this.$route.path,
                query: {
                    page: parseInt(this.currentPage) - 1
                }
            }
        },
        nextAMPPage() {
            return {
                path: this.$route.path,
                query: {
                    page: parseInt(this.currentPage) + 1
                }
            }
        },
        photoLibarySectionStyle() {
            return 'min-height: 600px';
        },
        urlPrefix() {
            return ''
        }
    },
    async asyncData({req, $http, store, route, redirect}) {
        const page = route.query.page ?? 1
        const limit = 36

        const params = {
            fields: 'image,category(*)',
            limit,
            offset: (page - 1) * limit,
            order: '-created',
            sections: ['galleries-categories', 'colors'],
            showOnGallery: true
        }

        const paramsParsed = createParamsString(params)

        let [meta, data, info] = await requestData(
            $http,
            getMetaUri(req, route),
            `galleries/${paramsParsed}`,
            `galleries_landing_page`
        )

        data.info = info

        if (page > 1 && data.items.length === 0) { // No images found on this page
            redirect(301, '/inspiration/images/')
        }

        if (!meta || meta.length === 0) {
            meta = [{
                title: '',
                description: ''
            }]
        }

        meta[0].title = meta[0].title || `Photos & Inspiration Galleries | Inside Weddings`
        meta[0].description = meta[0].description || `In this wedding photo gallery, you will find images that can inspire your own
        wedding. You can also sort the photos by categories and your wedding colors!`

        if (page > 1) {
            meta[0].title += ` - page ${page}`
            meta[0].description += ` - page ${page}`
        }

        await store.dispatch('api/galleries/hydrate', {
            meta,
            data
        })

    },
    head() {
        return this.$store.getters['api/galleries/head']
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        async loadMoreImages({direction}) {
            if (this.loading || direction !== 'top' || !this.moreImagesAvailable) {
                return
            }

            this.loading = true
            const limit = 36

            const params = {
                fields: 'image,category(*)',
                limit,
                offset: this.currentPage * limit,
                order: '-created',
                showOnGallery: true
            }
            const paramsParsed = createParamsString(params)
            const images = await this.$http.$get(`galleries/${paramsParsed}`)
            await this.$store.dispatch('api/galleries/addImages', images.items)
            this.currentPage++
            this.loading = false
        }
    },
    created() {
        this.currentPage = this.$route.query.page ?? 1
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.galleries-carousel-section ::v-deep .section {
    margin-top: -1rem;
}

@include small-and-medium-screens {
    .galleries__breadcrumbs {
        margin-bottom: 4rem;
        margin-top: -0.5rem;
    }
}

</style>
