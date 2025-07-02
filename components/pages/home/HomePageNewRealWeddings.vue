<template>
  <PageSection :title="title" class="new-real-weddings" withoutTopBodyMargin>
    <TriplePreviewOverflow>
      <TriplePreviewOverflowItem
        v-for="item in items"
        :key="item.id"
        :category="item.category"
        :categoryLinkTo="weddingCategoryPath(item.category)"
        :image="item.image"
        :linkTo="weddingDetailsPath(item)"
        :title="item.title"
        linkTitle="See wedding"
        withHoverCallToAction
      />
    </TriplePreviewOverflow>

    <NuxtLink :to="linkTo" class="see-more-button" without-styles>
      <Button class="latest-news__see-more-btn">More real weddings</Button>
    </NuxtLink>

    <!-- Optional Ads -->
    <!-- <DesktopView>
      <AdUnit ad-slot-name="homePageNewRealWeddings" />
    </DesktopView>
    <MobileView>
      <AdUnit ad-slot-name="homePageNewRealWeddingsMobile" />
    </MobileView> -->
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import Button from '~/components/generic/Button/Button.vue'
import PageSection from '~/components/generic/PageSection/PageSection.vue'
import TriplePreviewOverflow from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflow.vue'
import TriplePreviewOverflowItem from '~/components/generic/TriplePreviewOverflow/TriplePreviewOverflowItem.vue'
import { useHomeNewRealWeddingsStore } from '~/store/home/newRealWeddings'

const title = 'New Real Weddings'
const linkTo = '/weddings'

const store = useHomeNewRealWeddingsStore()
const items = computed(() => store.items || [])

function weddingDetailsPath(item) {
  return `/weddings/${item.linkTo}/${item.id}`
}

function weddingCategoryPath(category) {
  const categoryId = category.toLowerCase().replace(/ /g, '_')
  return `/weddings/search/category/event_type/${categoryId}`
}

</script>

<style scoped lang="scss">
.new-real-weddings {
  .see-more-button {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    flex: 1 1 100%;
    width: 100%;
  }
}
</style>
