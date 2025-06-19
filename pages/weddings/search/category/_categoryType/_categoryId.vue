<template>
    <div>
        <WeddingFilters/>
        <Breadcrumbs/>
        <WeddingsRealWeddings
            :loading="loading"
            :page="currentWeddingsPage"
            :with-load-more-button="moreWeddingsAvailable"
            @loadMore="loadMoreWeddings"
        />
        <PageSectionSeparator/>
        <GetToKnowSection/>
        <PageSectionSeparator/>
        <LocationsWeLove/>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {FILTERS} from '~/constants/weddingsFilters'
import {processAdsOnPage} from '~/utils/adapex'

const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'weddings',
    amp: 'hybrid',
    ampLayout: 'amp',
    data: () => ({
        currentWeddingsPage: 1,
        loading: false
    }),
    async asyncData({req, $http, store, route}) {
        const routeParams = route.params
        const page = route.query.page ?? 1
        const limit = 11

        const params = {
            fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
            limit,
            offset: (page - 1) * limit,
            order: '-first_published_at',
            sections: ['vendors-only-widget', 'venues-only-widget', 'colors'],
            [routeParams?.categoryType]: routeParams?.categoryId
        }

        const paramsParsed = createParamsString(params)

        let [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `weddings_search/${paramsParsed}`
        )

        if (!meta || meta.length === 0) {
            meta = [{
                description: `Be inspired by real weddings and find ideas for your perfect wedding day. Search hundreds of
            weddings by color, setting, genre, location, season, and style.`,
                title: 'Weddings - Ideas & Inspiration from All Over the World | Inside Weddings',
                path: route.fullPath
            }]
        }

        await store.dispatch('api/weddings/hydrate', {
            meta,
            data
        })

    },
    head() {
        return this.$store.getters['api/weddings/head']
    },
    computed: {
        ...mapGetters('api/weddings', ['totalPages']),
        moreWeddingsAvailable() {
            return this.currentWeddingsPage < this.totalPages
        },
        metaTitle() {
            const categoryType = this.$route.params?.categoryType
            const categoryId = this.$route.params?.categoryId

            if (categoryType && categoryId) {

                for (const filter of Object.keys(FILTERS)) {

                    if (FILTERS[filter].queryKey === categoryId) {
                        return `${FILTERS[filter].metaTitle}`
                    }

                }
            }

            return 'Weddings - Ideas & Inspiration from All Over the World | Inside Weddings'
        }
    },
    watch: {
        currentWeddingsPage() {
            this.$nextTick(processAdsOnPage)
        }
    },
    methods: {
        async loadMoreWeddings() {
            this.loading = true
            const page = this.currentWeddingsPage
            const limit = 11

            const routeParams = this.$route.params
            const params = {
                fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
                limit,
                offset: page * limit,
                order: '-first_published_at',
                [routeParams?.categoryType]: routeParams?.categoryId
            }

            const paramsParsed = createParamsString(params)

            const newWeddings = await this.$http.$get(`weddings_search/${paramsParsed}`)
            await this.$store.dispatch('api/weddings/addMoreWeddings', newWeddings.items)

            this.currentWeddingsPage++
            this.loading = false
        }
    },
    created() {
        this.$store.dispatch('api/weddings/hydrate', {
            meta: {
                title: this.metaTitle
            }
        })
    },
    mounted() {
        this.currentWeddingsPage = this.$route.query.page ?? 1
    }

}
</script>

<style scoped>

</style>
