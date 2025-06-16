<template>
    <div
        class="label"
        :class="{
            'full-width': fullWidth,
            'disabled': disabled
        }"
    >
        <label
            v-if="label"
            class="label-text"
        >
            {{ label }}
        </label>
        <AutocompleteSelect
            :disabled="disabled"
            :options="options"
            :name="name"
            :placeholder="placeholder"
            :value="value"
            :reduceValue="reduceValue"
            :has-error="hasError"
            :is-clearable="isClearable"
            :transparent="transparent"
            @change="onChange"
        />
        <FormFieldErrorMessage
            v-if="withFieldError"
            name="name"
            :has-error="hasError"
            :error-message="errorMessage"
        />
    </div>
</template>

<script>
export default {
    name: 'AutocompleteSelectField',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        fullWidth: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        withFieldError: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            required: true
        },
        value: {
            type: [Number, String, Object, null],
            required: true
        },
        reduceValue: {
            type: Boolean,
            default: false
        },
        hasError: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: 'This field is required.'
        },
        isClearable: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onChange(event) {
            this.$emit('change', event)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.label {
    max-width: 100%;
    flex-grow: 0;
    flex-basis: 100%;

    @include medium-and-large-screens {
        flex-basis: calc(50% - 0.45rem);
        &.full-width {
            flex-basis: 100%;
        }
    }

    ::v-deep {
        .vs__dropdown-toggle {
            border: none;
        }
    }
}

.form-field-error-message {
    flex: 0 1 auto;
}

.label-text {
    flex: 1 1;
    @include apply-font-and-size("label", 6);
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: 100;
    color: $primary-text-color;

    .label.disabled & {
        opacity: $disabled-element-opacity;
    }

    & + .fieldComponent {
        margin-top: 0.6rem;
    }
}

.field-component {
    flex: 1 1 100%;
    max-width: 100%;
}

.disabled {
    cursor: not-allowed;
}

</style>
