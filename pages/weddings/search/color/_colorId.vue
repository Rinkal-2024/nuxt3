<template>
    <div>
        <WeddingFilters/>
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
import colors from '~/constants/colors'
import {processAdsOnPage} from '~/utils/adapex'
import {capitalizeFirstLetter} from '~/utils/string'
import {basePath} from "~/constants/basePath";

import {stripAmpFromUrl} from "~/utils/seo";

const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'weddings',
    amp: 'hybrid',
    ampLayout: 'amp',
    data: () => ({
        currentWeddingsPage: 1,
        loading: false,
        colors
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
            colors: [routeParams.colorId]
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
                title: 'Weddings - Ideas & Inspiration from All Over the World | Inside Weddings'
            }]
        }

        await store.dispatch('api/weddings/hydrate', {
            meta,
            data
        })

    },
    computed: {
        ...mapGetters('api/weddings', ['totalPages']),
        moreWeddingsAvailable() {
            return this.currentWeddingsPage < this.totalPages
        },
        title() {
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params?.colorId
            let title = ''

            if (colorId) {
                const color = this.colors.find(x => x.id == colorId)
                const colorNameNormalized = capitalizeFirstLetter(color.name.split('-')[0])

                title = `${colorNameNormalized} Weddings - `
            }

            return title + 'Pick a Leading Color for Your Wedding | Inside Weddings'
        },
        description() {
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params?.colorId

            if (colorId) {
                const color = this.colors.find(x => x.id == colorId)
                const colorNameNormalized = color.name.split('-')[0]

                return `Be inspired by real wedding photos from ${colorNameNormalized} weddings, and find ideas for your perfect
             day. Search by style, setting and view, genre, location, season.`
            } else {
                return `Be inspired by real weddings and find ideas for your perfect wedding day. Search hundreds of
            weddings by color, setting, genre, location, season, and style.`
            }
        }
    },
    watch: {
        currentWeddingsPage() {
            this.$nextTick(processAdsOnPage)
        }
    },
    head() {
        const head = this.$store.getters['api/weddings/head']
        head.link[0].href = basePath + this.$route.path
        if (this.$isAMP) {
            const articlePath = this.$route.path
            const basePage = process.env.BASE_PAGE_URL
            head.link = head.link.filter(link => link.rel !== 'canonical')
            const canonicalLink = {
                rel: 'canonical',
                href: stripAmpFromUrl(`${basePage}${articlePath}`)
            }
            head.link.push(canonicalLink)
        }
        return head
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
                colors: [this.$route.params.colorId]
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
                title: this.title,
                description: this.description
            }
        })
    },
    mounted() {
        this.currentWeddingsPage = this.$route.query.page ?? 1
    },
    beforeMount() {
        const colorParam = this.$route.params.colorId
        if (!isNaN(colorParam) && typeof colorParam === "string") {
            const color = this.colors.find(color => color.id == colorParam) // int == string|int
            const colorName = color.name.toLowerCase().slice(0, color.name.length - 1)
            this.$router.replace(`/weddings/search/color/${colorName}`)
        }
    }
}
</script>

<style scoped>

</style>
