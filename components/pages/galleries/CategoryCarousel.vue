<template>
    <div>
        <template v-if="!$isAMP">
            <div class="category-container fixed-height hide-overflow">
            <CardStyle5
                v-for="category in displayCategories"
                :key="category.id"
                :image="category.image"
                :linkTo="generateLinkTo(category)"
                :linkToLabel="linkToLabel"
                :title="category.name"
            /> 
            </div>
            <div class="button-wrapper">
                <Button class="category-show-more">Show more Categories</Button>
            </div>
        </template>
        <amp-carousel
            v-else
            height="290"
            layout="fixed-height"
            loop
            type="slides"
        >
            <CardStyle3
                v-for="category in displayCategories"
                :key="category.id"
                :amp-photo-height="240"
                :image="category.image"
                :linkTo="generateLinkTo(category)"
                :linkToLabel="linkToLabel"
                :title="category.name"
                class="card-style-3-mobile"
                style="width: 100%; min-width: 100%"
            />
        </amp-carousel>
    </div>
</template>

<script>

export default {
    name: 'CategoryCarousel',
    props: {
        categories: {
            type: Array,
            default: () => []
        },
        linkToLabel: {
            type: String
        },
        filterCategories: {
            type: Array,
            default: () => []
        },
        urlPrefix: {
            type: String
        }
    },
    data: () => ({
        mobileCarouselSettings: {
            slidesToShow: 1,
            dots: false,
            swipeToSlide: true
        },
        cardSizeWithMargin: 230,
        maxNumberOfCards: 6
    }),
    
    computed: {
        sortedCategories() {
            return this.categories.sort((a, b) => {
                if (a.name > b.name)
                    return 1
                else if (a.name < b.name)
                    return -1
                else
                    return 0
            })
        },
        displayCategories() {
            return this.sortedCategories.filter(category => !this.filterCategories.includes(category.value))
        }
    },
    methods: {
        generateLinkTo(category) {
            return `${this.urlPrefix}${category.slug}/`
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";
.button-wrapper {
    margin-top: 0;
}

.fixed-height {
    height: 14.5rem;
}

.category-container {
    text-align: center
}
</style>
