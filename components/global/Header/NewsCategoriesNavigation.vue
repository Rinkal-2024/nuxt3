<template>
  <div class="news-categories-navigation">
    <NuxtLink
      v-for="category in NEWS_CATEGORIES"
      :key="category.name"
      :to="linkToCategory(category.categorySlug)"
      class="link"
    >
      {{ category.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import NEWS_CATEGORIES from '~/constants/newsCategories'

const linkToCategory = (categorySlug: string) => ({
  name: 'news-category',
  params: { category: categorySlug }
})

const subcategoryLinkTo = (categorySlug: string, subcategorySlug: string) => ({
  name: 'news-category-subcategory',
  params: { category: categorySlug, subcategory: subcategorySlug }
})
</script>

<style scoped lang="scss">
.news-categories-navigation {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.link {
  @include apply-zero-padding-and-margin-for-first-and-last-child;
  white-space: nowrap;
  padding: 0 0.25rem;

  @include small-and-medium-screens {
    @include apply-font-and-size("link-decorative", 3);
    text-transform: capitalize !important;
    padding: 0.4rem 0;
    font-family: Didot LT Std, sans-serif !important;
    font-size: 1rem !important;
    line-height: 1.5rem !important;
  }
}
</style>
