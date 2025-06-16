<template>
    <FormField :name="name" :label="label" :full-width="fullWidth" with-field-error :has-error="hasError">
        <Textarea
            :aria-label="ariaText"
            :name="name"
            :id="id"
            :required="required"
            :disabled="disabled"
            :has-error="hasError"
            :value="value"
            @change="onChange"
            @blur="onBlur"
            :placeholder="placeholder"
        />
    </FormField>
</template>

<script>
export default {
    name: "TextareaField",
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hasError: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
             type: Boolean,
             default: false
        },
        ariaText: {
            type: String,
            default: ''
        }
    },
    methods: {
        onChange(evt) {
            this.$emit('change', evt)
        },
        onBlur(evt) {
            this.$emit('blur', evt)
        }
    }
}
</script>

<style scoped>

</style>
