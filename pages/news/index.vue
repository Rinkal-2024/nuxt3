<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'
import { useNewsStore } from '~/store/api/news'
import { getMetaUri, requestData, createParamsString } from '~/utils/api'
import { processAdsOnPage } from '~/utils/adapex'
import { getImageSrcSet } from '~/utils/imgSrcSet'
import IMAGE_SIZES from '~/constants/imageSizes'

import Breadcrumbs from '~/components/generic/Breadcrumbs/Breadcrumbs.vue'
import NewsWeddingNews from '~/components/pages/news/NewsWeddingNews.vue'
// import PageSectionSeparator from '~/components/PageSectionSeparator.vue'
// import LazyNewsWeddingTipsFromThePros from '~/components/LazyNewsWeddingTipsFromThePros.vue'
// import LazyNewsGetMoreAdviceFrom from '~/components/LazyNewsGetMoreAdviceFrom.vue'

const newsStore = useNewsStore()
const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page ?? 1))
const loading = ref(false)

// Compute if more news available
const moreNewsAvailable = computed(() => newsStore.totalPages > currentPage.value)

// Load news for the page (called in useAsyncData and for loadMoreNews)
async function fetchNews(page: number) {
  loading.value = true
  const limit = 10
  const params = {
    fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
    limit,
    offset: (page - 1) * limit,
    order: '-first_published_at',
    sections: ['vendors-widget', 'extra-news-widget'],
  }
  const paramsParsed = createParamsString(params)
  const [meta, data, info] = await requestData(
    $fetch,
    `${getMetaUri(null, route)}news/${paramsParsed}`,
    'news_landing_page'
  )
  if (page > 1 && data.items.length === 0) {
    router.replace('/news/')
    return
  }
  data.info = info
  if (page === 1) {
    await newsStore.hydrate({ meta, data })
  } else {
    await newsStore.addMoreNews({ data })
  }
  loading.value = false
  // Wait next tick and then process ads
  await nextTick()
  processAdsOnPage()
}

// Load more news (pagination)
async function loadMoreNews() {
  currentPage.value++
  await fetchNews(currentPage.value)
}

// Watch page query param and update currentPage + fetch data if changed
watch(() => route.query.page, (newPage) => {
  const pageNumber = Number(newPage ?? 1)
  if (pageNumber !== currentPage.value) {
    currentPage.value = pageNumber
    fetchNews(pageNumber)
  }
})

// Initial fetch on mount
onMounted(() => {
  fetchNews(currentPage.value)
})

// Manage <head>
useHead(() => {
  const head = newsStore.head
  const mainImage = newsStore.items?.[0]?.main_image?.image
  if (mainImage) {
    const preloadImage = {
      rel: 'preload',
      fetchpriority: 'high',
      as: 'image',
      imagesrcset: getImageSrcSet(mainImage),
      imagesizes: `(max-width: 1024px) 100vw, ${IMAGE_SIZES.MEDIUM}px`
    }
    head.link = head.link ? [preloadImage, ...head.link] : [preloadImage]
  }
  return head
})
</script>

<template>
  <div>
    <!-- Hydration triggers replaced by client-only + v-if usage -->
    <client-only>
      <Breadcrumbs />
    </client-only>

    <client-only>
      <NewsWeddingNews
        :loading="loading"
        :page="currentPage"
        :with-load-more-button="moreNewsAvailable"
        @loadMore="loadMoreNews"
      />
    </client-only>

    <PageSectionSeparator />

    <client-only>
      <LazyNewsWeddingTipsFromThePros />
    </client-only>

    <PageSectionSeparator />

    <client-only>
      <LazyNewsGetMoreAdviceFrom />
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.listing-section {
  margin-top: 2rem;
}
.description :deep(p) {
  font-size: 0.75rem;
}
.description :deep(button) {
  color: #000;
}
</style>
