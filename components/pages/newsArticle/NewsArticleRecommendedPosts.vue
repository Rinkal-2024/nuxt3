<template>
    <PageSection
        :title="title"
        class="recommended-posts-section"
        without-top-body-margin
    >
        <div class="recommended-posts-wrapper">
            <div
                v-for="post in posts"
                class="recommended-post"
            >
                <Photo
                    v-if="!$isAMP"
                    :image="post.image"
                />
                <AmpPhoto v-else :height="160" :image="post.image"/>
                <Link :to="post.url" class="link" withoutStyles>
                    <h3>{{ post.title }}</h3>
                    <h4>{{ post.subtitle }}</h4>
                </Link>
            </div>
        </div>
    </PageSection>
</template>

<script>
export default {
    name: 'NewsArticleRecommendedPosts',
    data: () => ({
        title: 'You Might Also Like'
    }),
    computed: {
        posts() {
            return this.$store.getters['api/newsArticle/recommended']
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.recommended-posts-section {
    ::v-deep {
        .section {
            @include medium-and-large-screens {
                flex-direction: row;
                align-items: flex-start;
            }

            .title {
                flex: 1 1 100%;
                text-align: center;

                @include medium-and-large-screens {
                    white-space: nowrap;
                    margin: 0 2rem 1rem 0;
                    flex: 0 0 auto;
                    text-align: left;
                }
            }
        }

        .recommended-posts {
            display: flex;
            flex-wrap: wrap;
            margin-top: 1rem;
            @include medium-and-large-screens {
                margin-top: 0;
            }
        }

        .recommended-posts-wrapper {
            display: flex;
            flex-wrap: wrap;
            flex: 1 1 auto;

            @include medium-and-large-screens {
                justify-content: flex-start;
                flex-wrap: nowrap;
                flex-basis: 25%;
            }
        }
    }
}

.recommended-post {
    display: flex;
    flex-direction: column;
    align-content: center;
    flex: 1 1 100%;
    margin: 1rem 0;
    padding: 0 0.5rem;
    min-width: 7rem;
    position: relative;

    .link {
        text-transform: none;

        &:before {
            position: absolute;
            content: "";
            height: 100%;
            width: 100%;
            top: 0;
        }
    }

    @include medium-and-large-screens {
        @include apply-zero-padding-and-margin-for-first-and-last-child;
        padding: 0;
        margin: 0 1rem;
        max-width: 12.5rem;
    }

    h3,
    h4 {
        margin: 0;
        color: $color-black;
    }

    h3 {
        margin-top: 1rem;
        @include apply-font-and-size("heading", 3);
        //font-size: 1.1rem;
        @include small-and-medium-screens {
            font-size: 1.2rem;
        }
    }

    h4 {
        @include apply-font-and-size("heading", 5);
        font-style: italic;
        margin-top: 0.25rem;
        @include small-and-medium-screens {
            @include apply-font-and-size("heading", 4);
        }
    }

    ::v-deep {

        .figure {
            position: relative;
        }

        .image, .figure__image-container {
            min-height: 10rem;

            @include medium-and-large-screens {
                min-height: 7.5rem;
            }
        }
    }
}

</style>
