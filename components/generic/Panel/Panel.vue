<template>
    <div class="panel hidden">
        <PageLayoutMargin>
            <slot />
        </PageLayoutMargin>
    </div>
</template>

<script>
export default {
    name: 'Panel',
    props: {
        isToggled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.panel {
    position: absolute;
    width: 100%;
    left: 0;
    top: 260px;
    padding-bottom: 1rem;
    background-color: $color-white;
    z-index: 2;
    // left: 0;
    // margin-left: -107px;
    box-shadow: 0 4px 15px -13px $box-shadow-color;
}

</style>
