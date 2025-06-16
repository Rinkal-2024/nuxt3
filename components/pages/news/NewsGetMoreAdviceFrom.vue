<template>
    <PageSection :title="title" class="get-more-advice-from" without-top-body-margin>
        <Cards class="cards">
            <CardStyle1
                v-for="item in items"
                :key="item.id"
                :category="item.category"
                :categoryLinkTo="vendorCategoryPath(item)"
                :description="item.description"
                :image="item.image"
                :linkTo="vendorProfilePath(item)"
                :title="item.title"
                linkTitle="See more"
            />
        </Cards>
        <Link class="more-vendors-link" rel="nofollow" to="/vendor" without-styles>
            <Button>More wedding vendors</Button>
        </Link>
    </PageSection>
</template>

<script>
export default {
    name: 'NewsGetMoreAdviceFrom',
    data: () => ({
        title: 'Get More Wedding Advice From'
    }),
    computed: {
        items() {
            return this.$store.getters['api/news/getMoreAdviceFromItems']
        }
    },
    methods: {
        vendorCategoryPath(vendor) {
            return {
                name: 'vendor-search-category-categorySlug',
                params: {
                    categorySlug: vendor.categorySlug,
                }
            }
        },
        vendorProfilePath(vendor) {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: vendor.slug,
                    id: vendor.id
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.cards {
    margin-top: 40px;

    ::v-deep {
        .card {
            flex: 0 1 calc(50% - 1.5rem);
            flex-grow: 0;
            flex-shrink: 1;

            .figure {
                height: 21rem;
            }

            .card__content {
                top: -6.5em;
                margin-bottom: -5rem;
                padding: 2rem;
            }

            .content__title {
                @include apply-font-and-size("heading", 2);
            }

            .content__category {
                margin-top: 0.5rem;
            }

            .subtitle {
                @include apply-font-and-size("heading", 2);
            }

            .content__link {
                @include apply-font-and-size("link", 7);
                margin-top: 0.5rem;
            }
        }
    }
}

.more-vendors-link {
    width: 100%;
    display: flex;
    justify-content: center;
    flex: 1 1 100%
}

</style>
