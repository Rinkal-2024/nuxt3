<template>
    <PageSection v-if="items.length" class="page-section related-weddings" title="As Featured In"
                 without-vertical-margins>
            <div class="featured-container fixed-height hide-overflow">
                <CardStyle1
                    v-for="item in items"
                    :key="item.id"
                    :category="item.category"
                    :image="item.image"
                    :linkTo="getWeddingPath(item)"
                    :title="item.title"
                    linkTitle="See wedding"
                    class="featured-card"
                    withoutCallToAction
                />
            </div>
            <div class="button-wrapper">
                <Button class="featured-show-more">Show more</Button>
            </div>
    </PageSection>
</template>

<script>
export default {
    name: 'RelatedWeddings',
    computed: {
        items() {
            return this.$store.getters['api/vendorPage/relatedWeddings']
        }
    },
    methods: {
        getWeddingPath(wedding) {
            let weddingPath = `/weddings/${wedding.slug}/${wedding.id}/`
            if (this.$isAMP) {
                weddingPath = '/amp' + weddingPath
            }
            return weddingPath
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.page-section {
    margin-top: 1rem;
    margin-bottom: 1rem;
    @include medium-and-large-screens {
        margin-top: 2rem;
    }

    ::v-deep {
        .card__image {
            height: 12rem;
        }
        .title {
            @include apply-font-and-size("heading", 9);
            font-weight: 100;
            @include medium-and-large-screens {
                margin-bottom: 1.5rem;
            }
        }
        .body {
             margin-top: 1rem;
            @include medium-and-large-screens {
                margin-top: 1.5rem;
            }
        }
    }
}

.button-wrapper {
    margin-top: 1rem;
}

.fixed-height {
    height: 22rem;
}

.featured-container {
    text-align: center
}

.featured-card {
    display: inline-block !important;
    max-width: 21rem;
    margin: 0.5rem;
    height: 22rem;
}

</style>
