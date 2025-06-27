<template>
  <div>
    <GalleriesFilters />
    <Breadcrumbs class="galleries__breadcrumbs" />

    <PageSection
      :description="landingPageIntroduction"
      :description-as-html="introductionIsHtml"
      :subtitle="landingPageSubtitle"
      :title="landingPageTitle"
      class="galleries-carousel-section"
      subtitleTag="h2"
      titleTag="h1"
      without-top-body-margin
    >
      <CategoryCarousel
        :categories="categories"
        urlPrefix="/inspiration/images/category/"
        linkToLabel="View gallery"
      />
    </PageSection>

    <PageSectionSeparator />

    <PageSection :style="photoLibrarySectionStyle" without-top-body-margin>
      <PhotoLibrary
        :ad-units="['galleryAd1', '', 'galleryAd2', '']"
        :images="images"
        id="photo-library"
        strict-width
      />

      <div v-if="!isAmp">
        <div ref="infiniteTrigger" class="observer-trigger" />
        <div v-if="moreImagesAvailable" class="button-wrapper">
          <Button @click="loadMoreImages">Load more</Button>
          <LoadingIndicator v-if="loading" />
        </div>
      </div>

      <div v-else class="amp-pagination reduce-margin">
        <NuxtLink v-if="currentPage > 1" :to="prevAMPPage">Previous page</NuxtLink>
        <NuxtLink v-if="currentPage < totalPages" :to="nextAMPPage">Next page</NuxtLink>
      </div>

      <AccordionText
        v-if="landingPageDescription"
        :html="landingPageDescription"
        low-profile
      />
    </PageSection>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAsyncData, useNuxtApp } from '#app'

import { createParamsString, getMetaUri, requestData } from '~/utils/api'

// Access Nuxt app
const { $http, $store } = useNuxtApp()
const route = useRoute()
const router = useRouter()

// State
const currentPage = ref(Number(route.query.page) || 1)
const loading = ref(false)
const limit = 36
const infiniteTrigger = ref(null)
const isAmp = false // replace with actual AMP detection logic if needed

// Fetch initial data (equivalent of asyncData)
const { data } = await useAsyncData('gallery-landing', async () => {
  const params = {
    fields: 'image,category(*)',
    limit,
    offset: (currentPage.value - 1) * limit,
    order: '-created',
    sections: ['galleries-categories', 'colors'],
    showOnGallery: true
  }

  const [meta, data, info] = await requestData(
    $http,
    getMetaUri(null, route),
    `galleries/${createParamsString(params)}`,
    'galleries_landing_page'
  )

  if (currentPage.value > 1 && !data.items.length) {
    return router.replace('/inspiration/images/')
  }

  data.info = info

  await $store.dispatch('api/galleries/hydrate', { meta, data })
  return data
})

// Getters
const categories = computed(() => $store.getters['api/galleries/categories'])
const images = computed(() => $store.getters['api/galleries/images'])
const totalPages = computed(() => $store.getters['api/galleries/totalPages'])
const landingPageTitle = computed(() => $store.getters['api/galleries/landingPageTitle'])
const landingPageSubtitle = computed(() => $store.getters['api/galleries/landingPageSubtitle'])
const landingPageIntroduction = computed(() => $store.getters['api/galleries/landingPageIntroduction'])
const landingPageDescription = computed(() => $store.getters['api/galleries/landingPageDescription'])

const moreImagesAvailable = computed(() => currentPage.value < totalPages.value)
const introductionIsHtml = computed(() => Array.isArray(landingPageIntroduction.value))
const photoLibrarySectionStyle = 'min-height: 600px'

const prevAMPPage = computed(() => ({
  path: route.path,
  query: { page: currentPage.value - 1 }
}))

const nextAMPPage = computed(() => ({
  path: route.path,
  query: { page: currentPage.value + 1 }
}))

// Load more function
async function loadMoreImages() {
  if (loading.value || !moreImagesAvailable.value) return

  loading.value = true

  const params = {
    fields: 'image,category(*)',
    limit,
    offset: currentPage.value * limit,
    order: '-created',
    showOnGallery: true
  }

  const res = await $http.$get(`galleries/${createParamsString(params)}`)
  await $store.dispatch('api/galleries/addImages', res.items)
  currentPage.value++
  loading.value = false
}

// IntersectionObserver for infinite scroll
onMounted(() => {
  if (!infiniteTrigger.value) return

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) loadMoreImages()
  }, { rootMargin: '0px 0px 200px 0px' })

  observer.observe(infiniteTrigger.value)
})
</script>

<style scoped lang="scss">
// .galleries-carousel-section ::v-deep .section {
//   margin-top: -1rem;
// }
// .observer-trigger {
//   height: 1px;
// }
// @include small-and-medium-screens {
//   .galleries__breadcrumbs {
//     margin-bottom: 4rem;
//     margin-top: -0.5rem;
//   }
// }
</style>
