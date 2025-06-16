<template>
    <PageSection
        title="Wedding Tips From The Pros"
        class="wedding-tips-from-the-pros"
        without-top-body-margin
    >
        <Cards>
            <CardStyle2
                v-for="item in items"
                :key="item.id"
                :image="item.image"
                :title="item.title"
                :subtitle="item.subtitle"
                :linkTo="linkTo(item)"
                linkToLabel="Continue"
                withLinkButton
                alwaysButton
            />
        </Cards>
    </PageSection>
</template>

<script>
export default {
    name: 'NewsWeddingTipsFromThePros',
    computed: {
        items() {
            return this.$store.getters['api/news/weddingTipsFromTheProsItems']
        }
    },
    methods: {
        linkTo(item) {
            return {
                name: 'news-category-news-newsId',
                params: {
                    category: item.subcategory.category.slug,
                    news: item.slug,
                    newsId: item.id
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.wedding-tips-from-the-pros {

    ::v-deep {

        .cards {
            background-size: 100% 80%;
            background: linear-gradient($color-darker-white, $color-darker-white) no-repeat 50% 100%;
            justify-content: space-evenly;

            @include medium-and-large-screens {
                margin-top: 8rem;
                padding: 0 3rem 3rem 3rem;
            }

            .card {
                @include medium-and-large-screens {
                    flex: 1 1 calc(33.333% - 2rem);
                    margin: -6rem 1rem 0;
                }

                .content__title {
                    font-weight: 300;
                }

                .content__title, .content__subtitle {
                    text-align: center;
                }

                .figure {
                    .image {
                        height: 12rem;
                    }
                }
            }
        }

        .title {
            font-weight: bold;
            letter-spacing: -0.1rem;
        }

    }

}

</style>
