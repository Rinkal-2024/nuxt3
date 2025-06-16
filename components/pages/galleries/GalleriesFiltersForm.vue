<template>
    <form
        id="gallery-filters-form"
        @submit.prevent="submit"
    >
        <div class="gallery-filters-form__body">
            <ColorsSelector
                :colors="colors"
                @colorsSelectionChanged="colorsSelectionChanged"
            />
            <template v-if="!$isAMP">
                <SelectDropDown 
                    details-id= "gallery-category-details"
                    select-class="select-gallery-category"
                    :items="sortedCategories"
                    placeholder-text="Category"
                    all-text="All Categories"
                />
                <div class="search">
                    <InputField
                        id="gallery-filter-search"
                        v-model="text"
                        :withFieldError="false"
                        class="search-field"
                        fullWidth
                        name="search"
                        placeholder="search"
                    />
                </div>
                <Button
                    class="submit-btn"
                    type="submit"
                    variant="outline"
                >
                    Submit
                </Button>
            </template>
            <template v-else>
                <div id="category-filter" class="amp-dropdown">
                    <button
                        class="amp-dropdown__button"
                        on="tap:category-filter.toggleClass(class='open')"
                    >
                        Category
                    </button>
                    <div class="amp-dropdown__list">
                        <Link
                            v-for="category in categories"
                            :key="category.slug"
                            :to="`/inspiration/images/category/${category.slug}`"
                        >
                            <div class="amp-dropdown__option">
                                {{ category.name }}
                            </div>
                        </Link>
                    </div>
                    <div
                        class="amp-dropdown__backdrop"
                        on="tap:category-filter.toggleClass(class='open', force=false)"
                        role="button"
                        tabindex="1"/>
                </div>
            </template>
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import colors from '~/constants/colors'

export default {
    name: 'GalleriesFiltersForm',
    props: {
        initialValue: {},
        colors: {}
    },
    mounted() {
        this.setCategoryFromQuery()
        this.setTextFromQuery()
    },
    data: () => ({
        category: null,
        text: null,
        colorsSelection: []
    }),
    computed: {
        ...mapGetters('api/galleries', [
            'categories'
        ]),
        query() {
            let query = {}
            this.category && (query.category = this.category.slug)
            this.text && (query.text = this.text)
            this.colorsSelection && (query.colors = this.colorsSelection)

            return query
        },
        sortedCategories() {
            //console.log(this.categories);
            return this.categories.sort((a, b) => {
                if (a.name > b.name)
                    return 1
                else if (a.name < b.name)
                    return -1
                else
                    return 0
            })
        }
    },
    methods: {
        colorsSelectionChanged(colorsSelection) {
            this.colorsSelection = colorsSelection
        },
        setCategoryFromQuery() {
            const category = this.$route.query?.category || this.$route.params?.categoryId

            this.category = this.categories.find(c => c.slug === category)
        },
        setTextFromQuery() {
            this.text = this.$route.query?.text
        },
        submit() {

            // no search query
            if (!this.text) {

                // only category chosen
                if (this.category && this.colorsSelection.length === 0) {
                    this.$router.push({
                        name: 'inspiration-images-category-categoryId',
                        params: {
                            categoryId: this.query.category
                        }
                    })

                    this.$nuxt.refresh()
                    return
                }

                // only one color chosen
                if (!this.category && this.colorsSelection.length === 1) {
                    this.$router.push({
                        name: 'inspiration-images-color-colorId',
                        params: {
                            colorId: colors.find(color => color.id === this.colorsSelection[0]).name
                        }
                    })

                    this.$nuxt.refresh()
                    return
                }

            }

            this.$router.push({
                name: 'inspiration-images-search_results',
                query: this.query
            })

            this.$nuxt.refresh()
        }
    }
}
</script>

<style lang="scss" scoped>


.select-drop-down {
    z-index: 10;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    border: none;
    margin-top: 1rem;
            
    @include medium-and-large-screens {
        flex-direction: row;
        border: 1px solid #d6d6d4;
        border-top: 0;
        border-bottom: 0;
        padding: 0 1rem;
        flex: 0 1 16rem;
        min-width: 10rem;
        margin: 0;
    }
}

#gallery-filters-form {
    .gallery-filters-form__body {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border-bottom: 1px solid $color-grey;

        @include medium-and-large-screens {
            flex-direction: row;
            align-items: center;
            padding: 0.7rem 0;
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

        .search {
            display: flex;
            flex-direction: column;
            flex: 1 1 100%;
            border: none;
            margin-top: 1rem;

            @include medium-and-large-screens {
                //margin-top: 0;
                flex: 1 1 25%;
                flex-direction: row;
                align-items: center;
                margin-top: 0.6rem;
                width: 100%;
            }

            @include small-and-medium-screens {
                margin-top: 30px;
            }
        }
    }
}

.search-field {
    @include medium-and-large-screens {
        margin: 0 1rem;
        min-width: 6rem;
    }
}

</style>
