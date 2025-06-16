<template>
    <PageSection class="related-vendors">
        <Separator/>
        <div class="section-header">
            These talented wedding professionals
            <span class="subtitle">made this event possible:</span>
        </div>
        <Separator class="separator"/>
        <Cards class="cards" id="vendor-cards"
        >
            <CardStyle4
                v-for="vendor in vendors"
                :key="vendor.id"
                :categories="vendor.categories"
                :image="vendor.main_image.image"
                :isTopLevel="isTopLevel(vendor)"
                :linkTo="linkTo(vendor)"
                :location="vendor.city.display_name"
                :title="vendor.title"
                class="vendor-card"
            >
                <div class="buttons">
                    <Link :to="vendorWeddingsPath(vendor)">
                        <Button class="redirect-button" variant="outline">
                            {{ `See more weddings from ${vendor.name}` }}
                        </Button>
                    </Link>
                </div>
            </CardStyle4>
        </Cards>
    </PageSection>
</template>

<script>
export default {
    name: 'RelatedVendors',
    data: () => ({
        mobileSettings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }),
    computed: {
        desktopSettings() {
            return {
                infinite: this.vendors.length > 2,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        vendors() {
            return this.$store.getters['api/weddingsArticle/relatedVendors']
        }
    },
    methods: {
        isTopLevel(vendor) {
            return vendor?.account_type === 'TOP_LEVEL'
        },
        linkTo(vendor) {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: vendor.slug,
                    id: vendor.id
                }
            }
        },
        vendorWeddingsPath(vendor) {
            return {
                name: 'weddings-search',
                query: {
                    vendorName: vendor.name,
                    vendorId: vendor.id
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.section-header {
    margin-top: 1rem;

    @include apply-font-and-size("heading", 9);
    text-align: center;
    font-weight: bold;

    .subtitle {
        font-weight: 100;
        font-style: italic;
    }

    @include medium-and-large-screens {
        margin-top: 2rem;
        text-align: left;
    }
}

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


.redirect-button {
    @include apply-font-and-size("link", 6);
    font-weight: 100;
    margin-top: 0.5rem;
    padding: 0.5rem 0.75rem;
    letter-spacing: 0.1rem;
    width: 100%;

    @include medium-and-large-screens {
        @include apply-font-and-size("link", 7);
        margin-top: -2rem;
        width: inherit;
    }
}

</style>
