<template>
    <FormField :name="name"
               :forName="name"
               :label="label"
               :linkTo="linkTo"
               class="form-field"
               :class="`appearance-${appearance}`"
               :has-error="hasError"
               :with-field-error="withFieldError"
               :appearance="appearance"
    >
        <input
            type="checkbox"
            :class="[{'with-error': hasError}, checkBoxClass]"
            :id="name"
            :required="required"
            :name="name"
            :disabled="disabled"
            class="checkbox input"
            v-model="isChecked"
        >
    </FormField>
</template>

<script>

export default {
    name: 'CheckboxField',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String | Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        linkTo: {
            type: String | Boolean,
            default: false
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        withFieldError: {
            type: Boolean,
            default: false
        },
        appearance: {
            type: String,
            default: 'default'
        },
        checkBoxClass: {
             type: String,
             default: 'chbox'
        },
         required: {
             type: Boolean,
             default: false
        }
    },
    mounted() {
        this.isChecked = this.value
    },
    watch: {
        isChecked(value) {
            this.$emit('input', value)
        },
        value(value) {
            this.isChecked = value
        }
    },
    data: () => ({
        isChecked: false
    })
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.form-field.appearance-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 100%;
    margin-bottom: 1rem;
    @include apply-font-and-size('label', 6);
    .label{
        margin-top: 0;
        box-shadow: none;
    }
    ::v-deep.field-component{
        flex: unset;
        margin-top: 0.2rem;
    }
}

.form-field.appearance-default {
    ::v-deep.field-component{
        width: min-content;
    }
}

.checkbox {
    &[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        flex: 0 0 auto;
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 0.5rem 0 0;
        border: $border-width solid $input-border-color;
        box-shadow: inset 0 0 0.1rem $color-darker-white,
        0 0 0.1rem $color-darker-white;
        background-color: $color-white;
        cursor: pointer;
        background-image: url("~assets/icons/tick.svg");

        &:checked {
            border-color: $color-black;
            background-color: $color-black;
            background-size: 0.6rem 0.6rem;
            background-position: center;
            background-repeat: no-repeat;
        }

        &.with-error {
            border: solid $border-width $color-red;
        }

        &[disabled] {
            opacity: $disabled-element-opacity;
        }
    }
}

</style>
