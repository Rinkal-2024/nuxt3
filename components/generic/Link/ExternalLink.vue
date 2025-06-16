<template>
    <a
        :class="{ 'without-styles': withoutStyles, 'with-styles': !withoutStyles }"
        :href="to"
        rel="noopener"
        target="_blank"
    >
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'ExternalLink',
    props: {
        to: {
            type: String | Object,
            required: true
        },
        withoutStyles: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.without-styles {
    text-decoration: none;
    color: $color-black;

    &:hover {
        text-decoration: underline;
    }
}

.with-styles {
    font-weight: 100;
    color: $color-black;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}

</style>
