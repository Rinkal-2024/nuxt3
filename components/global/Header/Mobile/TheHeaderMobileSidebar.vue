<template>
    <div class="sidebar" id="menu-sidebar-drawer">
        <Button
            @click="openDrawer"
            variant="transparent"
            class="sidebar__toggle"
            ref="toggle"
        >
            <Icon name="hamburger" class="toggle__icon"></Icon>
        </Button>
        <TheHeaderMobileSidebarDrawer
            :open="isDrawerOpen"
            ref="drawer"
        />
        <TheHeaderMobileSidebarBackgroundDimmer :visible="isDrawerOpen" />
    </div>
</template>

<script>
export default {
    name: 'TheHeaderMobileSidebar',
    mounted () {
        this.registerDrawerEvents()
    },
    data: () => ({
        isDrawerOpen: false
    }),
    watch: {
        $route() {
            this.isDrawerOpen = false
        }
    },
    methods: {
        openDrawer() {
            this.isDrawerOpen = true
        },
        closeDrawerIfOpened() {
            this.isDrawerOpen = this.isDrawerOpen ? false : this.isDrawerOpen
        },
        stopEventPropagation(event) {
            event.stopPropagation()
        },
        registerDrawerEvents() {
            this.$refs.drawer.$el.addEventListener('click', this.stopEventPropagation)
            this.$refs.toggle.$el.addEventListener('click', this.stopEventPropagation)
            window.addEventListener('click', this.closeDrawerIfOpened)
        },
        unregisterDrawerEvents() {
            this.$refs.drawer.$el.removeEventListener('click', this.stopEventPropagation)
            this.$refs.toggle.$el.removeEventListener('click', this.stopEventPropagation)
            window.removeEventListener('click', this.closeDrawerIfOpened)
        },
        beforeDestroy() {
            this.unregisterDrawerEvents()
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.sidebar {
    display: flex;
}

.sidebar__toggle {
    @include button-as-normal-text;
    padding: 0 !important;
}

.toggle__icon {
    display: flex;
    justify-content: flex-end;
}

</style>
