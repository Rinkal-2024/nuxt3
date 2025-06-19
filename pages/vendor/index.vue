<template>
    <div class="vendor-page">
        <Breadcrumbs/>
        <PageSection
            :description="landingPageIntroduction"
            :description-as-html="introductionIsHtml"
            :title="landingPageTitle"
            class="find-local-vendors-section"
            titleTag="h1"
            withoutVerticalMargins
        >
            <h2 class="title">Find Local Wedding Vendors</h2>
            <div class="search-form-bordered">
                <VendorSearchForm :categories="categories"/>
                <InvitationToBusiness/>
            </div>
        </PageSection>
        <PageSection
            class="wedding-vendor-category-carousel"
            subtitle="Easily find a professional vendor or services for your upcoming wedding"
            subtitleTag="p"
            title="Wedding Vendor Categories"
            withBackground
            without-top-body-margin
        >
            <CategoryCarousel
                :categories="categories"
                urlPrefix="/vendor/search/category/"
                linkToLabel="View vendors"
            />
        </PageSection>
        <PageSection
            subtitle="The best in the industry, their work reflects a commitment to creativity and excellence."
            title="We Highly Recommend"
        >
                <VendorsList
                    :loading="loading"
                    :page="currentVendorPage"
                    :vendors="vendors"
                    :with-load-more-button="hasMoreVendors"
                    vendorLoadMoreId="top-vendors-load-more"
                    @loadMore="loadMoreVendors"
                />
            <template v-if="!$isAMP">
                    <AccordionText
                        v-show="landingPageDescription"
                        :html="landingPageDescription"
                        class="description"
                        low-profile
                    />
            </template>
        </PageSection>
    </div>
</template>

<script>
const {getMetaUri, requestData, createParamsString} = require('~/utils/api')
import {mapGetters} from 'vuex'
import {processAdsOnPage} from '~/utils/adapex'
import LazyHydrate from 'vue-lazy-hydration'

export default {
    name: 'index',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {LazyHydrate},
    computed: {
        ...mapGetters('api/vendor', [
            'categories',
            'vendors',
            'totalPages',
            'landingPageTitle',
            'landingPageSubtitle',
            'landingPageIntroduction',
            'landingPageDescription'
        ]),
        introductionIsHtml() {
            return Array.isArray(this.landingPageIntroduction)
        }
    },
    data: () => ({
        currentVendorPage: 1,
        loading: false,
        displayedAccountTypes: ['TOP_LEVEL', 'MEDIUM_LEVEL'],
        hasMoreVendors: true
    }),
    async asyncData({req, $http, store, route, redirect}) {
        const limit = 15

        const params = {
            fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
            isPaid: true,
            limit: limit,
            membership__account_type: 'TOP_LEVEL',
            sections: ['vendors-categories']
        }

        const page = route.query?.page
        if (page) {
            params.offset = (page - 1) * limit
        } else {
            params.order = 'random'
        }

        const paramsParsed = createParamsString(params)

        const [meta, data, info] = await requestData(
            $http,
            getMetaUri(req, route),
            `vendors/${paramsParsed}`,
            `vendors_landing_page`
        )

        if (page > 1 && data.items.length === 0) { // No vendors found on this page
            redirect(301, '/vendor/')
        }

        data.info = info

        await store.dispatch('api/vendor/hydrate', {
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
        return this.$store.getters['api/vendor/head']
    },
    methods: {
        async loadMoreVendors() {
            this.loading = true

            const exclude = this.vendors.map(v => v.id).join(',')

            const limit = 15
            const params = {
                fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
                isPaid: true,
                limit: limit,
                exclude,
                order: 'random',
            }
            const paramsParsed = createParamsString(params)

            const newVendors = await this.$http.$get(`vendors/${paramsParsed}`)
            newVendors.items = newVendors.items.filter(v => this.displayedAccountTypes.includes(v.membership.account_type))
            if (newVendors.items.length) {
                await this.$store.dispatch('api/vendor/addVendors', newVendors.items)
            } else {
                this.hasMoreVendors = false
            }

            // this.currentVendorPage++
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

::v-deep #vendor-search-form {
    flex: 0 0 80% !important;
}

.vendor-page {
    @include small-and-medium-screens {
        margin-top: 70px;
    }

    .bold-title {
        ::v-deep {
            .title {
                font-weight: 600;
                margin-bottom: 0;
                padding-bottom: 0;
            }
        }
    }

    h2.title {
        margin-top: 2.5rem;
        margin-bottom: 0.5rem;
        font-style: italic;
        font-size: 1.6rem;
        @include small-and-medium-screens {
            margin-top: 0.5rem;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
}

.search-form-bordered {
    display: flex;
    flex-direction: column;
    //margin-top: 1rem;

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
                border-right: $border-width solid $color-grey;
                border-left: $border-width solid $color-grey;
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

.category-carousel {
    margin-top: 2rem;

    ::v-deep {
        .slick-arrow {
            top: calc(10rem - 120px);
        }
    }
}

.wedding-vendor-category-carousel {
    ::v-deep .body {
        padding-top: 0;
        min-height: 330px;
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
