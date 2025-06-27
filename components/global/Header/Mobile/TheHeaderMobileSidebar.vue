<template>
  <div class="sidebar" id="menu-sidebar-drawer">
    <Button
      @click="openDrawer"
      variant="transparent"
      class="sidebar__toggle"
      ref="toggle"
    >
      <Icon name="hamburger" class="toggle__icon" />
    </Button>
    <TheHeaderMobileSidebarDrawer :open="isDrawerOpen" ref="drawer" />
    <TheHeaderMobileSidebarBackgroundDimmer :visible="isDrawerOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheHeaderMobileSidebarDrawer from './TheHeaderMobileSidebarDrawer.vue'
import TheHeaderMobileSidebarBackgroundDimmer from './TheHeaderMobileSidebarBackgroundDimmer.vue'
import Icon from '~/components/generic/Icon/Icon.vue'
import Button from '~/components/generic/Button/Button.vue'

const isDrawerOpen = ref(false)
const drawer = ref(null)
const toggle = ref(null)
const route = useRoute()

function openDrawer() {
  isDrawerOpen.value = true
}

function closeDrawerIfOpened() {
  if (isDrawerOpen.value) {
    isDrawerOpen.value = false
  }
}

function stopEventPropagation(event) {
  event.stopPropagation()
}
onMounted(() => {
  drawer.value?.el?.addEventListener('click', stopEventPropagation)
  toggle.value?.$el?.addEventListener('click', stopEventPropagation)
  window.addEventListener('click', closeDrawerIfOpened)
})

onBeforeUnmount(() => {
  drawer.value?.el?.removeEventListener('click', stopEventPropagation)
  toggle.value?.$el?.removeEventListener('click', stopEventPropagation)
  window.removeEventListener('click', closeDrawerIfOpened)
})


// onMounted(() => {
//   // Register event listeners once refs are ready
//   drawer.value?.$el.addEventListener('click', stopEventPropagation)
//   toggle.value?.$el.addEventListener('click', stopEventPropagation)
//   window.addEventListener('click', closeDrawerIfOpened)
// })

// onBeforeUnmount(() => {
//   drawer.value?.$el.removeEventListener('click', stopEventPropagation)
//   toggle.value?.$el.removeEventListener('click', stopEventPropagation)
//   window.removeEventListener('click', closeDrawerIfOpened)
// })

watch(route, () => {
  isDrawerOpen.value = false
})
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
