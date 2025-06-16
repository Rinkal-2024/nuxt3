<template>
    <PageSection
        :description="categoryIntroduction"
        :subtitle="landingPageSubtitle"
        :title="title"
        class="weddings-real-weddings"
        subtitleTag="h2"
        titleTag="h1"
    >
        <WeddingsPhotoGridList v-if="items.length > 0" :items="items"/>
        <EmptyListMessage v-if="items.length === 0">
            No results found.
        </EmptyListMessage>
        <!--        <AdUnit ad-slot-name="weddingsAbovePagination" />-->
        <div v-waypoint="{ active: true, callback: autoLoadMoreContent, intersectionOptions }"/>
        <template v-if="!$isAMP">
            <div v-if="withLoadMoreButton" class="button-wrapper">
                <Button id="real-weddings-load-more" >Load more</Button>
                <div id="real-weddings-loading" class="hidden"><LoadingIndicator/></div>
            </div>
        </template>
        <template v-else>
            <div class="amp-pagination reduce-margin">
                <Link v-if="page > 1" :to="prevAMPPage">
                    Previous page
                </Link>
                <Link v-if="page < totalPages" :to="nextAMPPage">
                    Next page
                </Link>
            </div>
        </template>
        <AccordionText v-if="isLandingPage" v-show="categoryDescription" :html="categoryDescription"
                       low-profile/>
        <AccordionText v-else v-show="categoryDescription" low-profile>
            {{ categoryDescription }}
        </AccordionText>
    </PageSection>
</template>

<script>
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
Vue.use(VueWaypoint)

import {mapGetters} from 'vuex'
import {FILTERS} from '~/constants/weddingsFilters'
import colors from '~/constants/colors'

const capitalize = str => str[0].toUpperCase() + str.slice(1)

export default {
    name: 'WeddingsRealWeddings',
    data: () => ({
        defaultSubtitle: 'Be inspired by real weddings and find ideas for your perfect wedding day. Search hundreds of weddings by color, setting, genre, location, season, and style.',
        filters: FILTERS,
        colors,
        intersectionOptions: {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0, 1]
        },
        throttleLock: false
    }),
    props: {
        withLoadMoreButton: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        page: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ...mapGetters('api/weddings', [
            'items',
            'totalPages',
            'landingPageTitle',
            'landingPageSubtitle',
            'landingPageIntroduction',
            'landingPageDescription'
        ]),
        ...mapGetters('global/config', ['isMobile']),
        isLandingPage() {
            return this.$route.name === 'weddings'
        },
        title() {
            if (this.isLandingPage) {
                return this.landingPageTitle
            }
            const categoryType = this.$route.params?.categoryType
            const categoryId = this.$route.params?.categoryId
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params?.colorId

            if (categoryType && categoryId) {

                for (const filter of Object.keys(this.filters)) {

                    if (this.filters[filter].queryKey === categoryId) {
                        return `${this.filters[filter].title}`
                    }

                }
            }

            if (colorId) {
                const color = this.colors.find(x => x.id == colorId)
                const colorNameNormalized = capitalize(color.name.split('-')[0])

                return FILTERS[color.name]?.title || `${colorNameNormalized} Weddings`
            }

            return 'Weddings - Ideas & Inspiration'
        },
        categoryIntroduction() {
            if (this.isLandingPage) {
                return this.landingPageIntroduction
            }
            const categoryType = this.$route.params?.categoryType
            const categoryId = this.$route.params?.categoryId
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params?.colorId

            if (categoryType && categoryId) {
                return FILTERS[categoryId]?.introduction || this.defaultSubtitle
            }

            if (colorId) {
                const color = this.colors.find(x => x.id == colorId)

                return FILTERS[color.name]?.introduction || this.defaultSubtitle
            }

            return ''
        },
        categoryDescription() {
            if (this.isLandingPage) {
                return this.landingPageDescription
            }
            const colorId = this.$store.getters['global/config/colorIdSelected'] || this.$route.params?.colorId

            if (colorId && !this.$route.params.categoryId) {
                const color = this.colors.find(x => x.id == colorId)

                return FILTERS[color.name]?.description || ''
            }

            return FILTERS[this.$route.params.categoryId]?.description || ''
        },
        currentRoutePath() {
            return this.$route.path;
        },
        prevAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: this.page - 1
                }
            }
        },
        nextAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: this.page + 1
                }
            }
        }
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        autoLoadMoreContent({going}) {
            if (this.loading || this.throttleLock) {
                return
            }

            this.throttleLock = true
            setTimeout(() => {
                this.throttleLock = false
            }, 1000)

            if (going === this.$waypointMap.GOING_IN) {
                this.loadMoreContent()
            }
        },
        loadMoreContent() {
            this.$emit('loadMore')
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

</style>
