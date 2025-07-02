<template>
    <header>
        <PageLayoutMargin>
            <div class="mobile-navigation">
                <BackToLink :link-to="{ name: 'weddings' }">
                    Back to weddings
                </BackToLink>
            </div>
        </PageLayoutMargin>

        <div id="wedding-gallery-slider" class="slider">
            <div class="slide" v-for="(item, index) in sliderImages" :key="item.id" :style="calcStyle(index)">
                <Link :to="imageLink(item)">
                    <Photo
                        :image="item.image"
                        isSharable
                        :lazy="index > 0"
                        :sizes="sizes"
                        :withPhotoCreditsPosition="topRight"
                        class="slider_image"
                        withPhotoCredits
                    />
                </Link>
            </div>
            <button class="slider-btn slider-btn-next" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" class="shp0" d="M358.57 255.99L130.96 18.03C126.9 13.77 127.05 7.02 131.3 2.95C135.53 -1.12 142.28 -0.95 146.38 3.28L381.05 248.62C384.98 252.74 384.98 259.24 381.05 263.37L146.38 508.7C144.28 510.89 141.48 511.99 138.67 511.99C136.02 511.99 133.36 511.01 131.3 509.03C127.05 504.96 126.9 498.21 130.96 493.95L358.57 255.99Z" /></svg></button>
            <button class="slider-btn slider-btn-prev" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" class="shp0" d="M153.43 255.99L381.04 18.03C385.1 13.77 384.95 7.02 380.7 2.95C376.47 -1.12 369.72 -0.95 365.62 3.28L130.95 248.62C127.02 252.74 127.02 259.24 130.95 263.37L365.62 508.7C367.72 510.89 370.52 511.99 373.33 511.99C375.98 511.99 378.64 511.01 380.7 509.03C384.95 504.96 385.1 498.21 381.04 493.95L153.43 255.99Z" /></svg></button>
        </div>

        <PageLayoutMargin>
            <div class="wedding-navigation-bar">
                <Link :to="{ name: 'weddings' }" class="left-side">
                    Back to weddings
                </Link>
                <span id="wedding-gallery-view" class="center link-styles" @click="scrollToGallery">
                    View all photos
                </span>
                <Byline class="right-side byline">
                    {{ articleAuthor }}
                </Byline>
            </div>
        </PageLayoutMargin>

        <div class="mobile-drawer-buttons">
            <Button
                class="button gallery-link-mobile"
                on="tap:AMP.scrollTo(id='photo-gallery', position='top')"
                variant="secondary"
                @click="scrollToGallery"
            >
                View All Photos
            </Button>
            <WeddingArticleResourcesMobile v-if="showResources" class="resources-mobile"/>
            <HighlightsMobile class="highlight-mobile"/>
        </div>

        <Breadcrumbs :title="articleTitle"/>

        <PageLayoutMargin>
            <div class="headings">
                <div class="headings-content">
                    <h1 class="title">
                        {{ articleTitle }}
                    </h1>
                    <h2 v-if="articleSubtitle" class="subtitle">
                        {{ articleSubtitle }}
                    </h2>
                    <Byline class="mobile-author mobile" >
                        {{ articleAuthor }}
                    </Byline>
                    <WeddingArticleIntroduction/>
                </div>
            </div>
        </PageLayoutMargin>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'
import {getImageSizes} from "~/utils/imgSrcSet";


export default {
    name: 'WeddingArticleHeading',
    computed: {
        ...mapGetters('api/weddingsArticle', [
            'landscapeGalleryImages',
            'articleAuthor',
            'articleTitle',
            'articleSubtitle',
            'resources',
            'viewAllPhotosLink'
        ]),
        showResources() {
            return this.resources.length > 0
        },
        sliderImages() {
            return this.landscapeGalleryImages;
        },
        sizes() {
            return getImageSizes(100);
        },
    },
    methods: {
        scrollToGallery() {
            const gallery = document.getElementById('photo-gallery')
            gallery.scrollIntoView({behavior: 'smooth'})
        },
        calcStyle(index) {
            return `transform: translateX(${index * 100}%)`;
        },
        imageLink(item) {
            const categorySlug = item?.category?.slug || 'no-categorized'
            return `/inspiration/photo/${item.id}/${categorySlug}/${item.image.slug}/`;
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.headings {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;

    @include medium-and-large-screens {
        margin-top: 3rem;
    }

    .headings-content {
        width: 100%;
        text-align: center;

        @include medium-and-large-screens {
            width: 50%;
            text-align: left;
        }
    }
}

.title,
.subtitle {
    margin: 0;
}

.title {
    @include apply-font-and-size("heading", 2);

    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 1);
    }
}

.subtitle {
    @include apply-font-and-size("heading", 9);
    margin-top: 0.5rem;
    font-weight: 100;

    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 2);
    }
}

.mobile-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
     @include medium-and-large-screens {
        display: none;
    }
}

.mobile-drawer-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    @include medium-and-large-screens {
        display: none;
    }
}

.gallery-link {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    font-weight: 100;
    color: $color-black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}

.resources-mobile, .highlight-mobile {
    flex: 1;

    ::v-deep {
        .button {
            width: 100%;
            flex: 1 1;
            padding: 1rem 1rem;
        }
    }
}

.wedding-navigation-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    border-bottom: $border-width solid $color-grey;
    padding: 0.5rem 0;
    @include small-and-medium-screens {
        display: none;
    }
}

.byline {
    margin: 0.5rem 0;
}

.left-side,
.right-side {
    flex: 1 1;
}

.right-side {
    display: flex;
    justify-content: flex-end;
}

.center {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
}

.mobile-author {
    display: flex;
    justify-content: center;
    margin: 1rem 0 0 0;
     @include medium-and-large-screens {
        justify-content: left;
        display: none;
    }
}

.gallery-link-mobile {
    width: 100%;

    ::v-deep {
        .button {
            width: 100%;
            padding: 1rem;
        }
    }
}

.gallery-link-mobile {
    padding: 1rem;
}

.link-styles {
    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

</style>
