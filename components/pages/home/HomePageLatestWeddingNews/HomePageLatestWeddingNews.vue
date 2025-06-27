<template>
  <PageSection
    :subtitle="subtitle"
    :title="title"
    class="latest-news-container"
  >
    <div class="latest-news">
      <div class="latest-news__news-wrapper">
        <LatestWeddingNewsCategories :categories="categories" />

        <LatestWeddingNewsList
          v-for="articleList in articles"
          :key="articleList.id"
          :id="getDivId(articleList.id)"
          :visible="articleList.id === 1"
          :articles="articleList.articles"
          with-button
        />
      </div>
    </div>
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import LatestWeddingNewsCategories from './LatestWeddingNewsCategories.vue'
import LatestWeddingNewsList from './LatestWeddingNewsList.vue'
import { useLatestNewsStore } from '~/store/home/latestNews.ts'
import PageSection from '~/components/generic/PageSection/PageSection.vue'

const store = useLatestNewsStore()
const categories = computed(() => store.categories)
console.log('latest items:', categories);

const articles = computed(() => store.articles)

function getDivId(id) {
  return `category-${id}-articles`
}
</script>


<style scoped lang="scss">
// @import "~/assets/styles/partials";

.latest-news {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 100%;

  .latest-news__news-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;

    @include medium-and-large-screens {
      flex-direction: row;
    }
  }
}

.latest-news-container {
  ::v-deep {
    @include small-and-medium-screens {
      .body.body {
        margin-top: 0;
        padding-top: 10px;
      }
    }
  }
}
</style>
