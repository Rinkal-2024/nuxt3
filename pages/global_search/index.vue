<template>
    <div>
        <GlobalSearchHeader
            :global-search-field-value="globalSearchFieldValue"
            :total-count="totalCount"
            @filter="pageChanged"
        />
            <PageSection
                title="News"
                v-if="isSectionVisible('NEWS')">

                <LatestWeddingNewsList
                    v-if="news.length > 0"
                    :articles="displayedNews"
                />
                <EmptyListMessage
                    v-else
                    class="center"
                >
                    No results found.
                </EmptyListMessage>

<!--                <div v-if="isSectionSelected('NEWS')" v-waypoint="{ active: true, callback: loadMoreNews, intersectionOptions }" />-->
                <div v-if="isSectionSelected('NEWS')">
                    <div v-if="totalCount > 12" class="button-wrapper">
                        <Button
                            id="search-load-more"
                            :data-query="globalSearchFieldValue"
                            data-search-type="news"
                            :data-total="totalCount"
                            data-offset="12"
                            data-render-to=".js-news-articles-container"
                        >
                            Load more
                        </Button>
                        <div class="hidden js-search-more-loading"><LoadingIndicator/></div>
                    </div>
                </div>
                <div v-if="news.length > 0 && !isSectionSelected('NEWS')" class="see-more-btn-container">
                    <Link
                        without-styles
                        :to="getCategoryLink('news')"
                        @click="pageChanged"
                    >
                        <Button
                            variant="outline"
                            class="see-more-btn"
                        >
                            View all results
                        </Button>
                    </Link>
                </div>

            </PageSection>

            <PageSectionSeparator v-if="showSeparators && isSectionVisible('NEWS')"/>

            <PageSection
                title="Real Weddings"
                v-if="isSectionVisible('WEDDINGS')"
            >
                <Cards v-if="weddings.length > 0" class="js-weddings-container">
                    <CardStyle1
                        v-for="item in displayedWeddings"
                        :key="item.key"
                        :image="item.main_image.image"
                        :title="item.title"
                        :link-to="getWeddingPath(item)"
                        category="Real wedding"
                        with-hover-call-to-action
                        with-link-as-button
                        link-title="See wedding"
                    />
                </Cards>

                <EmptyListMessage
                    v-else
                    class="center"
                >
                    No results found.
                </EmptyListMessage>

<!--                <div v-if="isSectionSelected('WEDDINGS')" v-waypoint="{ active: true, callback: loadMoreWeddings, intersectionOptions }" />-->
                <div v-if="isSectionSelected('WEDDINGS')">
                    <div v-if="totalCount > 12" class="button-wrapper">
                        <Button
                            id="search-load-more"
                            :data-query="globalSearchFieldValue"
                            data-search-type="weddings"
                            :data-total="totalCount"
                            data-offset="12"
                            data-render-to=".js-weddings-container"
                        >
                            Load more
                        </Button>
                        <div class="hidden js-search-more-loading"><LoadingIndicator/></div>
                    </div>
                </div>
                <div v-if="weddings.length > 0 && !isSectionSelected('WEDDINGS')" class="see-more-btn-container">
                    <Link
                        without-styles
                        :to="getCategoryLink('weddings')"
                        @click="pageChanged"
                    >
                        <Button
                            variant="outline"
                            class="see-more-btn"
                        >
                            View all results
                        </Button>
                    </Link>
                </div>

            </PageSection>

            <PageSectionSeparator v-if="showSeparators && isSectionVisible('WEDDINGS')"/>

            <PageSection
                title="Vendors & Venues"
                v-if="isSectionVisible('VENDORS')"
            >
                <VendorsList
                    v-if="vendors.length > 0"
                    :vendors="displayedVendors"
                    container-class="js-vendors-container"
                />

                <EmptyListMessage
                    v-else
                    class="center"
                >
                    No results found.
                </EmptyListMessage>

