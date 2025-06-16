<template>
    <form id="vendor-search-form">
        <template v-if="!$isAMP">
            <div v-if="withVendorType" class="vendor-type">
                <div class="find-headline">
                    <h2 class="heading">
                        Find Local Wedding
                        <span class="select-vendor">
                        <span :class="{ 'is-selected': !isVenue }" class="vendor-type-text">
                            Vendors
                        </span>
                        <span class="separator">/</span>
                        <span :class="{ 'is-selected': isVenue }" class="vendor-type-text">
                            Venues
                        </span>
                    </span>
                    </h2>
                </div>
                <h5 class="label">
                    DISCOVER THE TOP {{ isVenue ? 'Venues' : 'Vendors' }} IN YOUR AREA
                </h5>
            </div>
            <div class="fields">
                <SelectDropDown
                    details-id= "vendor-category-details"
                    select-class="select-vendor-category"
                    :items="vendorsTypes"
                    placeholder-text="Select Vendor Type"
                    all-text="All Types"
                    field-title="Category:"
                />
                <div class="location location-field">
                    <FieldTitle class="fields-title">
                        <div>Location:</div>
                        <div class="willing-to-travel">
                            <CheckboxField
                                v-model="isWillingToTravel"
                                label="Include vendors willing to travel"
                                name="willing-to-travel"
                            />
                        </div>
                    </FieldTitle>
                    <Input
                        id="vendor-location"
                        v-model="location"
                        class="field"
                        name="location"
                        placeholder="Enter Zip, City or State"
                        type="text"
                    />
                    <Button
                        class="button"
                        variant="outline"
                        type="submit"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </template>
        <div v-else class="amp-pagination dark">
            <Link :to="{name: 'vendor'}" force-no-amp>
                Search for vendors
            </Link>
        </div>
    </form>
</template>

<script>
export default {
    name: 'VendorSearchForm',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    mounted() {
        const defaultLocation = this.$route.query?.location

        if (defaultLocation) {
            this.location = defaultLocation
        }

        this.isWillingToTravel = (this.$route.query?.willingToTravel ?? 'true') === 'true'
    },
    data: () => ({
        isVenue: false,
        withVendorType: false,
        location: null,
        isWillingToTravel: false,
        vendorCategory: null
    }),
    computed: {
        vendorsTypes() {
            return this.categories.map(v => ({
                label: v.name,
                value: v.slug
            })).sort(function(a, b) {
                const x = a.label.toUpperCase();
                const y = b.label.toUpperCase();
                return (x < y) ? -1 : (x > y) ? 1 : 0;
            });
        }
    },
    methods: {
        vendorCategoryChanged(value) {
            this.vendorCategory = value
        },
        search() {
            const category = this.vendorCategory?.value ? {vendorCategorySlug: this.vendorCategory?.value} : null
            const location = this.location ? {location: this.location} : null
            const willingToTravel = this.isWillingToTravel
            const query = {
                ...location
            }

            if (!willingToTravel) {
                query.willingToTravel = willingToTravel
            }

            if (!location) {
                this.$router.push({
                    name: 'vendor-search-category-categorySlug',
                    params: {
                        categorySlug: category.vendorCategorySlug
                    },
                    query
                })
            } else {
                this.$router.push({
                    name: 'vendor-search',
                    query: {
                        ...category,
                        ...query
                    }
                })
            }

            this.$nuxt.refresh()
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

::v-deep summary {
    background-color: transparent !important;
}

.select-drop-down {
    margin: 0;
    @include medium-and-large-screens {
        margin: 1rem 2rem 0 0;
    }
}

#vendor-search-form {
    display: flex;
    flex: 0 0 100%;
}

.fields {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1 1 100%;

    @include medium-and-large-screens {
        flex-direction: row;
        align-items: flex-start;
        position: relative;
    }

     .select-drop-down {
        z-index: 10;
        flex: 1 1 40%;

        @include small-and-medium-screens {
            width: 100%;
            padding: 0;
        }
    }
}

.button {
    padding: 0 1rem;
    height: calc(2.5rem - #{($input-border-size * 2)});
    flex: 1 1 100%;
    margin-top: 1.5rem;
    border-color: $color-black;
    @include medium-and-large-screens {
        border-color: $input-border-color;
        margin-top: 0;
        flex: 0 0 auto;
        margin-left: 1rem;
    }
}

.location {
    display: flex;
    flex: 60%;
    flex-wrap: wrap;

    .fields-title {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0.6rem;
        @include apply-font-and-size("label", 5);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 7);
        }
    }

    .field {
        flex: 1 1;
    }

    .input {
        background-color: transparent;
    }

    .error-message {
        min-height: 0;
    }
}

.willing-to-travel {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    text-align: left;
    align-self: flex-start;
    right: 0;
    padding-left: 0.5rem;

    @include small-and-medium-screens {
        position: relative;
    }

    @include medium-and-large-screens {
        align-self: inherit;
    }

    ::v-deep {
        .checkbox {
            justify-content: flex-end;
            @include medium-and-large-screens {
                justify-content: flex-start;
                align-items: center;
            }
        }

        .field-component {
            width: 20px;
            top: 5px;
            position: absolute;
            @include small-and-medium-screens {
                top: unset;
                bottom: -6px;
                left: 2rem;
            }
        }

        .input {
            background-color: $color-darker-white;
            border-color: $color-black;
            height: 1rem;
            width: 1rem;

            &:checked {
                background-size: 0.7rem;
            }

            @include medium-and-large-screens {
                height: 0.65rem;
                width: 0.65rem;
                &:checked {
                    background-size: 0.4rem;
                }
            }
        }

        .label-text {
            @include apply-font-and-size("label", 7);
            @include medium-and-large-screens {
                @include apply-font-and-size("label", 13);
            }
            min-width: 270px;
            text-align: right;
        }

        .error-message {
            min-height: 0;
        }
    }
}

.category-input {
    ::v-deep {
        @include small-and-medium-screens {
            .field-title {
                font-size: .75rem !important;
            }
        }

        .vs__dropdown-toggle {
            border: none;
        }
    }
}

</style>
