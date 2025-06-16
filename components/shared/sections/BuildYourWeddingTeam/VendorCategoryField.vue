<template>
    <div class="vendor-category">
        <FieldTitle>Category:</FieldTitle>
        <AutocompleteSelect
            name="vendor-category"
            isClearable
            placeholder="ENTER VENDOR TYPE"
            :options="vendorsTypes"
            class="select"
            v-model="value"
        />
    </div>
</template>

<script>
export default {
    name: 'VendorCategoryField',
    data: () => ({
        value: null
    }),
    watch: {
        value(value) {
            return this.$emit('change', value)
        }
    },
    computed: {
        vendorsTypes() {
            return this.$store.getters['api/home/vendorTypes'].map(x => ({
                value: x.slug,
                label: x.name
            }))
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.select {
    flex: 1 1 100%;
    @include apply-font-and-size("label", 6);
    background-color: transparent;
    font-weight: 100;
    height: calc(2.5rem - #{($input-border-size * 2)});
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    ::v-deep {
        .vs__dropdown-toggle {
            background-color: transparent !important;
            height: 100% !important;
        }
        .vs__selected {
            margin: 0 !important;
            padding-left: 0.7rem;
        }
        .vs__selected-options {
            align-items: center;
        }
        .vs__search.vs__search {
            margin: 0 !important;
            padding-left: 0.7rem;
        }
    }

    input {
        @include apply-font-and-size("label", 7);
        letter-spacing: 0.1rem;
    }

    &.withError {
        border-color: $error-border-color;
    }

    &.disabled {
        opacity: $disabled-element-opacity;
        border-color: $input-border-disabled-color;
        box-shadow: none;
    }

    &.isMulti {
        min-height: calc(2.5rem - #{($input-border-size * 2)});
        height: auto;
    }
}

.vendor-category {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 33.333%;

    @include small-and-medium-screens {
        width: 100%;
    }

    ::v-deep .field-title {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0.6rem;
        @include apply-font-and-size("label", 5);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 7);
        }
    }

    ::v-deep .input {
        background-color: transparent;
    }

    ::v-deep .error-message {
        min-height: 0;
    }
}

</style>
