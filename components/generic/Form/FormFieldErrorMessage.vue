<template>
    <div class="form-field-error-message">
        <span class="input-error-msg" :class="{ 'hidden': !hasError }">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script>
export default {
    name: "FormFieldErrorMessage",
    props: {
        hasError: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.form-field-error-message {
    @include apply-font-and-size("label", 7);
    font-weight: 100;
    margin: 0;
    min-height: 1.75rem;
    width: 100%;
    color: $error-text-color;
}
</style>
