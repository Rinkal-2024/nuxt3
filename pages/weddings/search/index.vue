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
    async asyncData({req, $http, store, route, redirect}) {
        const query = route.query
        const page = query.page ?? 1
        const limit = 11

        const params = {
            fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
            limit,
            offset: (page - 1) * limit,
            order: '-first_published_at',
            sections: ['vendors-only-widget', 'venues-only-widget', 'colors'],
            ...query
        }

        const paramsParsed = createParamsString(params)

        try {
            let [meta, data] = await requestData(
                $http,
                getMetaUri(req, route),
                `weddings_search/${paramsParsed}`
            )

            if (!meta || meta.length === 0) {
                meta = [{
                    description: `Be inspired by real weddings and find ideas for your perfect wedding day. Search hundreds of
                weddings by color, setting, genre, location, season, and style.`,
                    title: 'Weddings - Ideas & Inspiration from All Over the World | Inside Weddings'
                }]
            }

            await store.dispatch('api/weddings/hydrate', {
                meta,
                data
            })
        } catch (e) {
            if (e.statusCode === 400) {
                redirect(301, '/vendor/')
            }
        }
    },
    head() {
        return this.$store.getters['api/weddings/head']
    },
    computed: {
        ...mapGetters('api/weddings', ['totalPages']),
        moreWeddingsAvailable() {
            return this.currentWeddingsPage < this.totalPages
        }
    },
    watch: {
        currentWeddingsPage() {
            this.$nextTick(processAdsOnPage)
        }
    },
    methods: {
        async loadMoreWeddings() {
            if (this.currentWeddingsPage <= this.totalPages) {
                return
            }
            this.loading = true
            const query = this.$route.query

            const page = this.currentWeddingsPage
            const limit = 11

            const params = {
                fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
                limit,
                offset: (page) * limit,
                order: '-first_published_at',
                ...query
            }

            const paramsParsed = createParamsString(params)

            const newWeddings = await this.$http.$get(`weddings_search/${paramsParsed}`)
            await this.$store.dispatch('api/weddings/addMoreWeddings', newWeddings.items)

            this.currentWeddingsPage++
            this.loading = false
        }
    },

}
</script>

<style scoped>

</style>
