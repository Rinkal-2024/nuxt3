<template>
  <PageSection
    v-if="items.length"
    :subtitle="subtitle"
    :title="title"
    class="honeymoon-destinations"
    without-vertical-margins
  >
    <div class="section-container">
      <Cards class="cards">
        <CardStyle2
          v-for="item in items"
          :key="item.id"
          :image="item.image"
          :link-to="newsLink(item)"
          :subtitle="item.subtitle"
          :title="item.title"
          class="card"
        />
      </Cards>
    </div>
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import Cards from '~/components/generic/Cards/Cards.vue'
import CardStyle2 from '~/components/generic/Cards/CardStyle2.vue'
import PageSection from '~/components/generic/PageSection/PageSection.vue'
import { useHomeHoneymoonsWidgetStore } from '~/store/home/honeymoonsWidget'

const title = 'Honeymoons & Destination Weddings'
const subtitle = 'Travel updates from luxury destinations and resorts'

const store = useHomeHoneymoonsWidgetStore()

const items = computed(() => store.items || [])

const newsLink = (newsItem) => `/news/travel-honeymoon/${newsItem.linkTo}/${newsItem.id}`
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.honeymoon-destinations {
  margin-top: 3rem;
}

.section-container {
  background: linear-gradient($color-darker-white, $color-darker-white);
  background-size: 100% 80%;
  background-repeat: no-repeat;
  background-position: 50% calc(100% - 2rem);
}

.cards {
  @include medium-and-large-screens {
    max-width: 57.25rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2.5rem;
    padding-bottom: 4rem;
  }

  ::v-deep .card {
    margin-top: 1rem;
    text-align: center;

    * {
      text-align: center;
    }

    @include medium-and-large-screens {
      margin: 0;
      flex: 0 1 calc(33.333% - 1.5rem);
    }
  }
}
</style>
