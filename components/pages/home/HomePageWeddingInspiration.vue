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

    <!-- Optional mobile-only button -->
    <!--
    <MobileView>
      <div class="see-more-button-container">
        <NuxtLink to="/inspiration/images" class="no-style">
          <Button variant="primary">More Inspiration</Button>
        </NuxtLink>
      </div>
    </MobileView>
    -->
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import PageSection from '~/components/generic/PageSection/PageSection.vue'
import Cards from '~/components/generic/Cards/Cards.vue'

import { useHomeWeddingInspirationStore } from '~/store/home/weddingInspiration'
import CardStyle3 from '~/components/generic/Cards/CardStyle3.vue'

const title = 'Wedding Inspiration'
const subtitle = 'Search our photo library by color & category for great wedding ideas'

const store = useHomeWeddingInspirationStore()
const items = computed(() => store.items || [])
function galleryCategoryLink(item) {
  return `/inspiration/images/category/${item.linkTo}`
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

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
