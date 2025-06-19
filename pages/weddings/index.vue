<template>
    <div>
            <!--            <WeddingFilters v-if="!$isAMP"/>-->
            <WeddingFilters/>
            <Breadcrumbs/>
            <WeddingsRealWeddings
                :loading="loading"
                :page="currentWeddingsPage"
                :with-load-more-button="moreWeddingsAvailable"
                @loadMore="loadMoreWeddings"
            />
        <!--        <AdUnit :amp-ad-slot-id="1"/>-->
        <!--        <PageSectionSeparator />-->
        <!--        <GetToKnowSection />-->
        <!--        <PageSectionSeparator />-->
        <!--        <AdUnit ad-slot-name="locationsWeLove" />-->
        <!--        <LocationsWeLove />-->
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {processAdsOnPage} from '~/utils/adapex'
import LazyHydrate from "vue-lazy-hydration";

const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'weddings',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {LazyHydrate},
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
            sections: [
                'vendors-only-widget',
                'venues-only-widget',
                'colors'
            ]
        }

        const paramsParsed = createParamsString(params)

        const [meta, data, info] = await requestData(
            $http,
            getMetaUri(req, route),
            `weddings/${paramsParsed}`,
            `weddings_landing_page`
        )

        data.info = info

        if (page > 1 && data.items.length === 0) { // No weddings found on this page
            redirect(301, '/weddings/')
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

            const params = {
                fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
                limit,
                offset: page * limit,
                order: '-first_published_at',
            }

            const paramsParsed = createParamsString(params)

            const newWeddings = await this.$http.$get(`weddings/${paramsParsed}`)
            await this.$store.dispatch('api/weddings/addMoreWeddings', newWeddings.items)

            this.currentWeddingsPage++
            this.loading = false
        }
    },
    mounted() {
        this.currentWeddingsPage = this.$route.query.page ?? 1
    }
}
</script>

<style scoped>

</style>
