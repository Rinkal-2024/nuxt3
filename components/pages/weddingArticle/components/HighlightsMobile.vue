<template>
    <div>
        <Button 
            id="wedding-highlights-btn"
            class="button"
            on="tap:sidebar-highlights.open"
            variant="secondary"
            @click="isOpen = !isOpen"
        >
            Highlights
        </Button>
        <Drawer
            id="wedding-highlights-drawer"
            v-if="!$isAMP"
            :open="isOpen"
            isRight
            @close="isOpen = false"
        >
            <WeddingHighlights/>
        </Drawer>
        <amp-sidebar v-else id="sidebar-highlights" layout="nodisplay" side="right">
            <div class="drawer__inner-container">
                <WeddingHighlights/>
            </div>
        </amp-sidebar>
    </div>
</template>

<script>
export default {
    name: 'HighlightsMobile',
    data: () => ({
        isOpen: false
    })
}
</script>

<style scoped>

</style>
