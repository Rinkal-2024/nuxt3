<template>
    <div class="fields-description">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "FieldsDescription"
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.fields-description {
    @include apply-font-and-size("paragraph", 4);
    font-size: 0.8rem;
    font-style: normal;
    font-weight: normal;
    margin: 0 0 1rem 0;
    text-align: left;
}
</style>
