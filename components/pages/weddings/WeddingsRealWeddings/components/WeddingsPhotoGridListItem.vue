<template>
    <div class="photo-grid">
        <div class="images-and-link-wrapper">
            <div class="photo-grid-images">
                <template v-if="!$isAMP">
                    <Photo
                        v-for="image in imagesSliced"
                        :key="image.id"
                        :image="image"
                        class="photo-grid-image"
                        lazy
                    />
                </template>
                <template v-else>
                    <AmpPhoto
                        v-for="(image, index) in imagesSliced"
                        :key="image.id"
                        :full-width="false"
                        :height="index === 0 ? 160 : 130"
                        :image="image"
                        class="photo-grid-image"
                    />
                </template>
            </div>
            <Link :to="linkTo" rel="nofollow">
                <div class="photo-grid-overlay">
                    <Button variant="outline">
                        SEE WEDDING
                    </Button>
                </div>
            </Link>
        </div>
        <div class="title-and-subtitle">
            <h2
                v-if="title"
                class="title"
            >
                <Link :to="linkTo">
                    {{ title }}
                </Link>
            </h2>

            <Category
                v-if="category"
            >
                {{ category }}
            </Category>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeddingsPhotoGridListItem',
    props: {
        images: {
            type: Array,
            default: () => []
        },
        linkTo: {
            type: String | Object,
            default: '/'
        },
        title: {
            type: String | Boolean,
            default: false
        },
        category: {
            type: String | Boolean,
            default: false
        },
        imagesLimit: {
            type: Number,
            default: 5
        }
    },
    computed: {
        imagesSliced() {
            return this.images.slice(0, this.imagesLimit)
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.photo-grid {
    // We are using px here so the advertisement
    // will have the same width on mobile devices
    width: 300px;
    margin: 1rem 0.25rem 0 0.25rem;

    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
}

.photo-grid-images {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 0;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 300px;

    .photo-grid-image:not(:first-child) {
        width: calc(100% / 2 - 0.125rem);
        height: 130px;
        box-sizing: border-box;
    }

    .photo-grid-image:nth-of-type(n + 1) {
        margin-top: 0.25rem;
    }

    .photo-grid-image:nth-of-type(even) {
        margin-right: 0.25rem;
    }

    .photo-grid-image:first-child {
        flex-basis: 100%;
        margin: 0;
        height: 10rem;
        width: 100%;
    }
}

.images-and-link-wrapper {
    position: relative;
    flex: 1;
    display: flex;

    &:hover {
        .photo-grid-overlay {
            display: flex;
            opacity: 1;
        }
    }
}

.photo-grid-overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: $color-white-transparent;
    opacity: 0;
    transition: opacity 0.35s ease;
}

.title-and-subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    //height: 100%;
    flex: 1;
}

.title {
    margin: 1rem 0 0 0;
    text-align: center;

    ::v-deep a {
        @include apply-font-and-size("heading", 3);
        font-style: normal;
        text-transform: none;
    }
}


</style>
