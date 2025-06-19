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

    <NuxtLink v-if="withButton" :to="categoryLink" class="unstyled-link">
      <Button class="latest-news__see-more-btn" :name="`More ${categoryName} News`">
        {{ `More ${categoryName} News` }}
      </Button>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  withButton: {
    type: Boolean,
    default: false
  }
})

const categoryLink = computed(() => {
  const first = props.articles[0]
  const slug = first?.category?.slug || first?.subcategory?.category?.slug
  return `/news/${slug}/`
})

const categoryName = computed(() => {
  const first = props.articles[0]
  return first?.category?.name || first?.subcategory?.category?.name
})

const articleLink = (article) => {
  const slug = article?.category?.slug || article?.subcategory?.category?.slug
  return `/news/${slug}/${article.linkTo}/${article.id}`
}
</script>

<style scoped lang="scss">
// Optional: Remove default link styles if needed
.unstyled-link {
  all: unset;
}

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
