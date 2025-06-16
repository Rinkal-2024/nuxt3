<template>
    <PageSection :title="title" class="new-real-weddings" withoutTopBodyMargin>
        <TriplePreviewOverflow>
            <TriplePreviewOverflowItem
                v-for="item in items"
                :key="item.key"
                :category="item.category"
                :categoryLinkTo="weddingCategoryPath(item.category)"
                :image="item.image"
                :linkTo="weddingDetailsPath(item)"
                :title="item.title"
                linkTitle="See wedding"
                withHoverCallToAction
            />
        </TriplePreviewOverflow>

        <Link :to="linkTo" class="see-more-button" without-styles>
            <Button class="latest-news__see-more-btn">More real weddings</Button>
        </Link>
        <!--        <DesktopView>-->
        <!--            <AdUnit ad-slot-name="homePageNewRealWeddings"/>-->
        <!--        </DesktopView>-->
        <!--        <MobileView>-->
        <!--            <AdUnit ad-slot-name="homePageNewRealWeddingsMobile"/>-->
        <!--        </MobileView>-->
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'HomePageNewRealWeddings',
    data: () => ({
        title: 'New Real Weddings',
        linkTo: '/weddings'
    }),
    computed: {
        ...mapGetters('home/newRealWeddings', [
            'items'
        ])
    },
    methods: {
        weddingDetailsPath(item) {
            return `/weddings/${item.linkTo}/${item.id}`
        },
        weddingCategoryPath(category) {
            const categoryId = category
                .toLocaleLowerCase()
                .replace(/ /g, '_')

            return {
                name: 'weddings-search-category-categoryType-categoryId',
                params: {
                    categoryType: 'event_type',
                    categoryId
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.new-real-weddings {
    .see-more-button {
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
        flex: 1 1 100%;
        width: 100%;
    }
}
</style>
