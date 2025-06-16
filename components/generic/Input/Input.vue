<template>
    <input
        class="input"
        :class="{'with-error': hasError}"
        :type="type"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        :value="value"
        :disabled="disabled"
        @input="emitInput"
        @blur="emitBlur"
        v-model="innerValue"
    >
</template>

<script>
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            required: false,
            default: 'text',
            validator: value => {
                return [
                    'text',
                    'password',
                    'url',
                    'tel',
                    'email',
                    'search'
                ].includes(value)
            }
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        id: {
            type: String
        },
        name: {
            type: String
        },
        value: {
            type: String,
            default: () => ''
        },
        hasError: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        innerValue: null
    }),
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.innerValue = value
            }
        }
    },
    methods: {
        emitInput() {
            this.$emit('input', this.innerValue)
        },
        emitBlur() {
            this.$emit('blur')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.input {
    @include apply-font-and-size("label", 4);
    @include medium-and-large-screens {
        @include apply-font-and-size("label", 6);
    }
    font-weight: 100;
    border: $input-border-size solid $input-border-color;
    border-radius: $input-border-radius;
    background-color: $color-white;
    color: $input-text-color;
    padding: 0 0.8rem;
    height: calc(2.5rem - #{($input-border-size * 2)});
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
    letter-spacing: 0.1rem;

    &.with-error {
        border: solid 1px $error-border-color;
    }

    &[disabled] {
        opacity: $disabled-element-opacity;
    }

    &::placeholder {
        color: $input-placeholder-text-color;
        text-transform: uppercase;
    }
}
</style>
