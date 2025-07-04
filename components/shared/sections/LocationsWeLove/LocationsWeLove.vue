<template>
  <ClientOnly>
    <PageSection
      :title="title"
      class="center locations-we-love"
      withoutTopBodyMargin
    >
      <TriplePreviewOverflow>
        <TriplePreviewOverflowItem
          v-for="item in items"
          :key="item.key"
          :category="item.category"
          :categoryLinkTo="vendorCategoryPath(item)"
          :description="item.description"
          :image="item.image"
          :linkTo="vendorProfilePath(item)"
          :title="item.title"
        />
      </TriplePreviewOverflow>

      <NuxtLink to="/vendor/search/category/wedding-site-location1" no-underline>
        <Button>More Wedding Venues</Button>
      </NuxtLink>
    </PageSection>
  </ClientOnly>
</template>

<script setup>
import { useHomeLocationsWeLoveStore } from '~/store/home/locationsWeLove' // Pinia store
import PageSection from '~/components/generic/PageSection/PageSection.vue'
import TriplePreviewOverflow from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflow.vue'
import TriplePreviewOverflowItem from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflowItem.vue'
import Button from '~/components/generic/Button/Button.vue'
import { computed } from 'vue'

const title = 'Locations We Love'

// Use Pinia store instead of Vuex
const store = useHomeLocationsWeLoveStore()

// Computed items from store
const items = computed(() => store.items || [])

// Functions to build route objects
function vendorCategoryPath(vendor) {
  return {
    name: 'vendor-search-category-categorySlug',
    params: {
      categorySlug: vendor.categorySlug,
    },
  }
}

function vendorProfilePath(vendor) {
  return {
    name: 'biz-slug-id',
    params: {
      slug: vendor.link,
      id: vendor.key,
    },
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
