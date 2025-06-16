<template>
    <Button
        class="button"
        :class="{'with-error': isDisabled}"
        @click="onClick"
    >
        <LoadingIndicator v-if="isLoading"/>
        <slot v-else>Submit</slot>
    </Button>
</template>

<script>
export default {
    name: "FormSubmitButton",
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isDisabled () {
            return this.errors.length > 0 || this.isLoading
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";
.loading-indicator {
    margin: 0 auto;
    width: 1rem;
    height: 1rem;
}

.button {
    min-width: 105px;
    &:hover {
        background-color: $color-black;
        color: $color-white;
    }

    .with-error {
        &[disabled],
        &[disabled]:hover {
            background-color: $color-red;
            color: $color-white;
            opacity: 0.75;
            text-decoration: none;
            border-color: $color-red;
        }
    }
}

</style>
