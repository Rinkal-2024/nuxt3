<template>
    <div>
        <Breadcrumbs/>
        <PageSection id="photo-section" class="photo-section" without-vertical-margins>
            <BackToLink>Back</BackToLink>
            <div class="photo">
                <div class="photo-image">
                    <Photo
                        v-if="!$isAMP"
                        :image="image"
                        :lazy="false"
                        :sizes="srcSizes"
                        isSharable
                        withObjectFitContain
                        withPhotoCredits
                        withPhotoCreditsPosition="below"
                        withRelativeHeight
                    />
                    <template v-else>
                        <AmpPhoto
                            :column-width="828"
                            :height="image.height"
                            :sizes="ampSrcSizes"
                            :image="image"
                            object-fit="contain"
                        />
                        <div class="photo-section__credits">
                            Photo: {{ image.photographed_by }}
                        </div>
                    </template>
                </div>
                <div class="photo-desc">
                    <h1 class="photo-desc-title">
                        {{ title }}
                    </h1>
                    <div class="photo-desc-content">
                        <div class="photo-desc-content-section">
                            <div v-if="colors" class="section-header">COLORS</div>
                            <div class="section-body">
                                 <div class="colors-container --circular">
                                    <template v-for="(color, i) in colors">
                                        <Link  v-if="!$isAMP" :key="`color-link-${i}`" :to="getColorLink(color.id)">
                                            <ColorsSelectorColor
                                                :color="color"
                                            />
                                        </Link>
                                        <NuxtLink :key="`color-nuxtlink-${i}`" v-else :to="getColorLink(color.id)" without-styles>
                                            <div
                                                :style="{ backgroundColor: color.color }"
                                                class="color"
                                                @click="emitClickEvent"
                                            >
                                            &nbsp;
                                            </div>
                                        </NuxtLink>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div  v-if="category" class="photo-desc-content-section">
                            <div class="section-header">CATEGORY</div>
                            <div class="section-body">
                                <Link :to="categoryLink" without-styles>
                                    {{ category.name }}
                                </Link>
                            </div>
                        </div>
                        <div class="photo-desc-content-section">
                            <div class="section-header">DESCRIPTION</div>
                            <div class="section-body">
                                {{ description }}
                            </div>
                        </div>
                        <div v-for="vendorGroup in vendors" class="photo-desc-content-section" :key="vendorGroup">
                            <div class="section-header">{{ vendorGroup.label }}</div>
                            <template v-for="vendor in vendorGroup.items" :key="vendor.id">
                                <div class="section-body">
                                    <LinkRaw
                                        v-if="vendor.website"
                                        :href="vendor.website"
                                        withoutStyles

                                    >
                                        {{ vendor.name }}
                                    </LinkRaw>
                                    <div
                                        v-else-if="vendor"
                                    >
                                        {{ vendor.name }}
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="photo-buttons">
                        <div class="centered-buttons">
                            <Link v-if="originalPostRoute" :to="originalPostRoute">
                                <Button variant="outline">
                                    VIEW ORIGINAL POST
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageSection>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import IMAGE_SIZES from "~/constants/imageSizes";
import {getImageSrcSet} from "~/utils/imgSrcSet";
import lookupColors from '~/constants/colors'


