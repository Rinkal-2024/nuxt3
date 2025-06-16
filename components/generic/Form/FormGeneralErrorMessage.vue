<template>
    <div
        class="form-general-error-message"
        v-if="errorMessage"
    >
        {errorMessage}
    </div>
</template>

<script>
export default {
    name: "FormGeneralErrorMessage",
    props: {
        errorMessage: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.form-general-error-message {
    margin: 0.5rem 0 1.25rem;
    border: solid 1px $error-border-color;
    padding: 0.8rem 0.8rem;
    background-color: $error-background-color;
    color: $error-text-color;
    font-size: 0.8rem;
    text-align: center;
    width: 100%;
}
</style>
