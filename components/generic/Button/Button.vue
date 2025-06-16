<template>
    <button
        class="button"
        :class="variant"
        :type="type"
        @click="$emit('click')"
        :aria-label="name"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            required: false,
            default: 'button',
            validator: value => {
                return [
                    'button',
                    'submit'
                ].includes(value)
            }
        },
        variant: {
            type: String,
            required: false,
            default: 'primary',
            validator: value => {
                return [
                    'primary',
                    'outline',
                    'secondary',
                    'transparent',
                    'invisible'
                ].includes(value)
            }
        },
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/styles/partials.scss";

.button {
    @include button;
}

.outline {
    @include button-outline;
}

.secondary {
    @include button-secondary;
}

.invisible {
    @include button-invisible;
}

.transparent {
    background-color: transparent;
    border: transparent;
}

</style>
