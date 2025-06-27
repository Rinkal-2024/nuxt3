<template>
  <div>
    <WeddingFilters />
    <Breadcrumbs />
    <WeddingsRealWeddings
      :loading="loading"
      :page="currentWeddingsPage"
      :with-load-more-button="moreWeddingsAvailable"
      @loadMore="loadMoreWeddings"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeddingsStore } from '~/store/api/weddings'
import { getMetaUri, requestData, createParamsString } from '~/utils/api'
import { processAdsOnPage } from '~/utils/adapex'

// Pinia store for weddings
const weddingsStore = useWeddingsStore()

// Reactive state for current page and loading state
const currentWeddingsPage = ref(1)
const loading = ref(false)

// Fetch totalPages from store
const totalPages = computed(() => weddingsStore.totalPages)

// Check if more weddings are available
const moreWeddingsAvailable = computed(() => currentWeddingsPage.value < totalPages.value)

// Fetch data on page load
onMounted(async () => {
  const route = useRoute()
  const page = route.query.page ?? 1
  const limit = 11

  const params = {
    fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
    limit,
    offset: (page - 1) * limit,
    order: '-first_published_at',
    sections: ['vendors-only-widget', 'venues-only-widget', 'colors'],
  }

  const paramsParsed = createParamsString(params)

  const [meta, data, info] = await requestData(
    useHttp(),
    getMetaUri(route),
    `weddings/${paramsParsed}`,
    'weddings_landing_page'
  )

  data.info = info

  // Redirect if no weddings found on this page
  if (page > 1 && data.items.length === 0) {
    useRouter().push('/weddings/')
  }

  // Store data in Pinia
  await weddingsStore.hydrate({ meta, data })
})

// Lazy-load process ads after page load
watchEffect(() => {
  processAdsOnPage()
})

// Head management for SEO
useHead(weddingsStore.head)

// Methods to load more weddings
const loadMoreWeddings = async () => {
  loading.value = true
  const page = currentWeddingsPage.value
  const limit = 11

  const params = {
    fields: 'id,images_preview,title,slug,wedding_city(display_name,id)',
    limit,
    offset: page * limit,
    order: '-first_published_at',
  }

  const paramsParsed = createParamsString(params)

  const newWeddings = await useHttp().$get(`weddings/${paramsParsed}`)
  await weddingsStore.addMoreWeddings(newWeddings.items)

  currentWeddingsPage.value++
  loading.value = false
}

</script>

<style scoped lang="scss">
/* Your custom styles here */
</style>
