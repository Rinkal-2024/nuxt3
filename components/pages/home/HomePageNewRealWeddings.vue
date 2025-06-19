<template>
  <PageSection :title="title" class="new-real-weddings" withoutTopBodyMargin>
    <TriplePreviewOverflow>
      <TriplePreviewOverflowItem
        v-for="item in items"
        :key="item.key"
        :category="item.category"
        :categoryLinkTo="weddingCategoryPath(item.category)"
        :image="item.image"
        :linkTo="weddingDetailsPath(item)"
        :title="item.title"
        linkTitle="See wedding"
        withHoverCallToAction
      />
    </TriplePreviewOverflow>

    <Link :to="linkTo" class="see-more-button" without-styles>
      <Button class="latest-news__see-more-btn">More real weddings</Button>
    </Link>

    <!--
    <DesktopView>
      <AdUnit ad-slot-name="homePageNewRealWeddings"/>
    </DesktopView>
    <MobileView>
      <AdUnit ad-slot-name="homePageNewRealWeddingsMobile"/>
    </MobileView>
    -->
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// Static data
const title = 'New Real Weddings'
const linkTo = '/weddings'

// Access Vuex store
const store = useStore()
const items = computed(() => store.getters['home/newRealWeddings/items'])

// Utility functions
const weddingDetailsPath = (item) => `/weddings/${item.linkTo}/${item.id}`

const weddingCategoryPath = (category) => {
  const categoryId = category.toLowerCase().replace(/ /g, '_')
  return {
    name: 'weddings-search-category-categoryType-categoryId',
    params: {
      categoryType: 'event_type',
      categoryId,
    },
  }
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
