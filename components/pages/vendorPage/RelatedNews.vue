<template>
    <PageSection
        v-if="news.length>0"
        class="page-section related-news"
        title="Related Articles"
        title-tag="h2"
        without-vertical-margins
    >
        <div class="featured-container fixed-height hide-overflow">
            <CardStyle2
                v-for="item in news"
                :key="item.id"
                :image="item.main_image.image"
                :linkTo="getNewsLink(item)"
                :subtitle="item.subtitle"
                :title="item.title"
                :withLinkButton="false"
                class="featured-card card"
            />
        </div>
        <div class="button-wrapper">
            <Button class="featured-show-more">Show more</Button>
        </div>
    </PageSection>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'RelatedNews',
    computed: {
        ...mapGetters('api/vendorPage', ['news'])
    },
    methods: {
        getNewsLink(item) {
            let newsLink = `/news/${item.subcategory.category.slug}/${item.slug}/${item.id}`
            if (this.$isAMP) {
                newsLink = '/amp' + newsLink
            }
            return newsLink
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.card.card.card {
    text-align: left;
    //padding: 0 1rem;

    .content {
        align-items: flex-start;
    }
}

.page-section {
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: $color-darker-white;
    @include medium-and-large-screens {
        background-color: $color-white;
        padding-top: 2rem;
    }

    ::v-deep {
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
    display: inline-block;
    max-width: 21rem;
    margin: 0.5rem;
    height: 22rem;
}

</style>
