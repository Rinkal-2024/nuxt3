<template>
  <PageSection
    :subtitle="subtitle"
    :title="title"
    class="home-page-wedding-inspiration"
    withoutTopBodyMargin
  >
    <Cards class="cards">
      <CardStyle3
        v-for="item in items"
        :key="item.id"
        :amp-photo-height="176"
        :image="item.image"
        :link-to="galleryCategoryLink(item)"
        :title="item.title"
        linkToLabel="View gallery"
        withHoverLink
      />
    </Cards>
    <!-- <MobileView>
      <div class="see-more-button-container">
        <Link to="/inspiration/images" without-styles>
          <Button variant="primary">More Inspiration</Button>
        </Link>
      </div>
    </MobileView> -->
  </PageSection>
</template>

<script setup>
// Import necessary Nuxt 3 and Vue 3 functionalities
import { ref, computed } from 'vue'
import { useStore } from 'pinia'

// Title and subtitle values
const title = 'Wedding Inspiration'
const subtitle = 'Search our photo library by color & category for great wedding ideas'

// Use the Pinia store or state management (useState for Nuxt 3 store)
const store = useStore()

// Replacing mapGetters with Composition API
const isMobile = computed(() => store.global.config.isMobile)
const items = computed(() => store.home.weddingInspiration.items)

// Method for generating gallery link
const galleryCategoryLink = (item) => {
  return `/inspiration/images/category/${item.linkTo}`
}
</script>

<style scoped lang="scss">
// Scoped styles for the component
.home-page-wedding-inspiration {
  .cards {
    flex-direction: row;
    justify-content: space-between;

    ::v-deep {
      .card {
        @include small-screens {
          flex: 0 1 100% !important;
        }
      }
    }
  }

  .see-more-button-container {
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
