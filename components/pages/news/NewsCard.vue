<template>
    <div class="news-card">
        <!--<Link :to="linkTo" class="read-more">
            <Button class="button">
                Read more
            </Button>
        </Link> -->

        <div class="content">
            <Link class="subcategory-link desktop" :to="subcategoryLinkTo">
                <Category class="subcategory">
                    {{ news.subcategory.name }}
                </Category>
            </Link>

            <h2 class="title">
                <Link :to="linkTo">
                    {{ news.title }}
                </Link>
            </h2>

            <h3 class="subtitle">
                <Link :to="linkTo">
                    <span class="js-news-card-subtitle">{{ news.subtitle }}</span>
                </Link>
            </h3>

            <p class="description">
                <Link :to="linkTo">
                <span class="description-span js-news-card-description">
                    {{ news.description }}
                </span>
                </Link>
            </p>

             <Link class="subcategory-link mobile" :to="subcategoryLinkTo">
                <Category class="subcategory">
                    {{ news.subcategory.name }}
                </Category>
            </Link>
        </div>
        <div class="image-wrapper">
            <Link
                :to="linkTo"
                withoutStyles
                rel="nofollow"
                force-refresh
            >
                <Photo
                    :image="news.main_image.image"
                    withPhotoCredits
                    class="image"
                    :lazy="lazyPhoto"
                />
            </Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsCard',
    props: {
        news: {
            type: Object,
            required: true
        },
        lazyPhoto: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        linkTo() {
            return {
                name: 'news-category-news-newsId',
                params: {
                    category: this.news.subcategory.category.slug,
                    news: this.news.slug,
                    newsId: this.news.id
                }
            }
        },
        subcategoryLinkTo() {
            return {
                name: 'news-category-subcategory',
                params: {
                    category: this.news.subcategory.category.slug,
                    subcategory: this.news.subcategory.slug,
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.news-card {
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: column-reverse;

    .content,
    .image-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 50%;
        background-color: $color-white;
        width: 100%;
        position: relative;
    }

    @include medium-and-large-screens {
        flex-direction: row;

        .content,
        .image-wrapper {
            flex: 1 1 50%;
            background-color: transparent;
        }
    }

    ::v-deep {
        .image {
            //height: 100%;
            height: 21rem;
            position: relative;
        }
    }
}

.content {
    padding: 1rem 0.6rem;
    text-align: center;

    @include medium-and-large-screens {
        padding: 1rem 1.2rem;
    }

    .title a {
        font-style: normal;
        font-weight: bold;
        text-transform: none;
        @include apply-font-and-size("heading", 9);
        @include medium-and-large-screens {
            @include apply-font-and-size("heading", 2);
            letter-spacing: -0.05rem;
        }
    }

    .subtitle a {
        @include apply-font-and-size("heading", 9);
        font-weight: 100;
        font-style: italic;
        text-transform: none;
        @include medium-and-large-screens {
            margin: 0;
        }
    }

    .description {
        margin: 0;
        padding: 1rem 0;
    }

    .description-span {
        @include apply-font-and-size("paragraph-decorative", 3);
        font-style: italic;
        text-transform: none;
        font-weight: 100;
        padding: 1rem 0;
        @include medium-and-large-screens {
            //margin-top: 1rem;
            @include apply-font-and-size("paragraph-decorative", 4);
        }
    }

    .category {
        display: none;
        @include medium-and-large-screens {
            display: flex;
            margin-bottom: 1rem;
        }

        @include large-screens {
            margin-bottom: 2rem;
        }
    }

    @include medium-and-large-screens {
        padding: 0;
        margin-right: 2rem;
        text-align: left;
    }
}

.read-more {
    display: block;
    width: 100%;

    @include medium-and-large-screens {
        display: none;
    }
}

.button {
    width: 100%;
}

.subcategory-link.desktop {
    padding: 0.75rem 0;
}

.subcategory-link.mobile {
    margin: 0 auto;
    padding: 0.75rem;
}


</style>
