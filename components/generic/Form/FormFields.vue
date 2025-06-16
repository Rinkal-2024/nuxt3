<template>
    <div class="form-fields">
        <slot />
    </div>
</template>

<script>
export default {
    name: "FormFields"
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.form-fields {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 1rem;
    justify-content: space-between;
}
</style>
