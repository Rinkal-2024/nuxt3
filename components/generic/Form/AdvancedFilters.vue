<template>
    <div
        ref="filters"
        class="advanced-filters"
    >
        <div class="advanced-filters__button-wrapper">
            <ToggleButton
                id="advanced-filters-button"
                :isToggled="areFiltersToggled"
                @click="toggleFilters"
            >
                Advanced filters
            </ToggleButton>
        </div>

        <Panel
            id="advanced-filters-panel"
            :isToggled="areFiltersToggled"
        >
            <div class="filters" >
                <div
                    v-for="section in sections"
                    :key="section.label"
                    class="filter-section"
                >
                    <div class="section-name">
                        {{ section.label }}
                    </div>

                    <div
                        v-for="filter in section.filters"
                        :key="FILTERS[filter].queryKey"
                        class="filter"
                    >
                        <CheckboxField
                            checkBoxClass="advanced-filters-checkbox"
                            :name="`${section.index}.${FILTERS[filter].queryKey}`"
                            :label="FILTERS[filter].label"
                            :linkTo="{ name: 'weddings-search-category-categoryType-categoryId', params: {
                        categoryType: FILTERS[filter].sectionQueryKey,
                        categoryId: FILTERS[filter].queryKey
                    }}"
                            v-model="selection[FILTERS[filter].sectionQueryKey][FILTERS[filter].queryKey]"
                        />
                    </div>

                </div>

                <Button
                    id="advanced-filters-clear-all"
                    @click="clearModel"
                    class="clear-all-button"
                >
                    Clear all
                </Button>
            </div>
        </Panel>
    </div>
</template>

<script>
import { FILTERS, SECTION_LABELS } from '~/constants/weddingsFilters'
import { registerOutsideClickHandler } from '~/utils/dom'
import { forEachInObject } from '~/utils/object'

// Todo: optimize advanced filters logic
export default {
    name: 'AdvancedFilters',
    created () {
        this.prepareModel()
    },
    mounted() {
        registerOutsideClickHandler(
            this.$refs.filters,
            () => this.areFiltersToggled = false
        )
        this.restoreModelFromQuery()
    },
    data: () => ({
        areFiltersToggled: false,
        sections: Object.keys(SECTION_LABELS).map(index => ({
            index,
            label: SECTION_LABELS[index],
            filters: Object.keys(FILTERS).filter(filter => FILTERS[filter].sectionQueryKey === index)
        })),
        FILTERS,
        selection: {}
    }),
    watch: {
        selection: {
            deep: true,
            handler() {
                this.$emit('selectionChanged', this.selection)
            }
        },
        $route() {
            this.restoreModelFromQuery()
        }
    },
    methods: {
        toggleFilters() {
            this.areFiltersToggled = !this.areFiltersToggled
        },
        prepareModel() {
            const FILTERS = this.FILTERS
            for (const section of this.sections) {
                for (const filter of section.filters) {
                    this.$set(
                        this.selection,
                        FILTERS[filter].sectionQueryKey,
                        {...this.selection[FILTERS[filter].sectionQueryKey] ?? {}}
                    )
                    this.$set(
                        this.selection[FILTERS[filter].sectionQueryKey],
                        FILTERS[filter].queryKey,
                        false
                    )
                }
            }
        },
        clearModel() {
            forEachInObject(
                this.selection,
                () => false,
                true
            )
        },
        restoreModelFromQuery() {
            const rawQuery = this.$route.query
            let params = []

            for (const param in rawQuery) {
                if (['colors', 'venue', 'business', 'couple', 'location'].includes(param)) {
                    continue
                }

                params = [...params, rawQuery[param]]
            }

            forEachInObject(
                this.selection,
                (value, key) => {
                    return params
                        .flat()
                        .includes(key)
                },
                true
            )
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.advanced-filters {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    border-right: $input-border-size solid $input-border-color;

    .advanced-filters__button-wrapper {
        padding-right: 1rem;
        display: flex;
    }
}

.advanced-filters {

    .filters {
        display: flex;
        justify-content: space-between;

        .button-wrapper {
            position: relative;
            padding-right: 1rem;

            &:after {
                content: "";
                width: $input-border-size;
                right: 0;
                height: 2rem;
                top: 50%;
                transform: translateY(-50%);
                position: absolute;
                background-color: $color-grey;
                outline: none;
            }
        }

        .panel {
            position: absolute;
            top: calc(100% + 1px);
            padding-bottom: 1rem;
            background-color: $color-white;
            z-index: 1;
            width: 100%;
            left: 0;
            box-shadow: 0 4px 15px -13px $box-shadow-color;
        }

        .filter-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        .section-name {
            margin: 1rem 0 0.5rem 0;
            width: 100%;
            @include apply-font-and-size("label", 13);
            letter-spacing: 0.1rem;
            text-transform: uppercase;
            font-weight: 100;
        }

        .filter {
            width: 100%;
            margin-top: 0.5rem;

            ::v-deep .checkbox {
                height: 0.65rem;
                width: 0.65rem;

                &:checked {
                    background-size: 0.4rem;
                }
            }
        }

        ::v-deep .label {
            @include apply-font-and-size("label", 13);
            font-weight: bold;
            letter-spacing: 0.05rem;
        }

        .error-message {
            min-height: 0;
        }

        .clear-all-button {
            @include button-as-normal-text;
            @include apply-font-and-size("label", 13);
            text-transform: uppercase;
            letter-spacing: 0.1rem;
            color: $color-darker-grey;
            align-self: flex-start;
            margin-top: 1rem;
        }
    }
}

</style>