<!--                <div v-if="isSectionSelected('VENDORS')" v-waypoint="{ active: true, callback: loadMoreVendors, intersectionOptions }" />-->
                <div v-if="isSectionSelected('VENDORS')">
                    <div v-if="totalCount > 12" class="button-wrapper">
                        <Button
                            id="search-load-more"
                            :data-query="globalSearchFieldValue"
                            data-search-type="vendors"
                            :data-total="totalCount"
                            data-offset="12"
                            data-render-to=".js-vendors-container"
                        >
                            Load more
                        </Button>
                        <div class="hidden js-search-more-loading"><LoadingIndicator/></div>
                    </div>
                </div>
                <div v-if="vendors.length > 0 && !isSectionSelected('VENDORS')" class="see-more-btn-container">
                    <Link
                        without-styles
                        :to="getCategoryLink('vendors')"
                        @click="pageChanged"
                    >
                        <Button
                            variant="outline"
                            class="see-more-btn"
                        >
                            View all results
                        </Button>
                    </Link>
                </div>

            </PageSection>

            <PageSectionSeparator v-if="showSeparators && isSectionVisible('VENDORS')"/>

            <PageSection
                title="Photo Library"
                v-if="isSectionVisible('GALLERIES')"
            >

                <PhotoLibrary
                    v-if="galleries.length > 0"
                    :images="displayedGalleries"
                    :column-width="300"
                    strict-width
                    container-class="js-gallery-container"
                />

                <EmptyListMessage
                    v-else
                    class="center"
                >
                    No results found.
                </EmptyListMessage>

<!--                <div v-if="isSectionSelected('GALLERIES')" v-waypoint="{ active: true, callback: loadMoreImages, intersectionOptions }" />-->
                <div v-if="isSectionSelected('GALLERIES')">
                    <div v-if="totalCount > 12" class="button-wrapper">
                        <Button
                            id="search-load-more"
                            :data-query="globalSearchFieldValue"
                            data-search-type="galleries"
                            :data-total="totalCount"
                            data-offset="12"
                            data-render-to=".js-gallery-container"
                        >
                            Load more
                        </Button>
                        <div class="hidden js-search-more-loading"><LoadingIndicator/></div>
                    </div>
                </div>
                <div v-if="galleries.length > 0 && !isSectionSelected('GALLERIES')" class="see-more-btn-container">
                    <Link
                        without-styles
                        :to="getCategoryLink('galleries')"
                        @click="pageChanged"
                    >
                        <Button
                            variant="outline"
                            class="see-more-btn"
                        >
                            View all results
                        </Button>
                    </Link>
                </div>

            </PageSection>

            <PageSection v-if="showGlobalNoResults">
                <EmptyListMessage class="center">
                    No results found.
                </EmptyListMessage>
            </PageSection>
    </div>
</template>

<script>
import {createParamsString, getMetaUri, requestData} from '~/utils/api'
import {mapGetters} from 'vuex'
import GLOBAL_SEARCH_PAGE_CATEGORIES from '~/constants/globalSearchPageCategories'
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
Vue.use(VueWaypoint)

