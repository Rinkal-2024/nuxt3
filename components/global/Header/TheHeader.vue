<template>
  <header
    class="website-header"
    :class="{
      '--desktop__scroll-up': showFixedDesktopHeader,
      '--desktop__fixed': enableFixedDesktopHeader,
      '--news-page': isNewsListPage
    }"
  >
    <TheHeaderMobile />
    <TheHeaderDesktop class="header--desktop" />
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isNewsListPage as checkIsNewsListPage } from '~/utils/header'
import { useConfigStore } from '~/store/global/config'
import TheHeaderMobile from './Mobile/TheHeaderMobile.vue'
import TheHeaderDesktop from './Desktop/TheHeaderDesktop.vue'

const config = useConfigStore()
const route = useRoute()

const isMobile = computed(() => config.isMobile)
const currentOffsetTop = computed(() => config.currentOffsetTop)
const isScrollingUp = computed(() => config.isScrollingUp)

const isDesktop = computed(() => !isMobile.value)

const enableFixedDesktopHeader = computed(() => {
  return isDesktop.value && currentOffsetTop.value > 165
})

const showFixedDesktopHeader = computed(() => {
  return enableFixedDesktopHeader.value && isScrollingUp.value
})

const isNewsListPage = computed(() => checkIsNewsListPage(route))
</script>

<style scoped lang="scss">

$desktopHeaderHeight: 165px;
$newsDesktopHeaderHeight: 222px;

.website-header {
  width: 100%;
  height: $desktopHeaderHeight;
  z-index: 999;
  background-color: #fff;
  position: fixed;
  top: 0;

  @include small-and-medium-screens {
    position: fixed;
    height: 3rem;
    z-index: 101;
    background-color: #fff;
    top: 0;

    .header--desktop {
      display: none;
    }
  }
}

.website-header.--news-page {
  height: $newsDesktopHeaderHeight;

  @include small-and-medium-screens {
    height: 3rem;
  }
}
</style>
