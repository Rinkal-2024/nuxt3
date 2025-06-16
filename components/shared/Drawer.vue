<template>
    <div>
        <div
            class="sidebar__drawer"
            :class="{ 'open': open, 'is-right': isRight }"
        >
            <div ref="innerContainer" class="drawer__inner-container">
                <slot />
            </div>
        </div>
        <div class="dimmer-container">
            <TheHeaderMobileSidebarBackgroundDimmer :visible="open" />
        </div>
    </div>

</template>

<script>
import { registerOutsideClickHandler } from '~/utils/dom'

export default {
    name: 'Drawer',
    props: {
        open: {
            type: Boolean,
            default: false
        },
        isRight: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        destroyOutsideClickHandler: null
    }),
    watch: {
        open(isOpen) {
            setTimeout(() => {
                isOpen ? this.setOutsideClickHandler() : this.destroyOutsideClickHandler()
            }, 200)
        }
    },
    methods: {
        setOutsideClickHandler() {
            this.destroyOutsideClickHandler = registerOutsideClickHandler(this.$refs.innerContainer, this.emitCloseEvent)
        },
        emitCloseEvent() {
            this.$emit('close')
        }
    },
    beforeDestroy () {
        typeof this.destroyOutsideClickHandler === 'function' && this.destroyOutsideClickHandler()
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.dimmer-container {
    ::v-deep {
        .dimmer.visible {
            z-index: 999;
        }
    }
}

.sidebar__drawer {
    z-index: 1000;
    background-color: $color-darker-white;

    box-sizing: content-box;
    position: fixed;
    display: block;
    width: 300px;
    max-width: 300px;
    height: 100%;
    top: 0;
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &.open.is-right {
        right: 0;
    }

    &.open:not(.is-right) {
        left: 0;
    }

    &:not(.is-right) {
        left: -330px;
        transition: left .4s;
    }

    &.is-right {
        right: -330px;
        transition: right .4s;
    }
}

.drawer__inner-container {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1rem 20px 1rem 0.75rem;
}

.sidebar__drawer .drawer__title {
    @include apply-font-and-size("heading", 3);
    text-transform: uppercase;
    font-weight: bold;
}

.drawer__title {
    padding-top: 1rem;
    display: block;
}

</style>
