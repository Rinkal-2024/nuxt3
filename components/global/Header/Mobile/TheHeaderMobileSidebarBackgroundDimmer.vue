<template>
    <span
        class="dimmer"
        :class="{ 'visible': visible }"
    ></span>
</template>

<script>
export default {
    name: 'TheHeaderMobileSidebarBackgroundDimmer',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">

.dimmer {
    z-index: -100;
    position: fixed;
    height: 0;
    width: 0;
    background: rgba(0, 0, 0, 0);
    opacity: 1;
    top: 0;
    left: 0;
    margin: 0;
    transition: background 0.4s;

    &.visible {
        height: 100%;
        width: 100%;
        z-index: 3;
        background: rgba(0, 0, 0, 0.4);
    }
}

</style>
