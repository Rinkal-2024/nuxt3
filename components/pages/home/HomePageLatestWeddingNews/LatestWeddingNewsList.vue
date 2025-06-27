<template>
  <div class="category-articles" :class="{ hidden: !visible }">
    <Cards class="news-articles js-news-articles-container">
      <CardStyle2
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :subtitle="article.subtitle"
        :link-to="articleLink(article)"
        :image="article.image?.url || article.image"
      />
    </Cards>

    <Link v-if="withButton" :to="categoryLink" without-styles>
      <Button class="latest-news__see-more-btn" :name="`More ${categoryName} News`">
        {{ `More ${categoryName} News` }}
      </Button>
    </Link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import CardStyle2 from '~/components/generic/Cards/CardStyle2.vue'
import Cards from '~/components/generic/Cards/Cards.vue'
import Button from '~/components/generic/Button/Button.vue'

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

const config = useRuntimeConfig()

const categoryLink = computed(() => {
  const article = props.articles?.[0]
  const categorySlug = article?.category?.slug || article?.subcategory?.category?.slug
  return `/news/${categorySlug}/`
})

const categoryName = computed(() => {
  const article = props.articles?.[0]
  return article?.category?.name || article?.subcategory?.category?.name
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