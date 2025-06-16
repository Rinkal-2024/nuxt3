<template>
    <form
        id="wedding-filters-form"
        @submit.prevent="submit"
    >
        <div class="wedding-filters-form__body">
            <ColorsSelector
                :colors="colors"
                @colorsSelectionChanged="handleColorsSelectionChange"
            />
            <SelectDropDown 
                details-id= "wedding-category-details"
                select-class="select-wedding-category"
                :items="options"
                placeholder-text="By style"
                all-text="All Styles"
            />
            <AdvancedFilters
                @selectionChanged="handleAdvancedFiltersChange"
            />
            <AdvancedSearch
                @selectionChanged="handleAdvancedSearchChange"
            />
            <Button
                type="submit"
                variant="outline"
                class="submit-btn"
            >
                Submit
            </Button>
        </div>
    </form>
</template>

<script>
import { mapGetters } from 'vuex'
import colors from '~/constants/colors'
import {FILTERS} from '~/constants/weddingsFilters'


export default {
    name: 'WeddingFiltersForm',
    data: () => ({
        query: {},
        filters: null,
        search: null,
        colorsSelection: null,
        mobFilters: FILTERS
    }),
    computed: {
        ...mapGetters('api/weddings', [
            'colors'
        ]),
        onlyColorSearch() {
            const keys = Object.keys(this.query)

            return keys.length === 1 && keys[0] === 'colors' && this.query.colors.length === 1
        },
        onlySingleFilterSearch() {
            const keys = Object.keys(this.query)

            return keys.length === 1 &&
                this.query[keys[0]]?.length === 1 &&
                !(['colors', 'location', 'venue', 'couple', 'business'].includes(keys[0]))
        },
         options() {
            return Object.entries(this.mobFilters)
                .filter(([key, value]) => value.sectionQueryKey === 'style_type')
                .map(x => ({
                    value: x[1].queryKey,
                    label: x[1].title   
                }));
        }
    },
    methods: {
        handleColorsSelectionChange(colors) {
            this.colorsSelection = colors
        },
        handleAdvancedFiltersChange(filters) {
            this.filters = filters
        },
        handleAdvancedSearchChange(search) {
            this.search = search
        },
        computeQueryObject() {
            this.query = {}
            const filters = this.filters

            for (const filtersGroup in filters) {
                for (const filter in filters[filtersGroup]) {
                    if (filters[filtersGroup][filter]) {
                        typeof this.query[filtersGroup] === 'undefined' && this.$set(this.query, filtersGroup, [])
                        this.query[filtersGroup].push(filter)
                    } else {
                        typeof this.query[filtersGroup] !== 'undefined' &&
                        this.query[filtersGroup].length === 0 &&
                        this.$delete(this.query, filtersGroup)
                    }

                    typeof this.query[filtersGroup] !== 'undefined' &&
                    this.query[filtersGroup].length > 0 &&
                    (this.query[filtersGroup] = [...new Set(this.query[filtersGroup])])
                }
            }

            if (this.colorsSelection.length > 0) {
                this.query.colors = this.colorsSelection
            }

            this.query = {
                ...this.query,
                ...this.search
            }
        },
        submit() {
            this.computeQueryObject()

            if (this.onlyColorSearch) {
                this.$router.push({
                    name: 'weddings-search-color-colorId',
                    params: {
                        colorId: colors.find(color => color.id === this.query.colors[0]).name
                    }
                })

                this.$nuxt.refresh()
                return
            }

            if (this.onlySingleFilterSearch) {
                const categoryType = Object.keys(this.query)[0]
                const categoryId = this.query[categoryType][0]

                this.$router.push({
                    name: 'weddings-search-category-categoryType-categoryId',
                    params: {
                        categoryType,
                        categoryId
                    }
                })

                this.$nuxt.refresh()
                return
            }

            this.$router.push({
                name: 'weddings-search',
                query: this.query
            })

            this.$nuxt.refresh()
        }
    }
}
</script>

<style scoped lang="scss">

.select-drop-down {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    border: none;
    margin-top: 1rem;
    width: 100%;

    @include medium-and-large-screens {
        display:none;
    }
}



#wedding-filters-form {

    .advanced-filters {
        @include small-and-medium-screens {
                display:none;
            }
    }

    .advanced-search {
          @include small-and-medium-screens {
                display:none;
            }
    }

    .wedding-filters-form__body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom: 1px solid $color-grey;
        align-items: center;
        padding: 1rem 0;
        @include medium-and-large-screens {
                    flex-direction: row;
                    align-items: center;
                    padding: 0.7rem 0;
                }

        .colors-selector {
            @include small-and-medium-screens {
                width:100%
            }
        }

        .submit-btn {
            align-self: start;
            height: 2.5rem;
            flex: 1 1 100%;
            width: 100%;
            margin-top: 1rem;

            @include medium-and-large-screens {
                margin-top: 0;
                flex: 1 0 2rem;
                border-color: $input-border-color;
            }
        }
    }
}

</style>
