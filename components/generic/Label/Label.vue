<template>
    <span class="label base-label">
        <slot/>
    </span>
</template>

<script>
export default {
    name: 'Label'
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.label {
    @include apply-font-and-size("label", 5);
    display: flex;
    margin: 0.25rem 0 0 0;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: $color-darker-grey;
    font-weight: 100;

    @include medium-and-large-screens {
        @include apply-font-and-size("label", 13);
    }
}
</style>
