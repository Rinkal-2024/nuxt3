<template>
    <VendorSearchSection
        :subtitle="subtitle"
        :title="title"
        class="build-team-section"
        withoutTopBodyMargin
    >
        <form class="form" id="vendor-search-form">
            <div class="fields">
                <SelectDropDown
                    details-id= "vendor-category-details"
                    select-class="select-vendor-category"
                    :items="vendorsTypes"
                    placeholder-text="Select Vendor Type"
                    all-text="All Types"
                    field-title="Category:"
                />
                <LocationField
                    class="location"
                    @change="locationChanged"
                />
                <Button
                    class="search-btn"
                    variant="outline"
                    type="submit"
                    name="Search"
                >
                    Search
                </Button>
            </div>
        </form>
    </VendorSearchSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'BuildYourWeddingTeam',
    data: () => ({
        title: 'Build Your Wedding Team',
        subtitle: 'Discover top venues and vendors to make your wedding perfectly you!',
        vendorCategory: null,
        location: null
    }),
    computed: {
        vendorsTypes() {
           return this.$store.getters['api/home/vendorTypes'].map(x => ({
                value: x.slug,
                label: x.name
            }))
        }
    },
    methods: {
        vendorCategoryChanged(value) {
            this.vendorCategory = value
        },
        locationChanged(value) {
            this.location = value
        },
        search() {
            const category = this.vendorCategory?.value ? {vendorCategorySlug: this.vendorCategory?.value} : null
            const location = this.location ? {location: this.location} : null
            this.$router.push({
                name: 'vendor-search',
                query: {
                    ...category,
                    ...location
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>


::v-deep summary {
    background-color: transparent !important;
}

.search-btn {
    padding: 0 1rem;
    height: calc(2.5rem - #{($input-border-size * 2)});
    flex: 1 1 100%;
    margin-top: 1.5rem;
    border-color: $color-black;

    @include small-and-medium-screens {
        width: 100%;
        padding: 0.6rem;
    }

    @include medium-and-large-screens {
        border-color: $input-border-color;
        margin-top: 0;
        flex: 0 0 auto;
        margin-left: 1rem;
    }
}

.build-team-section {
    margin-top: 2rem;
    padding-top: 3rem;
    padding-bottom: 2.5rem;
    background-color: $color-white;

    @include medium-and-large-screens {
        margin-top: 3rem;
        padding-top: 4.5rem;
        padding-bottom: 4.5rem;
        background-color: $color-darker-white;
    }

    ::v-deep .title {
        text-align: center;
        @include apply-font-and-size("heading", 2);

        @include medium-and-large-screens {
            @include apply-font-and-size("heading", 12);
            letter-spacing: -0.15rem;
        }
    }

    ::v-deep .subtitle {
        @include apply-font-and-size("label", 3);
        font-size: 0.7rem;
        letter-spacing: 0.15rem;
        text-transform: uppercase;
        font-style: normal;
    }

    .fields {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex: 1 1 100%;
        align-items: flex-end;

        @include medium-and-large-screens {
            flex-direction: row;
            align-items: flex-end;
            position: relative;
        }

        @include medium-and-large-screens {
            margin-top: 3rem;
        }
    }

    ::v-deep .select-drop-down {
        flex: 1 1 50% !important;

        @include small-and-medium-screens {
            width: 100%;
        }
    }

    ::v-deep .location {
        margin-top: 1.5rem;
        flex: 1 1 50%;
        @include medium-and-large-screens {
            margin-top: 0;
            margin-left: 1rem;
        }
    }
}

</style>
