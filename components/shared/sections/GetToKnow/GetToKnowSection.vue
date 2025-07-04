<template>
  <ClientOnly>
    <PageSection
      :title="title"
      class="center get-to-know"
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
      <NuxtLink to="/vendor" class= "without-styles">
        <Button >More Wedding Vendors</Button>
      </NuxtLink>
    </PageSection>
  </ClientOnly>
</template>

<script setup>
import Button from '~/components/generic/Button/Button.vue'
import PageSection from '~/components/generic/PageSection/PageSection.vue'
import TriplePreviewOverflow from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflow.vue'
import TriplePreviewOverflowItem from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflowItem.vue'
import { useGetToKnowStore } from '~/store/shared/getToKnow'

const title = 'Get To Know'
const store = useGetToKnowStore()
const items = store.items

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

</style>
