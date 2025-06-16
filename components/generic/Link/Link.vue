<template>
    <NuxtLink
        :class="{ 'without-styles': withoutStyles, 'with-styles': !withoutStyles }"
        :to="linkTo"
        @click="onClick"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script>
export default {
    name: 'Link',
    props: {
        to: {
            type: String | Object,
            required: true
        },
        withoutStyles: {
            type: Boolean,
            default: false
        },
        forceRefresh: {
            type: Boolean,
            default: false
        },
        forceNoAmp: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        linkTo() {
            if (typeof this.to === 'object') {
                const path = this.$router.resolve(this.to).href
                return (this.$isAMP && !this.forceNoAmp) ? `/amp${path}` : path
            }
            let path = this.to.endsWith('/') ? this.to : `${this.to}/`
            path = path.startsWith('/') ? path : `/${path}` // ensure correct url
            return (this.$isAMP && !this.forceNoAmp) ? `/amp${path}` : path
        }
    },
    methods: {
        onClick() {
            if (this.forceRefresh) {
                setTimeout(this.$nuxt.refresh, 0)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
