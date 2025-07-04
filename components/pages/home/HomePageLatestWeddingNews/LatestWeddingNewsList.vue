<template>
  <div class="category-articles" :class="{ hidden: !visible }">
    <Cards class="news-articles js-news-articles-container">
      <CardStyle2
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :subtitle="article.subtitle"
        :link-to="articleLink(article)"
        :image="article.image"
      />
    </Cards>


    <Button v-if="withButton" :to="categoryLink" class="latest-news__see-more-btn" replace>
      More {{ categoryName }} News
    </Button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from '~/components/generic/Button/Button.vue'
import Cards from '~/components/generic/Cards/Cards.vue'
import CardStyle2 from '~/components/generic/Cards/CardStyle2.vue'

const props = defineProps({
  articles: {
    type: Array,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  withButton: {
    type: Boolean,
    default: false,
  },
})

const categoryLink = computed(() => {
  const firstArticle = props.articles[0]
  const categorySlug = firstArticle?.category?.slug || firstArticle?.subcategory?.category?.slug
  return `/news/${categorySlug}/`
})

const categoryName = computed(() => {
  const firstArticle = props.articles[0]
  return firstArticle?.category?.name || firstArticle?.subcategory?.category?.name || ''
})

function articleLink(article) {
  const categorySlug = article?.category?.slug || article?.subcategory?.category?.slug
  return `/news/${categorySlug}/${article.linkTo}/${article.id}`
}
</script>


<style lang="scss">

.latest-news__see-more-btn {
        display: flex !important;
        margin: 0 auto !important;
        margin-top: 1rem !important;
        letter-spacing: 0.1rem !important;
        @include medium-and-large-screens {
            margin-top: 2rem !important;
        }
    }

</style>