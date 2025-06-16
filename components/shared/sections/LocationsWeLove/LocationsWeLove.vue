<template>
    <LazyHydrate never>
        <PageSection
            :title="title"
            class="center locations-we-love"
            withoutTopBodyMargin
        >
            <TriplePreviewOverflow>
                <TriplePreviewOverflowItem
                    v-for="item in items"
                    :key="item.key"
                    :category="item.category"
                    :categoryLinkTo="vendorCategoryPath(item)"
                    :description="item.description"
                    :image="item.image"
                    :linkTo="vendorProfilePath(item)"
                    :title="item.title"
                />
            </TriplePreviewOverflow>
            <Link to="/vendor/search/category/wedding-site-location1" without-styles>
                <Button>More Wedding Venues</Button>
            </Link>
        </PageSection>
    </LazyHydrate>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import {mapGetters} from 'vuex'

export default {
    name: 'LocationsWeLove',
    components: {
        LazyHydrate
    },
    data: () => ({
        title: 'Locations We Love'
    }),
    computed: {
        ...mapGetters('home/locationsWeLove', [
            'items'
        ])
    },
    methods: {
        vendorCategoryPath(vendor) {
            return {
                name: 'vendor-search-category-categorySlug',
                params: {
                    categorySlug: vendor.categorySlug,
                }
            }
        },
        vendorProfilePath(vendor) {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: vendor.link,
                    id: vendor.key
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
