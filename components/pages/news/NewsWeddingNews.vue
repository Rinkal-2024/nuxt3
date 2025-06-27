<template>
  <PageSection
    :description="categoryIntroduction"
    :description-as-html="categoryIntroductionIsHtml"
    :subtitle="subtitle"
    :title="title"
    class="listing-section"
    fullWidth
    subtitleTag="h2"
    titleTag="h1"
    without-top-body-margin
  >
    <VendorCarousel />

    <div id="news-list">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="news-list__item-container"
      >
        <PageLayoutMargin>
          <div class="news-list__item">
            <LazyNewsCard :lazy-photo="index !== 0 && !isAMP" :news="item" />
          </div>
        </PageLayoutMargin>
        <PageSectionSeparator />
      </div>
    </div>

    <div>
      <div
        v-waypoint="{ active: true, callback: autoLoadMoreContent, intersectionOptions }"
      />

      <div v-if="withLoadMoreButton" class="button-wrapper">
        <template v-if="!isAMP">
          <Button id="news-load-more">Load more</Button>
          <div id="news-loading" class="hidden"><LoadingIndicator /></div>
        </template>

        <template v-else>
          <div class="amp-pagination">
            <RouterLink v-if="pageNumber > 1" :to="prevAMPPage">Previous page</RouterLink>
            <RouterLink v-if="pageNumber < totalPages" :to="nextAMPPage">Next page</RouterLink>
          </div>
        </template>
      </div>

      <AccordionText
        v-show="categoryDescription"
        :html="categoryDescription"
        low-profile
      />
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import { useNewsStore } from '~/store/api/news' 
import { NEWS_CATEGORIES } from '~/constants/newsCategories'

// Props
const props = defineProps({
  withLoadMoreButton: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  page: {
    type: [Number, String],
    default: 1,
  },
})

const emit = defineEmits(['loadMore'])

const defaultSubtitle =
  'Inside Weddings shares the latest wedding news, from planning and design ideas for your ceremony and reception, to celebrity weddings, travel ideas, and more!'

const defaultDescription = `...your long defaultDescription string here...` // copy your string here

const intersectionOptions = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: [0, 1],
}

const throttleLock = ref(false)
const autoLoadingCounter = ref(0)
const autoLoadingLimit = 3

const route = useRoute()
const nuxtApp = useNuxtApp()

const store = useNewsStore()

const category = computed(() => route.params.category as string | undefined)

const categoryKey = computed(() => {
  if (!category.value) return null
  let key = category.value.replace(/-/g, '_').toUpperCase()
  if (key === 'PLANNING_DESIGN') key = 'PLANNING_AND_DESIGN'
  return key
})

const subCategory = computed(() => route.params.subcategory as string | undefined)

const subtitle = computed(() => store.landingPageSubtitle || 'Expert wedding planning tips & inspiration')

const title = computed(() => {
  if (route.name === 'news' && store.landingPageTitle) return store.landingPageTitle
  if (route.name === 'news-category' && store.categoryPageTitle) return store.categoryPageTitle
  if (route.name === 'news-category-subcategory' && store.subcategoryPageTitle) return store.subcategoryPageTitle
  if (store.categoryTitle) return store.categoryTitle
  if (categoryKey.value && !subCategory.value) {
    const key = categoryKey.value as keyof typeof NEWS_CATEGORIES
    return NEWS_CATEGORIES[key]?.title || 'Wedding Advice & News'
  }
  return 'Wedding Advice & News'
})

const items = computed(() => store.items)

const totalPages = computed(() => store.totalPages)

const categoryIntroduction = computed(() => {
  let intro = ''
  if (route.name === 'news') {
    intro = store.landingPageIntroduction
  } else if (route.name === 'news-category') {
    intro = store.categoryIntroduction
  } else if (route.name === 'news-category-subcategory') {
    intro = store.subcategoryIntroduction
  } else {
    intro = store.introduction
  }

  if (!intro) {
    if (category.value && subCategory.value) {
      intro =
        NEWS_CATEGORIES[categoryKey.value]?.subCategories.find((x: any) => x.subcategorySlug === subCategory.value)
          ?.introduction || ''
    } else if (category.value) {
      intro = NEWS_CATEGORIES[categoryKey.value]?.introduction || ''
    }
  }

  return intro || defaultSubtitle
})

const categoryIntroductionIsHtml = computed(() => Array.isArray(categoryIntroduction.value))

const categoryDescription = computed(() => {
  if (route.name === 'news') {
    return store.landingPageDescription || defaultDescription
  }
  if (route.name === 'news-category') return store.categoryDescription
  if (route.name === 'news-category-subcategory') return store.subcategoryDescription
  return defaultSubtitle
})

const currentRoutePath = computed(() => route.path)

const pageNumber = computed(() => Number(props.page))

const prevAMPPage = computed(() => ({
  path: currentRoutePath.value,
  query: { page: pageNumber.value - 1 },
}))

const nextAMPPage = computed(() => ({
  path: currentRoutePath.value,
  query: { page: pageNumber.value + 1 },
}))

// Assuming $isAMP is a global in Nuxt 2, in Nuxt 3 you can define it yourself or via plugin
// For now, let's assume it's available globally via Nuxt app context or define a stub:
const isAMP = nuxtApp.$isAMP || false

// Methods

// function pageChanged() {
//   nuxtApp.refresh()
// }

function autoLoadMoreContent({ going }: { going: string }) {
  // Replace your $waypointMap.GOING_IN with string literal or your own constant if needed
  if (going !== 'going-in' || autoLoadingCounter.value > 2) return

  autoLoadingCounter.value += 1
  loadMoreContent()
}

function loadMoreContent() {
  if (props.loading || throttleLock.value) return

  throttleLock.value = true
  setTimeout(() => {
    throttleLock.value = false
  }, 1000)

  emit('loadMore')
}
</script>

<style scoped lang="scss">
#news-list {
  ::v-deep {
    .news-list__item {
      &:last-child {
        padding-bottom: 0;
      }
      & + & {
        padding-top: 2rem;
        border-top: $border-width solid $color-grey;
      }
    }
  }

  .news-list__item-container {
    margin-top: 3rem;
  }
}
</style>
