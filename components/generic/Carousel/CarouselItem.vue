<template>
    <div class="carousel__container">
        <div class="container__item">
            <Link :to="to" rel="nofollow">
                <Photo
                    v-if="!$isAMP"
                    :image="image"
                    :isSharable="isSharable"
                    :lazy="lazy"
                    :sizes="sizes"
                    :withPhotoCreditsPosition="withPhotoCreditsPosition"
                    class="item__image"
                    withPhotoCredits
                />
                <AmpPhoto
                    v-else
                    :height="ampPhotoHeight"
                    :image="image"
                    class="item__image"
                />
            </Link>
            <div class="item__titles">
                <Link :to="to">
                    <h2>{{ title }}</h2>
                </Link>
                <Link v-if="withSubtitle" :to="to" rel="nofollow">
                    <h3>{{ subtitle }}</h3>
                </Link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarouselItem',
    props: {
        image: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String | null,
            default: null
        },
        to: {
            type: String,
            required: true
        },
        isSharable: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: true
        },
        sizes: {
            type: String,
        },
        withPhotoCreditsPosition: {
            type: String,
            default: 'bottomRight'
        },
        ampPhotoHeight: {
            type: Number,
            default: 320
        }
    },
    computed: {
        withSubtitle() {
            return this.subtitle !== null && this.subtitle !== ''
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.carousel {
    ::v-deep .slick-list,
    ::v-deep .slick-track {
        height: 100%;
        line-height: 0;
    }
}


.carousel ::v-deep .slick-dots {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    bottom: 0;

    ::v-deep &, ::v-deep li, ::v-deep button {
        height: auto;
    }

    ::v-deep button {
        padding: 0;
        line-height: 0;
    }

    ::v-deep button:before {
        border-radius: 50%;
        color: transparent;
        height: 0.2rem;
        width: 0.2rem;
        border: $border-width solid $color-black;
        opacity: 1;
    }

    ::v-deep .slick-active button:before {
        background-color: black;
    }
}


.carousel {
    position: relative;

    // slick carousel fix for Firefox
    // https://github.com/kenwheeler/slick/issues/982#issuecomment-408044585
    overflow: hidden;
    min-width: 100%;
    width: 0;

    ::v-deep .slick-arrow {
        width: 2.5rem;
        height: 2.5rem;

        &:before {
            font-size: 2rem;
        }
    }

    ::v-deep .slick-arrow {
        position: absolute;
        z-index: $carousel-arrows-z-index;
        filter: drop-shadow(0 2px 2px $color-black);
    }

    ::v-deep .slick-next {
        right: 1rem;
        @include medium-and-large-screens {
            right: 2rem;
        }
    }

    ::v-deep .slick-prev {
        left: 1rem;
        @include medium-and-large-screens {
            left: 2rem;
        }
    }

}

.container__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
}

.item__image, .item__image ::v-deep img {
    height: 20rem !important;
    @include medium-and-large-screens {
        height: 31.25rem !important;
    }
}

.item__titles {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    background-color: $color-black-transparent;
    padding: 0.5rem;

    a, h2, h3 {
        color: $color-white;
        text-decoration-color: $color-white !important;
    }

    h2 {
        @include apply-font-and-size("heading", 3);
        font-weight: bold;
        font-style: normal;
        text-transform: none;
    }

    h3 {
        @include apply-font-and-size("heading", 4);
        font-weight: 100;
        font-style: italic;
        text-transform: none;
    }

    @include medium-and-large-screens {
        h2 {
            @include apply-font-and-size("heading", 2);
        }
        h3 {
            @include apply-font-and-size("heading", 9);
        }
    }
}
</style>
