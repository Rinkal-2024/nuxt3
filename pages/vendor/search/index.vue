<template>
    <div>
        <Breadcrumbs/>
        <PageSection
            class="find-local-vendors-section"
            description="Inside Weddings shares the trusted wedding professionals in our Editors Circle, plus a directory of local wedding vendors. Find wedding services in your area!"
            title="Wedding Vendors"
            withoutVerticalMargins
        >

            <h2 class="title" style="margin-top: 3rem;margin-bottom:1rem;">Find Local Wedding
                Vendors</h2>
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
        </PageSection>
        <PageSection v-else>
            <span class="no-results">No results found.</span>
        </PageSection>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createParamsString, getMetaUri, requestData} from '~/utils/api'

export default {
    name: 'index',
    amp: 'hybrid',
    ampLayout: 'amp',
    computed: {
        ...mapGetters('api/vendorSearch', [
            'vendors',
            'totalPages',
            'vendorTypes'
        ]),
        moreVendorsAvailable() {
            return this.currentVendorPage < this.totalPages
        }
    },
    data: () => ({
        currentVendorPage: 1,
        loading: false
    }),
    async asyncData({req, $http, store, route, redirect}) {
        const categories = route.query?.vendorCategorySlug
        const location = route.query?.location
        const isVenue = route.query?.isVenue ?? false
        const willingToTravel = (route.query?.willingToTravel ?? 'true') === 'true'
        const page = route.query.page ?? 1
        const limit = 15

        const params = {
            fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
            isVenue,
            limit,
            offset: (page - 1) * limit,
            sections: 'vendors-categories',
            willingToTravel,
        }

        if (categories) {
            params.categories = categories
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

        await store.dispatch('api/vendorSearch/hydrate', {
            meta,
            data
        })

    },
    head() {
        return this.$store.getters['api/vendorSearch/head']
    },
    methods: {
        async loadMoreVendors() {
            this.loading = true
            this.currentVendorPage++

            const categories = this.$route.query?.vendorCategorySlug
            const location = this.$route.query?.location
            const isVenue = this.$route.query?.isVenue ?? false
            const willingToTravel = (this.$route.query?.willingToTravel ?? 'true') === 'true'
            const page = this.currentVendorPage
            const limit = 15

            const params = {
                fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
                isVenue,
                limit,
                offset: (page - 1) * limit,
                sections: 'vendors-categories',
                willingToTravel,
            }

            if (categories) {
                params.categories = categories
            }
            if (location) {
                params.location = location
            }

            const paramsParsed = createParamsString(params)

            const newVendors = await this.$http.$get(`vendors_search/${paramsParsed}`)
            await this.$store.dispatch('api/vendorSearch/addVendors', newVendors.items)

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
        margin-top: 2rem;
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

</style>
