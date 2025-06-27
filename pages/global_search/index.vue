<template>
  <div>
    <GlobalSearchHeader
      :global-search-field-value="globalSearchFieldValue"
      :total-count="totalCount"
      @filter="pageChanged"
    />
    
    <PageSection
      title="News"
      v-if="isSectionVisible('NEWS')"
    >
      <LatestWeddingNewsList
        v-if="news.length > 0"
        :articles="displayedNews"
      />
      <EmptyListMessage
        v-else
        class="center"
      >
        No results found.
      </EmptyListMessage>

      <div v-if="isSectionSelected('NEWS')">
        <div v-if="totalCount > 12" class="button-wrapper">
          <Button
            id="search-load-more"
            :data-query="globalSearchFieldValue"
            data-search-type="news"
            :data-total="totalCount"
            data-offset="12"
            data-render-to=".js-news-articles-container"
          >
            Load more
          </Button>
          <div class="hidden js-search-more-loading"><LoadingIndicator/></div>
        </div>
      </div>

      <div v-if="news.length > 0 && !isSectionSelected('NEWS')" class="see-more-btn-container">
        <Link
          without-styles
          :to="getCategoryLink('news')"
          @click="pageChanged"
        >
          <Button
            variant="outline"
            class="see-more-btn"
          >
            View all results
          </Button>
        </Link>
      </div>
    </PageSection>

    <PageSectionSeparator v-if="showSeparators && isSectionVisible('NEWS')"/>

    <!-- Repeat for other sections like WEDDINGS, VENDORS, and GALLERIES -->

    <PageSection v-if="showGlobalNoResults">
      <EmptyListMessage class="center">
        No results found.
      </EmptyListMessage>
    </PageSection>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useStore } from '~/store/global/config.ts'
import { createParamsString, getMetaUri, requestData } from '~/utils/api'
import GLOBAL_SEARCH_PAGE_CATEGORIES from '~/constants/globalSearchPageCategories'

// const store = useStore()

const route = useRoute()
const router = useRouter()

const intersectionOptions = ref({
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: [0, 1],
})

const globalSearchFieldValue = computed(() => route.query.query)
const queryCategory = computed(() => route.query.category)

// const showSeparators = computed(() => !queryCategory.value)
// const showGlobalNoResults = computed(() => store.totalCount === 0 && !queryCategory.value)

// const displayedNews = computed(() => {
//   if (!isSectionSelected('NEWS')) {
//     return store.news.slice(0, 3)
//   }
//   return store.news
// })

// const displayedWeddings = computed(() => {
//   if (!isSectionSelected('WEDDINGS')) {
//     return store.weddings.slice(0, 3)
//   }
//   return store.weddings
// })

// const displayedVendors = computed(() => {
//   if (!isSectionSelected('VENDORS')) {
//     return store.vendors.slice(0, 3)
//   }
//   return store.vendors
// }) 

// const displayedGalleries = computed(() => {
//   if (!isSectionSelected('GALLERIES')) {
//     return store.galleries.slice(0, 12)
//   }
//   return store.galleries
// })

onMounted(() => {
  loadData()
})

async function loadData() {
  const query = route.query
  const page = query.page || 1
  const limit = 120
  const category = query?.category
  const categories = {
    weddings: {
      endpoint: 'weddings',
      params: {
        fields: 'title,event_type_display,slug,main_image',
        limit: 12,
        offset: 12 * (page - 1),
        search: query?.query,
      },
    },
    news: {
      endpoint: 'news',
      params: {
        fields: 'id,title,slug,main_image,subcategory(*,category(*)),subtitle,description',
        limit: 12,
        offset: 12 * (page - 1),
        search: query?.query,
      },
    },
    vendors: {
      endpoint: 'vendors',
      params: {
        fields: 'name,main_image,city,slug,categories(*)',
        limit: 12,
        offset: 12 * (page - 1),
        search: query?.query,
      },
    },
    galleries: {
      endpoint: 'galleries',
      params: {
        fields: 'category(*),image(*)',
        limit: 12,
        offset: 12 * (page - 1),
        search: query?.query,
      },
    },
  }
  const endpoint = categories[category]?.endpoint || 'global_search'
  const params = categories[category]?.params || {
    limit,
    offset: (page - 1) * limit,
    query: query?.query,
  }

  const paramsParsed = createParamsString(params)

  const [meta, data] = await requestData(store.$http, getMetaUri(), `${endpoint}/${paramsParsed}`)

  await store.$dispatch('hydrate', { meta, data, category })
}

function pageChanged() {
  router.go(0) // Reload the page
}

function isSectionVisible(section) {
  return (
    !queryCategory.value &&
    store[section.toLowerCase()].length > 0 ||
    queryCategory.value === GLOBAL_SEARCH_PAGE_CATEGORIES[section]
  )
}

function isSectionSelected(section) {
  return queryCategory.value === GLOBAL_SEARCH_PAGE_CATEGORIES[section]
}

function getCategoryLink(category) {
  const currentQuery = { ...route.query }
  if (category) {
    currentQuery.category = category
  } else {
    delete currentQuery.category
  }
  return { name: 'global_search', query: currentQuery }
}

function getWeddingPath(wedding) {
  return `/weddings/${wedding.slug}/${wedding.id}`
}
</script>

<style scoped lang="scss">
.see-more-btn {
  margin-top: 0;
  letter-spacing: 0.1rem;
  @include medium-and-large-screens {
    margin-top: 2rem;
  }
}

.see-more-btn-container {
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

::v-deep .card {
  margin-bottom: 1rem !important;
}
</style>
