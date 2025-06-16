<template>
    <PageSection
        :subtitle="subtitle"
        :title="title"
        class="home-page-wedding-inspiration"
        withoutTopBodyMargin
    >
        <Cards class="cards">
            <CardStyle3
                v-for="item in items"
                :key="item.id"
                :amp-photo-height="176"
                :image="item.image"
                :link-to="galleryCategoryLink(item)"
                :title="item.title"
                linkToLabel="View gallery"
                withHoverLink
            />
        </Cards>
        <!-- <MobileView>
            <div class="see-more-button-container">
                <Link to="/inspiration/images" without-styles>
                    <Button variant="primary">More Inspiration</Button>
                </Link>
            </div>
        </MobileView> -->
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'HomePageWeddingInspiration',
    data: () => ({
        title: 'Wedding Inspiration',
        subtitle: 'Search our photo library by color & category for great wedding ideas'
    }),
    computed: {
        ...mapGetters('global/config', [
            'isMobile'
        ]),
        items() {
            return this.$store.getters['home/weddingInspiration/items'];
        }
    },
    methods: {
        galleryCategoryLink(item) {
            return `/inspiration/images/category/${item.linkTo}`
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.home-page-wedding-inspiration {
    .cards {
        flex-direction: row;
        justify-content: space-between;

        ::v-deep {
            .card {
                @include small-screens {
                    flex: 0 1 100% !important;
                }
            }
        }
    }

    .see-more-button-container {
        width: 100%;
        text-align: center;
        margin-top: 1.5rem;
    }
}

</style>
