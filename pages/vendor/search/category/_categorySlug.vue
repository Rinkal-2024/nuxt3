<template>
    <div class="vendor-page">
        <Breadcrumbs :title="title"/>
        <PageSection
            :description="categoryIntroduction"
            :title="title"
            class="find-local-vendors-section"
            description-as-html
            titleTag="h1"
            withoutVerticalMargins
        >
            <h2 class="title">Find Local Wedding Vendors</h2>
            <div class="search-form-bordered">
                <VendorSearchForm :categories="vendorTypes"/>
                <!--                <InvitationToBusiness />-->
            </div>
        </PageSection>
        <PageSection v-if="vendors.length > 0">
            <VendorsList
                :loading="loading"
                :page="currentVendorPage"
                :vendors="vendors"
                :with-load-more-button="moreVendorsAvailable"
                vendorLoadMoreId="vendors-load-more"
                @loadMore="loadMoreVendors"
            />
            <!--            <div>-->
            <!--                <Pagination-->
            <!--                    :total-pages="totalPages"-->
            <!--                    @pageChanged="pageChanged"-->
            <!--                />-->
            <!--            </div>-->
            <AccordionText
                v-show="categoryDescription"
                :html="categoryDescription"
                low-profile
            />

        </PageSection>
        <PageSection v-else>
            <span class="no-results">No results found.</span>
        </PageSection>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {processAdsOnPage} from '~/utils/adapex'
import {createParamsString, getMetaUri, requestData} from '~/utils/api'
import vendorCategories from '~/constants/vendorCategories'
import {parseHtmlArray} from "~/utils/html";
import {stripAmpFromUrl} from "~/utils/seo";

const getShortDescription = route => {
    const vendor = vendorCategories.find(x => x.slug === route.params?.categorySlug)

    return vendor?.shortDescription ||
        `Inside Weddings shares the trusted wedding professionals in our Editors Circle, plus a directory of
                local wedding vendors. Find wedding services in your area!`
}

export default {
    name: 'index',
    amp: 'hybrid',
    ampLayout: 'amp',
    data: () => ({
        currentVendorPage: 1,
        loading: false
    }),
    computed: {
        ...mapGetters('api/vendorSearch', [
            'vendors',
            'totalPages',
            'vendorTypes'
        ]),
        title() {
            const vendor = vendorCategories.find(x => x.slug === this.$route.params?.categorySlug)

            return vendor?.title || 'Wedding Vendors'
        },
        moreVendorsAvailable() {
            return this.currentVendorPage < this.totalPages
        },
        categoryIntroduction() {
            if (this.vendors.length) {
                const vendorCategory = this.vendors[0].categories.find(cat => cat.slug === this.$route.params?.categorySlug)
                if (vendorCategory) {
                    return vendorCategory.introduction
                }
            }
            return getShortDescription(this.$route)
        },
        categoryDescription() {
            if (this.vendors.length) {
                const vendorCategory = this.vendors[0].categories.find(cat => cat.slug === this.$route.params?.categorySlug)
                if (vendorCategory) {
                    return parseHtmlArray(vendorCategory.description)
                }
            }
            return null
        },
    },
    async asyncData({req, $http, store, route, redirect}) {
        const categories = route.params?.categorySlug
        const location = route.query?.location
        const isVenue = route.params?.categorySlug === 'wedding-site-location1'
        const willingToTravel = (route.query?.willingToTravel ?? 'true') === 'true'
        const page = route.query.page ?? 1
        const limit = 15

        const params = {
            categories,
            fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
            isVenue,
            limit,
            offset: (page - 1) * limit,
            sections: 'vendors-categories',
            willingToTravel,
        }

        if (location) {
            params.location = location
        }

        const paramsParsed = createParamsString(params)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `vendors_search/${paramsParsed}`
        )

        if (page > 1 && data.items.length === 0) { // No vendors found on this page
            redirect(301, '/vendor/')
        }

        if (meta.length === 0) {
            meta.push({
                description: getShortDescription(route),
                canonical: stripAmpFromUrl(route.fullPath),
                keywords: ''
            })
        }

        await store.dispatch('api/vendorSearch/hydrate', {
            meta,
            data
        })

    },
    watch: {
        currentVendorPage() {
            this.$nextTick(processAdsOnPage)
        }
    },
    head() {
        return this.$store.getters['api/vendorSearch/head']
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        async loadMoreVendors() {
            this.loading = true

            const categories = this.$route.params?.categorySlug
            const location = this.$route.query?.location
            const isVenue = this.$route.params?.categorySlug === 'wedding-site-location1'
            const willingToTravel = (this.$route.query?.willingToTravel ?? 'true') === 'true'

            const limit = 15
            const params = {
                fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
                limit: limit,
                offset: this.currentVendorPage * limit,
                categories,
                isVenue,
                willingToTravel
            }
            if (location) {
                params.location = location
            }

            const paramsParsed = createParamsString(params)

            const newVendors = await this.$http.$get(`vendors_search/${paramsParsed}`)
            await this.$store.dispatch('api/vendorSearch/addVendors', newVendors.items)

            this.currentVendorPage++
            this.loading = false
        }
    },
    created() {
        this.currentVendorPage = this.$route.query.page ?? 1
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.no-results {
    display: block;
    text-align: center;
    padding: 60px 0;
}

.search-form-bordered {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    @include medium-and-large-screens {
        margin-top: 0.8rem;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: $border-width solid $color-grey;
    }

    ::v-deep {
        .form {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex: 1 1 100%;

            @include medium-and-large-screens {
                flex-direction: row;
                align-items: flex-start;
                position: relative;
            }
        }

        .location-field {
            margin-top: 1.5rem;

            @include medium-and-large-screens {
                margin-top: 0;
                padding: 1rem 2rem 0 2rem;
                // border-right: $border-width solid $color-grey;
                border-left: $border-width solid $color-grey;
            }
        }

        .vendor-category {
            @include medium-and-large-screens {
                padding-top: 1rem;
                padding-right: 2rem;
            }
        }

        .button {
            margin-top: 1.5rem;
            @include medium-and-large-screens {
                border-color: $input-border-color;
                margin-top: 0;
                flex: 0 0 auto;
                margin-left: 1rem;
            }
        }
    }
}

.subtitle {
    margin: 3rem 0 -1rem 0 !important;
    @include apply-font-and-size("heading", 3);
    font-weight: 100;
    font-style: italic;
    text-align: center;
}

h2.title {
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
    font-style: italic !important;
    font-size: 1.6rem !important;
    @include small-and-medium-screens {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-size: 1.2rem !important;
    }
}

.vendor-page {
    @include small-and-medium-screens {
        margin-top: 70px;
    }
}
</style>
