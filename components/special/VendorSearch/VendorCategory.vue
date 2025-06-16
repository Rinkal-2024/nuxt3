<template>
    <div class="vendor-category">
        <div class="field-title">Category:</div>
        <AutocompleteSelect
            :options="categories"
            name="vendorCategorySlug"
            placeholder="Enter Vendor Type"
            v-model="selectedCategory"
        />
    </div>
</template>

<script>
export default {
    name: 'VendorCategory',
    props: {
        categories: {
            type: Array,
            default: () => []
        }
    },
    mounted () {
        const defaultCategory = this.$route.query?.vendorCategorySlug || this.$route.params?.categorySlug

        if (defaultCategory) {
            this.selectedCategory = [...this.categories].find(c => c.value === defaultCategory)
        }
    },
    data: () => ({
        selectedCategory: ''
    }),
    watch: {
        selectedCategory(category) {
            this.$emit('select', category)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.vendor-category {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 33.333%;

    ::v-deep {
        .autocomplete-select {
            width: 100%;
        }
    }
}

.field-title {
    display: flex;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 0.6rem;
    font-style: normal;
    font-weight: 100;
    flex: 1 1 100%;
    text-transform: uppercase;
    letter-spacing: 0.05rem;

    @include apply-font-and-size("label", 6);
    @include medium-and-large-screens {
        @include apply-font-and-size("label", 13);
    }

    font-size: 0.6rem !important;
}

.input {
    background-color: transparent;
}

.errorMessage {
    min-height: 0;
}

</style>
