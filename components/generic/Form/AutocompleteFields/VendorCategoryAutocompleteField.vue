<template>
    <AutocompleteSelectField
        :options="vendorCategories"
        :label="label"
        :name="name"
        :placeholder="placeholder"
        :full-width="fullWidth"
        :disabled="disabled"
        :value="value"
        @change="onChange"
    />
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "VendorCategoryAutocompleteField",
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: 'Vendor'
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Object, null],
            required: true
        }
    },
    computed: {
        ...mapGetters('api/advertise', ['vendorCategories'])
    },

    methods: {
        onChange(event) {
            this.$emit('change', event)
        }
    }
}
</script>

<style scoped>

</style>
