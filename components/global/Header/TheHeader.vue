<template>
  <header
    class="website-header"
    :class="{
      '--desktop__scroll-up': showFixedDesktopHeader,
      '--desktop__fixed': enableFixedDesktopHeader,
      '--news-page': isNewsListPage
    }"
  >
    <!-- <TheHeaderMobile /> -->
    <TheHeaderDesktop class="header--desktop" />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '~/store/config'
import { isNewsListPage as checkNewsPage } from '~/utils/header'
// import TheHeaderMobile from './Mobile/TheHeaderMobile.vue'
import TheHeaderDesktop from './Desktop/TheHeaderDesktop.vue'

const route = useRoute()
const config = useConfigStore()

const isMobile = computed(() => config.isMobile)
const currentOffsetTop = computed(() => config.currentOffsetTop)
const isScrollingUp = computed(() => config.isScrollingUp)

const isDesktop = computed(() => !isMobile.value)
const enableFixedDesktopHeader = computed(() => isDesktop.value && currentOffsetTop.value > 165)
const showFixedDesktopHeader = computed(() => enableFixedDesktopHeader.value && isScrollingUp.value)
const isNewsListPage = computed(() => checkNewsPage(route))
</script>

<style scoped lang="scss">
/* Your styles here */
</style>
