<template>
    <FormField
        :name="name"
        :forName="id"
        :fullWidth="fullWidth"
        :withFieldError="withFieldError"
        :error-message="errorMessage"
        :has-error="hasError"
    >
        <Input
            :type="type"
            :required="required"
            :placeholder="placeholder"
            :id="id"
            :name="name"
            v-model="model"
            :has-error="hasError"
            :disabled="disabled"
            @input="$emit('input', model)"
            @blur="$emit('blur')"
        />
    </FormField>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        withFieldError: {
            type: Boolean,
            default: true
        },
        hasError: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: 'This field is required.'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
             type: String,
            default: 'search'
        },
        required: {
             type: Boolean,
             default: false
        }
    },
    mounted() {
        this.model = this.value
    },
    watch: {
        value(value) {
            this.model = value
        }
    },
    data: () => ({
        model: null
    })
}
</script>

<style scoped>

</style>
