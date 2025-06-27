<template>
  <div>
    <p>sdf</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

// import LazyHydrate from 'vue-lazy-hydration'
import { getMetaUri, requestData, createParamsString } from '~/utils/api'
import { processAdsOnPage } from '~/utils/adapex'
import { getImageSrcSet } from '~/utils/imgSrcSet'
import PageSectionSeparator from '~/components/generic/PageSectionSeparator/PageSectionSeparator.vue'
import Breadcrumbs from '~/components/generic/Breadcrumbs/Breadcrumbs.vue'

// Vuex store fallback for Nuxt 3
const { $store, $http, ssrContext } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page) || 1)
const loading = ref(false)

const categorySlug = computed(() => route.params.category)

const limit = 10

// Fetch news data initially
const { data, error } = await useAsyncData('news-data', async () => {
  const params = {
    fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
    limit,
    offset: (currentPage.value - 1) * limit,
    order: '-first_published_at',
    sections: ['vendors-widget', 'extra-news-widget'],
    subcategory__category__slug: categorySlug.value
  }

  const paramsParsed = createParamsString(params)

  const [meta, newsData] = await requestData(
    $http,
    getMetaUri(ssrContext?.req, route),
    `news/${paramsParsed}`
  )

  if (currentPage.value > 1 && newsData.items.length === 0) {
    return router.replace('/news/')
  }

  await $store.dispatch('api/news/hydrate', {
    meta,
    data: newsData
  })

  return newsData
})

const totalPages = computed(() => $store.getters['api/news/totalPages'])
const moreNewsAvailable = computed(() => totalPages.value > currentPage.value)

watch(currentPage, () => {
  nextTick(() => processAdsOnPage())
})

async function loadMoreNews() {
  currentPage.value += 1
  loading.value = true

  const params = {
    fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
    limit,
    offset: (currentPage.value - 1) * limit,
    order: '-first_published_at',
    subcategory__category__slug: categorySlug.value
  }

  const paramsParsed = createParamsString(params)

  const [newsData] = await requestData($http, `news/${paramsParsed}`)

  await $store.dispatch('api/news/addMoreNews', { data: newsData })
  loading.value = false
}
</script>

<!-- Optional Nuxt 3 composable -->
<script>
export default defineNuxtComponent({
  head() {
    const store = useNuxtApp().$store
    const head = store.getters['api/news/head']
    const items = store.state.api.news.items
    const mainImage = items?.length && items[0].main_image?.image

    if (mainImage) {
      const mainImageLink = {
        rel: 'preload',
        fetchpriority: 'high',
        as: 'image',
        imagesrcset: getImageSrcSet(mainImage),
        imagesizes: '(max-width: 1024px) 100vw, min(calc(100vw - 26rem), 920px)'
      }
      head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
    }
    return head
  }
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.listing-section {
  margin-top: 2rem;
}
</style>
