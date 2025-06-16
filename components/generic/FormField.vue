<template>
    <div
        :data-anchor-name="name"
        class="label"
        :class="{ 'full-width': fullWidth, 'with-field-error': withFieldError, 'appearance-form': appearance==='form' }"
    >

        <Link v-if="linkTo && label" :to="linkTo" withoutStyles>
            <label
                v-if="label"
                :for="forName"
                class="label-text label-text-link"
            >
                {{ label }}
            </label>
        </Link>

        <label
            v-if="!linkTo && label"
            :for="forName"
            class="label-text"
            v-html="label"
        />


        <div class="field-component">
            <slot />
        </div>

        <FormFieldErrorMessage :error-message="errorMessage" :has-error="hasError" v-if="withFieldError" />

    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String|Boolean,
            default: false
        },
        forName: {
            type: String|Boolean,
            default: false
        },
        linkTo: {
            type: String|Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
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
        appearance: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.label {
    display: flex;
    flex-direction: column;
    justify-items: center;

    &.full-width {
        flex-basis: 100%;
    }

    .field-component {
        margin-top: -15px;
    }

    .label-text {
        margin-left: 20px;
    }

    &.with-field-error{
        .field-component{
            margin-top: 0;
        }
    }
    &.appearance-form{
        .label-text{
            @include apply-font-and-size("label", 6);
        }
    }
}

.label {
    max-width: 100%;
    flex-grow: 0;
    flex-basis: 100%;

    @include medium-and-large-screens {
        flex-basis: calc(50% - 0.45rem);
        &.fullWidthField {
            flex-basis: 100%;
        }
    }
}

.form-field-error-message {
    flex: 0 1 auto;
}

.label-text {
    flex: 1 1;
    @include apply-font-and-size("label", 6);
    font-size: 0.45rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: 100;
    color: $primary-text-color;

    .label.disabled & {
        opacity: $disabled-element-opacity;
    }

    & + .field-component {
        margin-top: 0.6rem;
    }
    cursor: pointer;
}

.field-component {
    flex: 1 1 100%;
    max-width: 100%;
}

.disabled {
    cursor: not-allowed;
}

.label-text {
    margin-left: 20px !important;
}


</style>
