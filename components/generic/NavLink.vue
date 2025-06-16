<template>
    <a :href="to" class="link" :class="{navLink: withStyles}">
<!--        TODO: Replace with actual routing link -->
        <slot/>
    </a>
</template>

<script>
export default {
    name: "NavLink",
    props: {
        to: {
            type: String,
            required: true
        },
        withStyles: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.link {
    color: $color-black;
    font-weight: 100;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}

.nav-link {
    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}</style>
