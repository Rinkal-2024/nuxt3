<template>
    <form @submit.prevent="submit">
        <PageLayoutMargin>
            <div class="wedding-filters-mobile-form">
                <ColorsSelector
                    :colors="colors"
                    class="colors"
                    @colorsSelectionChanged="colorsSelectionChanged"
                />
                <template v-if="!$isAMP">
                    <AutocompleteSelect
                        v-model="chosenFilters"
                        :options="options"
                        class="style-field"
                        multiple
                        name="filters-mobile"
                        placeholder="By style"
                    />
                    <Button
                        class="button"
                        type="submit"
                        variant="outline"
                    >
                        Submit
                    </Button>
                </template>
                <template v-else>
                    <div id="style-filter" class="amp-dropdown">
                        <button
                            class="amp-dropdown__button"
                            on="tap:style-filter.toggleClass(class='open')"
                        >
                            By style
                        </button>
                        <div class="amp-dropdown__list">
                            <Link
                                v-for="option in options"
                                :key="option.queryKey"
                                :to="`/weddings/search/category/style_type/${option.queryKey}`"
                            >
                                <div class="amp-dropdown__option">
                                    {{ option.label }}
                                </div>
                            </Link>
                        </div>
                        <div
                            aria-label="Close dropdown"
                            class="amp-dropdown__backdrop"
                            on="tap:style-filter.toggleClass(class='open', force=false)"
                            role="button"
                            tabindex="1"/>
                    </div>
                </template>
            </div>
        </PageLayoutMargin>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import {FILTERS} from '~/constants/weddingsFilters'

export default {
    name: 'WeddingFiltersFormMobile',
    mounted() {
        this.restoreFiltersFromQuery()
    },
    data: () => ({
        chosenFilters: null,
        colorsSelection: [],
        filters: FILTERS
    }),
    computed: {
        ...mapGetters('api/weddings', [
            'colors'
        ]),
        options() {
            return Object.entries(this.filters)
                .filter(([key, value]) => value.sectionQueryKey === 'style_type')
                .map(x => x[1])
        }
    },
    methods: {
        colorsSelectionChanged(colorsSelection) {
            this.colorsSelection = colorsSelection
        },
        restoreFiltersFromQuery() {
            let styleTypes = this.$route.query?.style_type || this.$route.params.categoryId || [];
            if (!Array.isArray(styleTypes)) {
                styleTypes = [styleTypes]
            }
            this.chosenFilters = styleTypes.map(x => this.options.find(y => x === y.queryKey))
        },
        submit() {
            if (this.colorsSelection.length === 0 && this.chosenFilters.length === 1) {
                this.$router.push({
                    name: 'weddings-search-category-categoryType-categoryId',
                    params: {
                        categoryType: 'style_type',
                        categoryId: this.chosenFilters[0].queryKey
                    }
                })
            } else {
                this.$router.push({
                    name: 'weddings-search',
                    query: {
                        style_type: this.chosenFilters.map(x => x.queryKey),
                        colors: this.colorsSelection
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

.wedding-filters-mobile-form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include small-and-medium-screens {
        margin-top: -30px;
    }
}

.colors {
    flex: 1 1 100%;
    margin-top: 1rem;
    flex-direction: column;
}

.style-field {
    margin-top: 1rem;
}

.button {
    align-self: start;
    flex: 1 1 100%;
    width: 100%;
    margin-top: 1rem;
}

</style>
