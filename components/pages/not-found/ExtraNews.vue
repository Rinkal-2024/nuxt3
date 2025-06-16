<template>
    <Cards class="cards">
        <CardStyle2
            v-for="card in news"
            class="card"
            :key="card.id"
            :image="card.main_image.image"
            :title="card.title"
            :subtitle="card.subtitle"
            :description="card.description"
            :linkTo="getCardArticlePath(card)"
        />
    </Cards>
</template>

<script>
export default {
    name: "ExtraNews",
    props: {
        news: {
            type: Array,
            required: true
        }
    },
    methods: {
        getCardArticlePath(card) {
            return {
                name: 'news-category-news-newsId',
                params: {
                    category: card.subcategory.category.slug,
                    news: card.slug,
                    newsId: card.id
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.cards {
    background: linear-gradient($color-darker-white, $color-darker-white);
    background-size: 100% 80%;
    background-repeat: no-repeat;
    background-position: 50% 100%;
    justify-content: space-evenly;

    @include medium-and-large-screens {
        margin-top: 2rem;
        padding: 0 3rem 3rem 3rem;
    }
}

.card {
    @include medium-and-large-screens {
        flex: 1 1 calc(33.333% - 2rem);
        margin: 0 1rem;

        & + .cardStyle2 {
            margin-top: 1rem;
        }
    }
}

.image {
    height: 12rem;
}

</style>