export default {
    name: 'index',
    data: () => ({
        GLOBAL_SEARCH_PAGE_CATEGORIES,
        intersectionOptions: {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0, 1]
        }
    }),
    computed: {
        ...mapGetters('api/globalSearch', [
            'galleries',
            'news',
            'vendors',
            'weddings',
            'totalCount'
        ]),
        globalSearchFieldValue() {
            return this.$route.query.query
        },
        queryCategory() {
            return this.$route.query.category
        },
        showSeparators() {
            return !this.queryCategory
        },
        showGlobalNoResults() {
            return this.totalCount === 0 && !this.queryCategory
        },
        displayedNews() {
            if (!this.isSectionSelected('NEWS')) {
                return this.news.slice(0,3)
            }
            return this.news
        },
        displayedWeddings() {
            if (!this.isSectionSelected('WEDDINGS')) {
                return this.weddings.slice(0,3)
            }
            return this.weddings
        },
        displayedVendors() {
            if (!this.isSectionSelected('VENDORS')) {
                return this.vendors.slice(0,3)
            }
            return this.vendors
        },
        displayedGalleries() {
            if (!this.isSectionSelected('GALLERIES')) {
                return this.galleries.slice(0,12)
            }
            return this.galleries
        },
    },
    async asyncData({req, $http, store, route}) {
        const query = route.query
        const page = query.page ?? 1
        const limit = 120
        const category = query?.category
        const categories = {
            weddings: {
                endpoint: 'weddings',
                params: {
                    fields: 'title,event_type_display,slug,main_image',
                    limit: 12,
                    offset: 12 * (page - 1),
                    search: query?.query
                }
            },
            news: {
                endpoint: 'news',
                params: {
                    fields: 'id,title,slug,main_image,subcategory(*,category(*)),subtitle,description',
                    limit: 12,
                    offset: 12 * (page - 1),
                    search: query?.query
                }
            },
            vendors: {
                endpoint: 'vendors',
                params: {
                    fields: 'name,main_image,city,slug,categories(*)',
                    limit: 12,
                    offset: 12 * (page - 1),
                    search: query?.query
                }
            },
            galleries: {
                endpoint: 'galleries',
                params: {
                    fields: 'category(*),image(*)',
                    limit: 12,
                    offset: 12 * (page - 1),
                    search: query?.query
                }
            },

        }
        const endpoint = categories[category]?.endpoint || 'global_search'

        const params = categories[category]?.params || {
            limit,
            offset: (page - 1) * limit,
            query: query?.query
        }

        const paramsParsed = createParamsString(params)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `${endpoint}/${paramsParsed}`
        )

        await store.dispatch('api/globalSearch/hydrate', {
            meta,
            data,
            category
        })

    },
    head() {
        return this.$store.getters['api/globalSearch/head']
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        isSectionVisible(section) {
            return !this.queryCategory && this[section.toLowerCase()].length > 0
                || this.queryCategory === GLOBAL_SEARCH_PAGE_CATEGORIES[section]
        },
        isSectionSelected(section) {
            return this.queryCategory === GLOBAL_SEARCH_PAGE_CATEGORIES[section]
        },
        getCategoryLink(category) {
            const currentQuery = this.$route.query
            const linkObj = {
                name: 'global_search',
                query: {...currentQuery}
            }
            if(category) {
                linkObj.query.category = category
            } else {
                delete linkObj.query.category
            }
            return linkObj
        },
        getWeddingPath(wedding) {
            return `/weddings/${wedding.slug}/${wedding.id}`
        },
        async loadMoreNews({going}) {
            if (going !== this.$waypointMap.GOING_IN || !this.news.length) {
                return
            }

            const params = {
                fields: 'id,title,slug,main_image,subcategory(*,category(*)),subtitle,description',
                limit: 12,
                offset: this.news.length,
                search: this.$route.query?.query
            }

            const paramsParsed = createParamsString(params)

            const [data] = await requestData(
                this.$http,
                `news/${paramsParsed}`
            )

            await this.$store.commit('api/globalSearch/ADD_MORE_NEWS', data.items)
        },
        async loadMoreWeddings({going}) {
            if (going !== this.$waypointMap.GOING_IN || !this.weddings.length) {
                return
            }

            const params = {
                fields: 'title,event_type_display,slug,main_image',
                limit: 12,
                offset: this.weddings.length,
                search: this.$route.query?.query
            }

            const paramsParsed = createParamsString(params)


            const [data] = await requestData(
                this.$http,
                `weddings/${paramsParsed}`
            )

            this.$store.commit('api/globalSearch/ADD_MORE_WEDDINGS', data.items)
        },
        async loadMoreVendors({going}) {
            if (going !== this.$waypointMap.GOING_IN || !this.vendors.length) {
                return
            }

            const params = {
                fields: 'name,main_image,city,slug,categories(*)',
                limit: 12,
                offset: this.vendors.length,
                search: this.$route.query?.query
            }

            const paramsParsed = createParamsString(params)


            const [data] = await requestData(
                this.$http,
                `vendors/${paramsParsed}`
            )

            this.$store.commit('api/globalSearch/ADD_MORE_VENDORS', data.items)
        },
        async loadMoreImages({going}) {
            if (going !== this.$waypointMap.GOING_IN || !this.galleries.length) {
                return
            }

            const params = {
                fields: 'category(*),image(*)',
                limit: 24,
                offset: this.galleries.length,
                search: this.$route.query?.query
            }

            const paramsParsed = createParamsString(params)

            const [data] = await requestData(
                this.$http,
                `galleries/${paramsParsed}`
            )

            this.$store.commit('api/globalSearch/ADD_MORE_IMAGES', data.items)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.see-more-btn {
    margin-top: 0;
    letter-spacing: 0.1rem;
    @include medium-and-large-screens {
        margin-top: 2rem;
    }
}

.see-more-btn-container {
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
}

::v-deep .card {
    margin-bottom: 1rem !important;
}

</style>
