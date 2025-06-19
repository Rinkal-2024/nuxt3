<template>
    <div>
        <GalleriesFilters/>
        <Breadcrumbs :title="currentColor"/>
        <PageSection :title="title" without-top-body-margin :style="photoLibarySectionStyle">
            <PhotoLibrary
                :ad-units="['galleryAd1', '', 'galleryAd2', '']"
                :images="images"
                id="photo-library"
                strict-width
            />
            <template v-if="!$isAMP">
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
        </PageSection>
    </div>
</template>

<script>
import {processAdsOnPage} from '~/utils/adapex'
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
            'totalPages'
        ]),
        currentColor() {
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params.colorId

            let color = this.colors.find(color => color.id == colorId) // int == string|int
            color = color.name.substring(0, color.name.length - 1) // yellows -> yellow
            return color
        },
        title() {
            return `Photo Library Search Results for ${this.currentColor}:`
        },
        moreImagesAvailable() {
            return this.currentPage < this.totalPages
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
            return 'min-height: 900px';
        }
    },
    async asyncData({req, $http, store, route, redirect}) {
        const query = route.query
        const page = query.page ?? 1
        const limit = 36
        const colors = route.params.colorId

        const params = {
            fields: 'image,category(*)',
            limit,
            offset: (page - 1) * limit,
            order: '-created',
            sections: ['galleries-categories', 'colors'],
            showOnGallery: true,
            colors
        }

        const paramsParsed = createParamsString(params)

        let [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `galleries_search/${paramsParsed}`
        )

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
        meta[0].path = route.fullPath

        if (page > 1) {
            meta[0].title += ` - page ${page}`
            meta[0].description += ` - page ${page}`
        }

        await store.dispatch('api/galleries/hydrate', {
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
        return this.$store.getters['api/galleries/head']
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        async loadMoreImages() {
            if (this.loading) {
                return
            }

            this.loading = true
            const limit = 36
            const colors = this.$route.params.colorId

            const params = {
                fields: 'image,category(*)',
                limit,
                offset: this.currentPage * limit,
                order: '-created',
                showOnGallery: true,
                colors
            }
            const paramsParsed = createParamsString(params)
            const images = await this.$http.$get(`galleries_search/${paramsParsed}`)
            await this.$store.dispatch('api/galleries/addImages', images.items)
            this.currentPage++
            this.loading = false
        }
    },
    beforeMount() {
        const colorParam = this.$route.params.colorId
        if (!isNaN(colorParam) && typeof colorParam === "string") {
            const color = this.colors.find(color => color.id == colorParam) // int == string|int
            const colorName = color.name.toLowerCase().slice(0, color.name.length - 1)
            this.$router.replace(`/inspiration/images/color/${colorName}`)
        }
    },
    created() {
        this.currentPage = this.$route.query.page ?? 1
    }
}
</script>

<style lang="scss" scoped>

</style>
