<template>
    <PageLayoutMargin class="news-header-image">
        <div class="headings-wrapper">
            <h1 class="title">{{ title }}</h1>
            <h2 class="subtitle">{{ subtitle }}</h2>
        </div>
        <div class="intro">
            <div class="side">
                <p class="description">
                    {{ description }}
                    <Byline v-if="byline" class="byline">
                        {{ byline }}
                    </Byline>
                </p>
                <AdUnit class="desktop" ad-slot-name="newsArticleSide" minHeight="600" />

                <div class="category-and-by-line-wrapper">
                </div>
            </div>
            <Photo
                :image="images[0].image"
                :lazy="false"
                class="image limit-image-height"
                sizes="(max-width: 1024px) 100vw, min(calc(100vw - 26rem),920px)"
                isSharable
                withPhotoCredits
                withPhotoCreditsPosition="below"
            />
        </div>
    </PageLayoutMargin>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'NewsArticleHeaderImage',
    computed: {
        ...mapGetters('api/newsArticle', [
            'backToLink',
            'category',
            'images',
            'title',
            'subtitle',
            'description',
            'subcategoryLinkTo',
            'subcategory',
            'byline'
        ])
    },
    mounted() {
        const imageContainer = this.$refs.image.$el
        const imageObj = this.images[0]?.image?.original
        if (imageObj) {
            const imagePlaceholderHeight = Math.ceil(imageObj.height / imageObj.width * imageContainer.offsetWidth)
            imageContainer.style.minHeight = `${imagePlaceholderHeight}px`
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.page-layout-margin {
    padding: 0;
    margin: 0;
    @include medium-and-large-screens {
        padding: 0 3rem;
        margin: 0 auto;
    }
}

.desktop {
    display: none;
    @include medium-and-large-screens {
        display: block;
    }
}

.news-header-image {
    ::v-deep {
        .image {
            flex: 1;
            height: 25rem !important;
            position: relative;

            @include medium-and-large-screens {
               height: 33rem !important;
            }
        }
    }
}

.intro {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    @include medium-and-large-screens {
        margin-top: 1rem;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
    }
}

/*.main-image-desktop {
    flex: 1 1;
    display: none;
    @include medium-and-large-screens {
        display: flex;
    }
}

.main-image-mobile {
    @include medium-and-large-screens {
        display: none;
    }
}*/

.single-image {
    display: flex;
    flex-direction: column;
    background-color: $color-darker-white;

    @include medium-and-large-screens {
        background-color: $color-white;
    }
}

.side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @include medium-and-large-screens {
        width: 15rem;
        margin-right: 5rem;

        .description {
            margin: 0;
        }
    }
}

.headings-wrapper {
    display: flex;
    flex-direction: column;
    //margin: 1rem 0 0 0;
    align-items: center;
    text-align: center;

    @include medium-and-large-screens {
        align-items: flex-start;
        text-align: left;
        //margin-top: 3rem;
        margin-left: 20rem;
    }
}

.title {
    margin: 0;
    @include apply-font-and-size("heading", 2);
    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 1);
    }
}

.subtitle {
    margin: 0.5rem 0 0 0;
    font-weight: 100;
    @include apply-font-and-size("heading", 9);
    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 2);
    }
}

.description {
    margin: 0.5rem 0 0 0;
    font-style: italic;
    @include apply-font-and-size("paragraph-decorative", 3);
    @include medium-and-large-screens {
        margin: 1rem 0 0 0;
        @include apply-font-and-size("paragraph-decorative", 4);
    }
}

.category-and-by-line-wrapper {
    margin: 0.5rem 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include medium-and-large-screens {
        flex-direction: column;
        align-items: flex-start;
        margin: 0;
    }
}

.byline {
    margin: 0.5rem 0 0 0;
}

.category {
    margin-top: 0;
}

</style>
