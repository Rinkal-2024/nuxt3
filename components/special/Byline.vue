<template>
    <div class="byline">
        <span>By <slot /></span>
    </div>
</template>

<script>
export default {
    name: 'Byline'
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.byline {
    display: flex;
    align-items: center;
    @include apply-font-and-size("label-decorative", 5);
    @include small-and-medium-screens {
        @include apply-font-and-size("label-decorative", 4);
        justify-content: center;
    }
    font-style: italic;
    text-transform: none;
}

</style>
