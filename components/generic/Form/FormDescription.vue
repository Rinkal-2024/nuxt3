<template>
    <div class="description">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "FormDescription"
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.description {
    @include apply-font-and-size("paragraph", 3);
    font-size: 0.8rem;
    font-style: normal;
    font-weight: normal;
    margin: 1rem 0 0 0;
    text-align: left;
    ul,
    ol {
        padding-left: 1rem;
    }

    p,
    li,
    ul,
    ol {
        margin: 0.5rem 0 0 0;
    }

}
</style>
