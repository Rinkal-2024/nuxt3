<template>
    <div>
        <Button
            id="wedding-resources-btn"
            class="button"
            on="tap:sidebar-resources.open"
            variant="secondary"
            @click="isOpen = !isOpen"
        >
            Resources
        </Button>
        <Drawer v-if="!$isAMP" id="wedding-resources-drawer" :open="isOpen" @close="isOpen = false">
            <WeddingResources/>
        </Drawer>
        <amp-sidebar v-else id="sidebar-resources" layout="nodisplay" side="left">
            <div class="drawer__inner-container">
                <WeddingResources/>
            </div>
        </amp-sidebar>
    </div>
</template>

<script>
export default {
    name: 'WeddingArticleResourcesMobile',
    data: () => ({
        isOpen: false
    })
}
</script>

<style scoped>

</style>
