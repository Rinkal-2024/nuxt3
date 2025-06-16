<template>
    <div class="card card-style-2">
        <Link :to="linkTo" rel="nofollow" withoutStyles class="js-card-link">
            <Photo
                v-if="!$isAMP"
                :image="image"
                class="card__image"
                withPhotoCredits
                withPhotoCreditsPosition="topRight"
            />
            <AmpPhoto
                v-else :height="ampPhotoHeight"
                :image="image"
                class="card__image"
            />
        </Link>

        <div class="card__content">
            <div class="content__headings">
                <h2 class="content__title">
                    <Link :to="linkTo" withoutStyles class="js-cart-title-link">{{ title }}</Link>
                </h2>

                <h3 class="content__subtitle js-card-subtitle">
                    {{ subtitle }}
                </h3>
            </div>

            <Link
                v-if="category"
                :to="linkTo"
                rel="nofollow"
                withoutStyles
            >
                <Category class="content__category">
                    {{ category }}
                </Category>
            </Link>

            <Link v-if="withLinkButton" :to="linkTo" class="content__link" rel="nofollow">
                <template v-if="alwaysButton">
                    <Button>
                        {{ linkToLabel }}
                    </Button>
                </template>

                <template v-else>
                    <span class="link__desktop">{{ linkToLabel }}</span>

                    <Button class="link__mobile">
                        {{ linkToLabel }}
                    </Button>
                </template>
            </Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardStyle2',
    props: {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String | Boolean,
            default: false
        },
        subtitle: {
            type: String,
            default: undefined
        },
        linkTo: {
            type: String | Object,
            default: '/'
        },
        image: {
            type: Object,
            required: true
        },
        withLinkButton: {
            type: Boolean,
            default: false
        },
        linkToLabel: {
            type: String,
            default: 'See more'
        },
        alwaysButton: {
            type: Boolean,
            default: false
        },
        ampPhotoHeight: {
            type: Number,
            default: 176
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.card {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    margin: 1rem 0 0 0;
    padding: 0;
    text-align: center;

    @include medium-and-large-screens {
        margin-top: 0;
        flex: 1 1 calc(33.333% - 1rem);
        margin-left: 1rem;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1 1 100%;
}

.content__headings {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
}

.content__title {
    margin: 1rem 0 0 0;
    font-style: normal;
    @include apply-font-and-size("heading", 9);
    font-weight: lighter;
}

.content__subtitle {
    margin: 0.5rem 0 0 0;
    font-weight: 100;
    font-style: italic;
    @include apply-font-and-size("heading", 3);
    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 4);
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
    padding-top: 1rem;
    text-decoration: underline;
    letter-spacing: 0.1rem;
    font-size: 0.5rem;

    &.linkAsButton {
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
    height: 11rem;
    width: 100%;
    flex-shrink: 0;

    img {
        object-position: 50% 35%;
    }

    @include medium-and-large-screens {
        img {
            object-position: center;
        }
    }
}

</style>
