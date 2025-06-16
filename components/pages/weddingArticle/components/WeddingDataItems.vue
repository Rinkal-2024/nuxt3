<template>
    <div
        class="data-items"
        :class="{ 'align-right': alignRight }"
    >
        <div class="title">{{ title }}</div>
        <Separator class="separator" />
        <div class="items">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeddingDataItems',
    props: {
        alignRight: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.data-items {
    display: flex;
    flex-direction: column;

    &.align-right {
        align-items: flex-end;
        text-align: right;
    }
}

.align-right .item-container {
    align-items: flex-end;
}

.title {
    @include apply-font-and-size("heading", 9);
}

.separator {
    width: 8rem;
    margin: 0.5rem 0 0.75rem 0 !important;
}

.items {
    display: flex;
    flex-direction: column;
}

</style>
