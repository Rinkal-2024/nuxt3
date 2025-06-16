<template>
    <div class="vendors-list">
        <Cards :class="['cards', containerClass]" id="vendor-cards">
            <CardStyle4
                v-for="vendor in vendors"
                :key="vendor.id"
                class="vendor-card"
                :data-vendor-id="vendor.id"
                :amp-photo-height="240"
                :categories="vendor.categories"
                :description="vendor.brief_summary"
                :image="getVendorImage(vendor)"
                :isTopLevel="isVendorTopLevel(vendor)"
                :linkTo="vendorProfilePath(vendor)"
                :location="vendor.city.display_name"
                :title="vendor.name"
                :truncate-description="false"
                with-link-button
                withPhotoCreditsPosition="bottomRight"
            >
                <div class="buttons">
                    <Link :to="vendorProfilePath(vendor)" class="button--link js-vendor-profile-link">
                        <Button variant="outline">See details</Button>
                    </Link>
                    <Link :to="vendorRequestInfoPath(vendor)" class="button--link js-vendor-profile-request-quote-link" force-no-amp>
                        <Button variant="outline">Request quote</Button>
                    </Link>
                </div>
            </CardStyle4>
        </Cards>
        <template v-if="!$isAMP">
            <div v-waypoint="{ active: true, callback: loadMoreContent, intersectionOptions }"/>
            <div v-if="withLoadMoreButton" class="button-wrapper">
                <Button :id="vendorLoadMoreId" >Load more</Button>
                <div id="vendors-loading" class="hidden"><LoadingIndicator/></div>
            </div>
        </template>
        <template v-else>
            <div class="amp-pagination reduce-margin">
                <Link v-if="page > 1" :to="prevAMPPage">
                    Previous page
                </Link>
                <Link v-if="page < totalPages" :to="nextAMPPage">
                    Next page
                </Link>
            </div>
        </template>

    </div>
</template>

<script>
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
Vue.use(VueWaypoint)

export default {
    name: 'VendorsList',
    props: {
        vendors: {
            type: Array,
            default: () => []
        },
        withLoadMoreButton: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        page: {
            type: [Number, String],
            default: 1,
        },
        vendorLoadMoreId: {
            type: String,
        },
        containerClass: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        intersectionOptions: {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0, 1]
        },
        throttleLock: false
    }),
    computed: {
        totalPages() {
            if (this.$route.name === 'vendor') {
                return this.$store.getters["api/vendor/totalPages"]
            } else {
                return this.$store.getters["api/vendorSearch/totalPages"]
            }
        },
        currentRoutePath() {
            return this.$route.path;
        },
        prevAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: parseInt(this.page) - 1
                }
            }
        },
        nextAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: parseInt(this.page) + 1
                }
            }
        }
    },
    methods: {
        getVendorImage(vendor) {
            return vendor?.main_image?.image ?? null
        },
        vendorProfilePath(vendor) {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: vendor.slug,
                    id: vendor.id
                }
            }
        },
        vendorRequestInfoPath(vendor) {
            return {
                name: 'biz-slug-id-request-info',
                params: {
                    slug: vendor.slug,
                    id: vendor.id
                }
            }
        },
        isVendorTopLevel(vendor) {
            return vendor?.membership?.account_type === 'TOP_LEVEL'
        },
        loadMoreContent(ctx = {going: 'in'}) {
            if (this.loading || this.throttleLock || !this.withLoadMoreButton) {
                return
            }

            this.throttleLock = true
            setTimeout(() => {
                this.throttleLock = false
            }, 1000)

            if (ctx.going === this.$waypointMap.GOING_IN) {
                this.$emit('loadMore')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.cards {
    display: flex;
    justify-content: flex-start;
    flex: 1 1 100%;

    @include medium-and-large-screens {
        flex-flow: row wrap;
        justify-content: space-between;
    }

    &::after {
        content: "";
        flex: 0 0 calc(33.333% - 0.6rem);
    }

    ::v-deep {
        .card-style-4 {
            margin-top: 3.5rem;

            &.top-level {
                margin-top: 4rem;
            }

            @include medium-and-large-screens {
                margin-top: 3rem;
                flex: 0 0 calc(33.333% - 0.6rem);

                &.top-level {
                    margin-top: 3rem;
                }
            }
        }
    }
}

.buttons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    .button--link {
        flex: 1;
        padding: 0 4px;
        max-width: 45%;

        button {
            width: 100%;
            padding: 0.5rem;
        }
    }
}

.vendors-list {
    margin-top: -5rem;
    @include medium-and-large-screens {
        margin-top: -2rem;
    }
}

</style>
