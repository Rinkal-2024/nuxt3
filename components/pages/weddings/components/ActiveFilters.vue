<template>
    <div v-show="activeFilters.length > 0" class="activeFilters">
        <div v-for="filter in activeFilters" class="filter">
            <Button v-if="filter" @click="handleRemoveFilter(filter)" class="button">
                <Icon class="icon" name="close" :width="12" />
                <Label class="label">{{ filter.label }}</Label>
            </Button>
        </div>
    </div>
</template>

<script>
import { FILTERS } from '~/constants/weddingsFilters'

const getFilter = str => {
    const filterObj = FILTERS[str]
    if(filterObj) {
        return filterObj
    }
    return str
}

export default {
    name: 'ActiveFilters',
    computed: {
        activeFilters() {
            const query = this.$route.query
            let activeFilters = []

            for (const sectionQueryKey in query) {
                // console.log('QUERY');
                // console.log(query);
                // console.log('SECTION QUERY KEY');
                // console.log(sectionQueryKey);

                if (typeof query[sectionQueryKey] === 'string') {
                    activeFilters = [...activeFilters, getFilter(query[sectionQueryKey])]
                    continue
                }

                for (const filter of query[sectionQueryKey]) {
                    activeFilters = [...activeFilters, getFilter(filter)]
                }
            }

            return activeFilters
        }
    },
    methods: {
        handleRemoveFilter(filter) {
            let query = this.$route.query

            // console.log('REMOVING');
            // console.log(filter);

            if (typeof query[filter.sectionQueryKey] === 'string') {
                delete query[filter.sectionQueryKey]
                query = { ...query }
            } else {
                query[filter.sectionQueryKey].splice(
                    query[filter.sectionQueryKey].findIndex(x => x === filter.queryKey),
                    1
                )
            }
            // console.log('NEW QUERY:');
            // console.log(query);

            this.$router.push({
                name: this.$route.name,
                query
            })
            // this.$nextTick(() => {
            //     this.$nuxt.refresh()
            // })
            setTimeout(() => {
                this.$nuxt.refresh()
            }, 0)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.activeFilters {
    display: flex;
    z-index: 0;
    border-bottom: 1px solid $color-grey;
    padding: 0.5rem 0;
    flex-wrap: wrap;

    ::v-deep {
        .filter {
            display: flex;
            align-items: center;
            margin: 0.5rem 1rem 0.5rem 0;
        }

        .button {
            @include button-as-normal-text;
            padding: 0.2rem 0.2rem 0.2rem 1rem;
            margin-right: 0.2rem;
            position: relative;
            line-height: 0;
            font-size: 0;
        }

        .icon {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }

        .label {
            display: inline;
            margin: 0;
            color: $color-black;
            text-decoration: underline;
            @include apply-font-and-size("label", 13);
            font-weight: bold;
            line-height: 1rem;
        }
    }
}


</style>
