<template>
  <div>
    <TheHeader />

    <div
      :class="{ '--with-news-categories-menu': isNewsListPage }"
      class="body"
    >
      <NuxtPage />
    </div>

    <!-- Uncomment when needed -->
    <NewsletterSignup
      v-if="showNewsletterSignup"
      is-footer
      subtitle="Get inspiring wedding ideas and planning tips from Inside Weddings via email."
      title="Free Membership!"
    />

    <TheFooter />
    <!-- <AdUnitFixed ad-slot-name="stickyFooter" /> -->
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, watch, nextTick, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '~/store/global/config'
import { processAdsOnPage } from '~/utils/adapex'
import { isNewsListPage as checkIsNewsListPage } from '~/utils/header'
import TheHeader from '~/components/global/Header/TheHeader.vue'
import NewsletterSignup from '~/components/generic/NewsletterSignup/NewsletterSignup.vue'
import TheFooter from '~/components/global/Footer/TheFooter.vue'
// import { reloadAds } from '~/utils/ads'

const config = useConfigStore()
const route = useRoute()

const isSignedUp = ref(true)

const NEWSLETTER_ROUTES = [
  '/news',
  '/weddings',
  '/inspiration',
  '/vendor',
  '/biz',
  '/global_search'
]

onBeforeMount(() => {
  updateWindowSize()
  watchWindowSize()
  updateScrollingPosition()
  watchScrollingPosition()
})

onMounted(() => {
  if (!document.cookie.includes('NewsletterSubscribed')) {
    isSignedUp.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize)
  window.removeEventListener('scroll', updateScrollingPosition)
})

function updateWindowSize() {
  config.windowSizeChanged(window.innerWidth)
}

function watchWindowSize() {
  window.addEventListener('resize', updateWindowSize, { passive: true })
}

function updateScrollingPosition() {
  config.scrollingPositionChanged(window.scrollY)
}

function watchScrollingPosition() {
  window.addEventListener('scroll', updateScrollingPosition, { passive: true })
}

const isNewsListPage = computed(() => checkIsNewsListPage(route))

const currentRouteHasNewsletterSignup = computed(() => {
  if (route.path === '/') {
    return true
  }
  return NEWSLETTER_ROUTES.some(r => route.path.startsWith(r))
})

const showNewsletterSignup = computed(() => currentRouteHasNewsletterSignup.value)

watch(
  () => route.fullPath,
  () => {
    nextTick(processAdsOnPage)
  }
)
</script>

<style lang="scss" scoped>
$news-categories-offset: 57px;
$desktop-top-offset: 165px;
$mobile-top-offset: 3rem;

.body {

    margin-top: $mobile-top-offset;    
    min-height: 100vh; 

    @include medium-and-large-screens {       
        margin-top: $desktop-top-offset;

        &.--with-news-categories-menu {
            margin-top: $desktop-top-offset + $news-categories-offset
        }
    }
}
</style>
