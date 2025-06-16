<template>
    <div>
        <template v-if="!$isAMP">
            <div
                    :class="['photo-library-block', containerClass]"
                >
                <div  v-for="image in images"
                    :key="image.id" class="photo-library-element js-photo-library-element" >

                    <div class="photo-library-image"
                    :style="{height: getHeight(image)+'px'}">
                        <Photo :image="image.image"
                                lazy
                                isSharable
                                withObjectFitContain
                        />
                        <Link :to="imageUrl(image)" :aria-label="'zoom image: ' + image.title" class="image-overlay js-photo-library-element-link">
                            <div v-if="zoomAvailable" class="image-overlay-zoom">
                                <Button
                                    class="image-overlay-zoom-button"
                                    @click.native="setZoomedImage(image.image, $event)"
                                >
                                    <Icon height="38" name="zoomLight" width="38"/>
                                </Button>
                            </div>
                        </Link>
                        <div class="image-overlay-author js-figure-image-caption">
                            {{
                                image.image.photographed_by ? `Photo: ${image.image.photographed_by}` : ''
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div :style="styleObj.layout" class="photo-library mansonry-layout">
                <div
                    v-for="(column, columnIndex) in columns"
                    :key="columnIndex"
                    :style="styleObj.column"
                    class="photo-library-column"
                >
                    <div
                        v-for="(columnElement, ceIndex) in sliceColumn(column, splitColumnIndexes[columnIndex])"
                        :key="ceIndex"
                        :style="{width: '100%'}">
                        <div
                            v-for="image in columnElement"
                            :key="image.id"
                            class="photo-library-column-element"
                        >
                            <div class="photo-library-image">
                                <AmpPhoto :column-width="300" :image="image.image"/>

                                <Link :to="imageUrl(image)" class="image-overlay">
                                    <div v-if="zoomAvailable" class="image-overlay-zoom">
                                        <Button
                                            class="image-overlay-zoom-button"
                                            @click.native="setZoomedImage(image.image, $event)"
                                        >
                                            <Icon height="38" name="zoomLight" width="38"/>
                                        </Button>
                                    </div>
                                </Link>

                                <div class="image-overlay-author">
                                    {{
                                        image.image.photographed_by ? `Photo: ${image.image.photographed_by}` : ''
                                    }}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="photo-library-column-element">
                            <MobileView>
                                <AdUnit
                                    :amp-ad-slot-id="ampNoAds ? null :(ceIndex % 5) + 1"
                                    no-margin
                                />
                            </MobileView>
                        </div> -->
                    </div>
                </div>
            </div>

        </template>
        <ZoomedImage
            v-if="imagePreview"
            :image="zoomedImage"
            @onClose="removeZoomedImage"
        />
    </div>
</template>

<script>
import {splitArrayWithSort} from '~/utils/array'

export default {
    name: 'PhotoLibrary',
    props: {
        gap: {
            type: Number,
            default: 4
        },
        columnWidth: {
            type: Number,
            default: 400
        },
        containerMargin: {
            type: Number,
            default: 120
        },
        images: {
            type: Array,
            default: () => []
        },
        adUnits: {
            type: Array,
            default: () => []
        },
        strictWidth: {
            type: Boolean,
            default: false
        },
        ampNoAds: {
            type: Boolean,
            default: false
        },
        containerClass: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        maxColumns: 4,
        imageWidth: 400,
        zoomedImage: null,
        outsideClickLock: false,
        splitColumnIndexes: [9, 0, 3, 0],
        loadAds: false
    }),
    computed: {
        windowWidth() {
            return this.$store.getters['global/config/windowWidth']
        },
        isMobile() {
            return this.$store.getters['global/config/isMobile']
        },
        columnsCount() {
            if (process.server) {
                return this.isMobile ? 1 : 3
            }

            const columnsFromWindowWidth = Math.max(
                1,
                Math.floor(
                    (this.windowWidth - this.containerMargin) / (this.columnWidth + this.gap)
                )
            )

            return columnsFromWindowWidth <= this.maxColumns
                ? columnsFromWindowWidth : this.maxColumns
        },
        columns() {
            return splitArrayWithSort(this.images, this.columnsCount)
        },
        imagePreview() {
            return this.zoomedImage !== null
        },
        styleObj() {
            const style = {
                layout: {},
                column: {}
            }
            if (this.strictWidth) {
                style.column.width = this.columnWidth + 'px'
                style.column.maxWidth = this.columnWidth + 'px'
                style.layout.justifyContent = 'center'
            }
            return style
        },
        zoomAvailable() {
            return this.columnsCount !== 1 && !this.$isAMP
        },
        renderGallery() {
            return process.client || this.$isAMP
        }
    },
    methods: {
        setZoomedImage(image, event) {
            event.preventDefault()
            this.outsideClickLock = true
            this.zoomedImage = image

            setTimeout(() => {
                this.outsideClickLock = false
            }, 500)
        },
        removeZoomedImage() {
            if (this.outsideClickLock) {
                return
            }

            this.zoomedImage = null
        },
        imageUrl(image) {
            return {
                name: 'inspiration-photo-photoId-slug1-slug2',
                params: {
                    photoId: image.id,
                    slug1: image?.category?.slug ?? 'no-categorized',
                    slug2: image?.image?.slug || 'unnamed'
                }
            }
        },
        sliceColumn(column, elementLength) {
            if (elementLength === 0) {
                return [column]
            }
            const columnElements = [];

            for (let index = 0; index < column.length; index += elementLength) {
                const element = column.slice(index, index + elementLength);
                columnElements.push(element);
            }

            return columnElements;
        },
        getHeight(image){
                const ratio = this.imageWidth /image.image.original.width;
                return Math.ceil(ratio * image.image.original.height);
        }
    },
    mounted() {
        setTimeout(() => this.loadAds = true, 0)
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.photo-library-block {
    column-count: 3;
    column-width: 420px;
    column-gap: 0;
    margin: 0 auto;
    max-width: 1260px;
    @media (max-width: 1440px) {
        max-width: 840px;
    }
}

.photo-library-element {
 padding: 10px;
}



$gap: 1rem;

.mansonry-layout {
    display: flex;

    ::v-deep {
        .photo-library-column-element {
            margin-bottom: $gap;
            width: 100%;
        }

        .photo-library-column {
            margin-left: $gap;
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }
}

.photo-library-image {
    width: 100%;
    max-width:420px;
    display: flex;
    position: relative;
    margin: 0 auto;

    ::v-deep {

        .image-overlay {
            &:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
            }

            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: background-color 0.5s ease;
            z-index: $photo-library-overlay-z-index;
            margin: 0;

            .image-overlay-zoom {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;

                @include medium-and-large-screens {
                    display: none;
                }

                .image-overlay-zoom-button {
                    background-color: transparent;
                    border-color: transparent;
                    z-index: $photo-library-overlay-zoom-button-z-index;
                }

                .image-overlay-zoom-button:focus {
                    outline: 0;
                }
            }
        }
        .figure__image-container{
            height:100%;
        }

        .image {
            width: 100% !important;
            position: inherit;
            display: initial;
            top: initial;
            left: initial;
            height: 100%;
            max-width: initial;
            max-height: initial;
            //object-position: 50% 40%;
        }

        .figure {
            width: 100%;
        }

        .image-overlay-author {
            display: none;
            position: absolute;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            color: $color-white;
            font-style: italic;
            padding: 0.6rem;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: background-color 0.5s ease;
            @include apply-font-and-size("paragraph", 6);
            font-weight: bold;
        }
    }

    &:hover {
        .image-overlay,
        .image-overlay-author {
            background-color: $color-black-light-transparent;
            display: flex;
            cursor: pointer;

            .image-overlay-zoom {
                display: flex;
            }
        }
    }
}


.modal-image {
    height: 100%;
}


</style>
