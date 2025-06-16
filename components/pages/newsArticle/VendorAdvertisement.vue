<template>
    <div class="wrapper vendor-advertisement">
        <h2 class="title">
            These talented wedding professionals
            <span class="highlight">are featured in this article:</span>
        </h2>
        <Separator class="separator"/>
        <div
            v-for="vendor in vendors"
            class="vendor"
            :key="vendor.id"
        >
            <CardStyle4
                :categories="vendor.categories"
                :image="vendor.main_image.image"
                :isTopLevel="isTopLevel(vendor)"
                :linkTo="linkTo(vendor)"
                :location="vendor.city.display_name"
                :title="vendor.title"
                class="card"
                withLinkButton

            />
            <div class="buttons">
                <Link :to="linkTo(vendor)">
                    <Button class="link" variant="outline">
                        View Vendor
                    </Button>
                </Link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VendorAdvertisement',
    props: {
        vendors: {
            type: Array,
            default: () => []
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
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.wrapper {
    z-index: 1;
    margin-bottom: .5rem;
    @include medium-and-large-screens {
        background-color: $color-white;
        margin-bottom: 0;
    }
}

.card {
    ::v-deep {
        .title {
            background-color: transparent;
            padding-top: 2rem;
        }
    }
}

.title {
    margin: 0.5rem 0 0 0;
    text-transform: capitalize;
    font-style: normal;
    font-weight: 100;
    text-align: center;
    @include apply-font-and-size("heading", 9);

    .highlight {
        display: block;
        font-style: italic;
    }

    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 4);
        text-align: left;
        .highlight {
            display: inline;
        }
    }
}

.separator {
    margin: 0.5rem 0 0 0;
}

.vendor {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    outline: none;
    position: relative;
    margin: 1rem 0 0 0;

    @include medium-and-large-screens {
        & + & {
            margin: 2rem 0 0 0;
        }
    }

    .card {
        margin-top: 0;
        margin-bottom: -2rem;
    }

    .link {
        margin-top: 1rem;
        flex-grow: 1;
        width: 100%;
        @include medium-and-large-screens {
            width: auto;
        }
    }

    ::v-deep {
        .image {
            height: 12rem;
        }
    }
}
.buttons {
    z-index: 2;
}

</style>
