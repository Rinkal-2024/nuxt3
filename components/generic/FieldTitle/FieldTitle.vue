<template>
    <div class="field-title">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FieldTitle'
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.field-title {
    @include apply-font-and-size("label", 10);
    margin: 1rem 0 1rem 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 100;
    flex: 1 1 100%;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
}

</style>
