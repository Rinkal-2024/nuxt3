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

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '~/store/config'
import { isNewsListPage as checkNewsPage } from '~/utils/header'

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
