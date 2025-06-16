<template>
    <div v-if="vendors && vendors.length" class="vendor-carousel">
        <PageSection :title="title">
            <div class="vendor-container fixed-height hide-overflow">
                <CardStyle5
                    v-for="vendor in vendors"
                    :key="vendor.id"
                    :title="vendor.name"
                    :image="vendor.main_image.image"
                    :link-to="vendorProfilePath(vendor)"
                    link-to-label="View vendor"
                />
            </div>
            <div class="vendor-carousel__link-container">
                <Link :to="vendorCategoryPath">
                    <Button variant="primary">See more vendors</Button>
                </Link>
            </div>
        </PageSection>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "VendorCarousel",
    data: () => ({
        carouselSettings: {
            dots: false,
            centerMode: false,
            slidesToScroll: 1,
            variableWidth: true,
            swipeToSlide: true,
            lazyLoad: null,
            infinite: true
        },
        mobileCarouselSettings: {
            slidesToShow: 1,
            dots: false,
            swipeToSlide: true
        }
    }),
    computed: {
        ...mapGetters('api/news', ['vendors']),
        vendorCategoryPath() {
            if (this.vendors && this.vendors.length) {
                return {
                    name: 'vendor-search-category-categorySlug',
                    params: {
                        categorySlug: this.vendors && this.vendors[0].categories[0]?.slug
                    }
                }
            }
        },
        title() {
            return this.vendors?.length && this.vendors[0].categories[0].name + ' Vendors'
        }
    },
    methods: {
        vendorProfilePath(vendor) {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: vendor.slug,
                    id: vendor.id
                }
            }
        }
    },
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.vendor-carousel__link-container.vendor-carousel__link-container {
    margin-top: 2rem;
}

.vendor-carousel {
    &__link-container {
        margin-top: 0;
        width: 100%;
        text-align: center;

        @include small-and-medium-screens {
            margin-top: 0;
         }
    }
}

.vendor-container {
    text-align: center
}

.fixed-height {
    height: 14.5rem;
}


</style>
