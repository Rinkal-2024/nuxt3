<template>
  <PageSection :subtitle="subtitle" :title="title" class="latest-news-container">
    <div class="latest-news">
      <div class="latest-news__news-wrapper">
        <LatestWeddingNewsCategories
          :categories="categories"
          :selectedCategoryId="selectedCategoryId"
          @update:category="handleCategoryChange"
        />
        <LatestWeddingNewsList
          :articles="selectedArticles"
          :visible="true"
          with-button
        />
      </div>
    </div>
  </PageSection>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLatestNewsStore } from '~/store/home/latestNews'
import LatestWeddingNewsCategories from './LatestWeddingNewsCategories.vue'
import LatestWeddingNewsList from './LatestWeddingNewsList.vue'
import PageSection from '~/components/generic/PageSection/PageSection.vue'

const latestNewsStore = useLatestNewsStore()

const subtitle = 'Expert wedding planning tips & inspiration'
const title = 'Latest Wedding News'

const categories = computed(() => latestNewsStore.categories)
const allArticles = computed(() => latestNewsStore.articles)

// ✅ Default selected category
const selectedCategoryId = ref(null)

watch(categories, (val) => {
  if (val?.length && !selectedCategoryId.value) {
    selectedCategoryId.value = val[0].id
  }
}, { immediate: true })

// ✅ Filter articles for the selected category
const selectedArticles = computed(() =>
  allArticles.value.find(item => item.id === selectedCategoryId.value)?.articles || []

)
console.log("ima" ,selectedArticles.value[0]?.image?.medium?.url)


function handleCategoryChange(id) {
  selectedCategoryId.value = id
}
</script>


<style lang="scss" scoped>
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