const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: 'weddings',
    amp: 'hybrid',
    ampLayout: 'amp',
    computed: {
        ...mapGetters('api/singlePhoto', [
            'image',
            'colors',
            'category',
            'description',
            'vendors',
            'originalPostRoute',
            'title'
        ]),
        categoryLink() {
            return {
                name: 'inspiration-images-category-categoryId',
                params: {
                    categoryId: this.category?.slug ?? 'no-categorized'
                }
            }
        },
        srcSizes() {
            return `(max-width: 1024px) 100vw, ${IMAGE_SIZES.LARGE}px`
        },
        ampSrcSizes() {
            return `(max-width: ${IMAGE_SIZES.MEDIUM}px) 100vw, ${IMAGE_SIZES.MEDIUM}px`
        }
    },
    async asyncData({req, $http, store, route, redirect}) {
        const id = route.params.photoId || route.params.slug2

        const params = {
            fields: 'image(*),created,modified,next,previous,description,original_post,colors(*),vendors(name,website,categories(*)),category(name,slug)',
            id
        }

        const paramsParsed = createParamsString(params)

        try {
            const [meta, data] = await requestData(
                $http,
                getMetaUri(req, route),
                `galleries/${paramsParsed}`
            )

            if (data.items.length === 0) {
                redirect(301, '/not-found')
            }

            if (!route.params.slug1 || !route.params.slug2) { // redirect to full url if some params missing
                const photoData = data.items[0]
                const correctPath = {
                    name: 'inspiration-photo-photoId-slug1-slug2',
                    params: {
                        photoId: photoData.id,
                        slug1: photoData.category.slug,
                        slug2: photoData.image.slug
                    }
                }
                redirect(301, correctPath)
            }

            if (meta[0]) {
                meta[0].path = route.fullPath
            }

            await store.dispatch('api/singlePhoto/hydrate', {
                meta,
                data
            })
        } catch (e) {
            redirect(301, '/inspiration/images/');
        }
    },
    head() {
        const head = this.$store.getters['api/singlePhoto/head']
        const mainImage = this.image
        var sizesCalc = this.srcSizes

        if (this.$isAMP) {
            sizesCalc = this.ampSrcSizes
        }

        if (mainImage) {
           const mainImageLink = {
                rel: 'preload',
                fetchpriority: 'high',
                as: 'image',
                imagesrcset: getImageSrcSet(mainImage),
                imagesizes: sizesCalc
            }
                head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
        }
        return head
    },
    methods: {
        onBack($event) {
            $event.preventDefault()
            history.back()
        },
         getColorLink(colorId) {
            const colorName = lookupColors.find(obj => obj.id === colorId).name;
            return `/inspiration/images/color/${colorName}/`
        },
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.footer {
    margin-top: 0;
    @include medium-and-large-screens {
        margin-top: 1.5rem;
    }
}

.photo-desc-content-section {
    margin-bottom:1rem;
}

.photo-wrapper {
    display: flex;
    width: 100%;
}

.color {
    display: block;
    &:hover {
        transform: scale(1.2, 1.2) !important;
    }
}

.photo {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    /*@include medium-and-large-screens {
        flex-direction: row;
    }*/
    @include medium-and-large-screens {
        max-width:1080px;
        margin:0 auto;
    }

    .photo-image {
        display: flex;
        flex-direction: column;
        flex: 1 1 30%;
        width: 100%;

        ::v-deep {
            .figure__caption > i {
                font-style: italic;
                margin-top: 0.4rem;
                @include apply-font-and-size("label-decorative", 10);
                @include medium-and-large-screens {
                    @include apply-font-and-size("label-decorative", 6)
                }
            }
        }
    }

    .photo-desc {
        flex: 4;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-top: 1rem;

       /* @include medium-and-large-screens {
            margin: 0 1rem;
        } */

        .photo-desc-title {
            @include apply-font-and-size("heading", 1);
        }

        .photo-desc-content {
            display: flex;
            flex-direction: column;
            flex: 1;

            /*
            @include medium-and-large-screens {
                margin-top: 0.5rem;
                flex-direction: row;
                justify-content: space-between;
            } */

            .photo-desc-content-left {
                padding: 0.2rem;
                display: flex;
                flex: 2 1;
                flex-wrap: wrap;
               /* @include medium-and-large-screens {
                    margin-right: 1rem;
                } */

                .photo-desc-content-left-header {
                    display: flex;
                    flex: 1;
                    margin: 0.5rem 0;
                    flex-direction: row;
                    align-items: center;
                    @include medium-and-large-screens {
                        flex-direction: column;
                        margin-top: 0;
                        align-items: flex-start;
                        justify-content: space-between;
                    }

                    > div {
                        display: flex;
                        flex: 1 0;
                    }


                }

                .photo-desc-content-left-body {
                    flex: 1 1 100%;
                    @include apply-font-and-size("paragraph", 3);
                    font-size: .75rem;
                    margin-top: 0.5rem;
                    @include medium-and-large-screens {
                        margin-top: 0.5rem;
                        @include apply-font-and-size("paragraph", 4);
                        font-size: 0.65rem;
                    }
                }
            }

            .photo-desc-content-right {
                flex: 1;
                padding: 0.2rem;
                margin-top: 0.5rem;
                margin-right: 2rem;
            }
        }

        .photo-buttons {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            flex: 0 0;
            margin-top: 1rem;
            margin-bottom: 1rem;

            @include medium-and-large-screens {
                justify-content: flex-start;
                align-items: flex-start;
                margin-bottom: 0;
            }

            .photo-similar-images-link {
                margin: 1rem;
                text-transform: uppercase;
                @include apply-font-and-size("link", 6);
                @include medium-and-large-screens {
                    margin: 0.5rem 0 0 0;
                }
            }
        }
    }
}

.centered-buttons {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.section-header {
    @include apply-font-and-size("label", 4);
    color: $color-darker-grey;
    margin-bottom: 0.5rem;
    @include medium-and-large-screens {
        @include apply-font-and-size("label", 7);
        margin-bottom: 0.16rem;
    }
}

.section-body {
    text-transform: none;
    @include apply-font-and-size("label-decorative", 4);
    @include medium-and-large-screens {
        @include apply-font-and-size("label-decorative", 6);
    }
    margin-top: 0.5rem;

    .colors-container {
        &.--circular {
            max-width: 100%;
            justify-content:flex-start;
            ::v-deep .color {
                padding: 5px;
                margin: .5rem 1rem .5rem 0;

                 @include medium-and-large-screens {
                    margin: .25rem 0.5rem .25rem 0;
                 }
            }
        }
    }
}


.photo-section ::v-deep .body {
    margin-top: 0;
}

</style>
