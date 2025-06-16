<template>
    <FormField
        class="radio-button-field"
        :class="`appearance-${appearance}`"
        :name="name"
        :forName="id"
        :label="label"
        :linkTo="linkTo"
        :with-field-error="withFieldError"
        :has-error="hasError"
    >
        <RadioButton
            :radioClass="radioClass"
            :name="name"
            :id="id"
            :disabled="disabled"
            :elValue="elValue"
            v-model="scopedValue"
        />
    </FormField>
</template>

<script>
export default {
    name: 'RadioButtonField',
    data: () => ({
        scopedValue: null
    }),
    watch: {
        value: {
            immediate: true,
            handler() {
                if (this.scopedValue !== this.value) {
                    this.scopedValue = this.value
                }
            }
        },
        scopedValue(value) {
            this.$emit('input', value)
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String|Boolean,
            default: false
        },
        id: {
            type: String
        },
        elValue: {
            type: String|null,
            default: null
        },
        value: {
            type: String|null,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        linkTo: {
            type: String|Boolean,
            default: false
        },
        withFieldError: {
            type: Boolean,
            default: false
        },
        hasError: {
            type: Boolean,
            default: false
        },
        appearance: {
            type: String,
            default: 'default'
        },
        radioClass: {
            type: String,
            default: 'radbut'
        }
    },
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.radio-button-field.appearance-form{
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

.radio-button-field.appearance-default {
    ::v-deep.field-component{
        width: min-content;
    }
}

.radio-button-field {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 100%;

    ::v-deep .radio-button-field-label + input[type="radio"] {
        margin-top: 0;
        box-shadow: none;
    }
}

</style>
