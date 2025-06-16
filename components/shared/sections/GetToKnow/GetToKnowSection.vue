<template>
    <LazyHydrate never>
        <PageSection
            :title="title"
            class="center get-to-know"
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
            <Link to="/vendor" without-styles>
                <Button>More Wedding Vendors</Button>
            </Link>
        </PageSection>
    </LazyHydrate>
</template>

<script>
import {mapGetters} from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'

export default {
    name: 'GetToKnow',
    components: {
        LazyHydrate
    },
    data: () => ({
        title: 'Get To Know'
    }),
    computed: {
        ...mapGetters('shared/getToKnow', [
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
