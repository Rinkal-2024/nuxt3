<template>
    <div
        :class="{ 'with-hover-call-to-action': withHoverCallToAction }"
        class="card triple-preview-overflow-item"
    >
        <Link :to="linkTo" rel="nofollow" withoutStyles>
            <Photo
                v-if="!$isAMP"
                :image="image"
                class="card__image"
                withPhotoCredits
                withPhotoCreditsPosition="topRight"
            />
            <AmpPhoto v-else :height="200" :image="image" class="card__image"/>
        </Link>

        <div class="card__content">
            <h2 class="content__title">
                <Link :to="linkTo" withoutStyles>{{ title }}</Link>
            </h2>

            <template v-if="category">
                <Link
                    v-if="categoryLinkTo"
                    :to="categoryLinkTo"
                    rel=""
                    without-styles
                >
                    <Category class="content__category">
                        {{ category }}
                    </Category>
                </Link>

                <span v-else>
                    <Category class="content__category">
                        {{ category }}
                    </Category>
                </span>
            </template>

            <p v-if="description">
                <Link
                    v-if="linkDescription"
                    :to="linkTo"
                    class="content__description"
                    rel="nofollow"
                    withoutStyles
                >
                    {{ description }}
                </Link>
                <span v-else class="content__description">
                    {{ description }}
                </span>
            </p>

            <Link
                v-if="!withoutCallToAction"
                :to="linkTo"
                class="content__link desktop"
                rel="nofollow"
            >
                <span class="">{{ linkTitle }}</span>
            </Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TriplePreviewOverflowItem',
    props: {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String | Boolean,
            default: false
        },
        description: {
            type: String | Boolean,
            default: false
        },
        linkTo: {
            type: String | Object,
            default: '/'
        },
        categoryLinkTo: {
            type: String | Object,
            default: ''
        },
        image: {
            type: Object,
            required: true
        },
        withoutCallToAction: {
            type: Boolean,
            default: false
        },
        linkTitle: {
            type: String,
            default: 'See more'
        },
        withHoverCallToAction: {
            type: Boolean,
            default: false
        },
        withLinkAsButton: {
            type: Boolean,
            default: false
        },
        linkDescription: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.card {
    flex: 1 1 100%;
    text-align: center;
    display: flex;
    flex-direction: column;

    @include medium-and-large-screens {
        flex: 0 1 calc(33.333% - 0.6rem);
    }

    &:hover.with-hover-call-to-action,
    &:focus.with-hover-call-to-action {
        @include medium-and-large-screens {
            .link--as-button {
                transition-delay: 0.1s;
                opacity: 1;
                visibility: visible;
            }

            .card__content {
                top: -3rem;
            }
        }
    }
}

.content__see-more-btn {
    margin-top: 1rem;
    transition: opacity 0.2s ease-in-out, visibility 0.15s ease-in-out;
    @include medium-and-large-screens {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        visibility: hidden;
        &:hover {
            background-color: $color-black;
            color: $color-white;
            text-decoration: none;
        }
    }
}

.card__content {
    transition: top ease-in;
    transition-duration: 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: $color-white;
    padding: 0.5rem;
    margin: 0 0.5rem -2.25rem 0.5rem;
    top: -2.25rem;
    flex: 1;

    @include medium-and-large-screens {
        top: -1rem;
        margin: 0 1rem 0 1rem;
        padding-bottom: 0;
    }
}

.content__title {
    padding: 0.75rem;
    margin: 0;
    font-style: normal;
    font-weight: 100;
    @include apply-font-and-size("heading", 9);

    @include medium-and-large-screens {
        padding: 0.5rem 0 0;
        @include apply-font-and-size("heading", 3);
    }
}

.content__description {
    @include apply-font-and-size("paragraph", 5);
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    color: #222;
}

.content__link {
    margin-top: auto;
    padding-top: 0.5rem;
    text-decoration: underline;
    letter-spacing: 0.1rem;
    font-size: 0.5rem;

    &.link--as-button {
        padding-top: 0;
    }

    .link__desktop {
        display: none;
    }

    .link__mobile {
        display: block;
    }

    @include medium-and-large-screens {
        .link__desktop {
            display: block;
        }

        .link__mobile {
            display: none;
        }
    }
}

.content__category {
    padding: 1.25em;
    margin: 0;

    @include medium-and-large-screens {
         padding: 1em 0 0 0;
    }

    ::v-deep a {
        color: $color-darker-grey;
        text-decoration-color: $color-darker-grey;
    }
}

.card__image {
    height: 12.5rem;

    @include medium-and-large-screens {
        height: 15rem;
    }
}

</style>
