<template>
    <div class="item-container">
        <Label class="label">{{ label }}</Label>
        <div class="item-node">
           <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeddingDataItem',
    props: {
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.item-container {
    display: flex;
    flex-direction: column;
    & + & {
        margin-top: 0.5rem;
    }
}

.item-node {
    color: $color-black;
    @include apply-font-and-size("label", 5);
    font-weight: 100;
    letter-spacing: 0.05rem;
    padding: 0.25rem 0;
}

.label {
    margin-top: 0;
}

</style>
