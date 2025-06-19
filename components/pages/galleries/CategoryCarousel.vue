<template>
  <div>
    <template v-if="!$isAMP">
      <div class="category-container fixed-height hide-overflow">
        <CardStyle5
          v-for="category in displayCategories"
          :key="category.id"
          :image="category.image"
          :linkTo="generateLinkTo(category)"
          :linkToLabel="linkToLabel"
          :title="category.name"
        />
      </div>
      <div class="button-wrapper">
        <Button class="category-show-more">Show more Categories</Button>
      </div>
    </template>
    <amp-carousel v-else height="290" layout="fixed-height" loop type="slides">
      <CardStyle3
        v-for="category in displayCategories"
        :key="category.id"
        :amp-photo-height="240"
        :image="category.image"
        :linkTo="generateLinkTo(category)"
        :linkToLabel="linkToLabel"
        :title="category.name"
        class="card-style-3-mobile"
        style="width: 100%; min-width: 100%"
      />
    </amp-carousel>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  linkToLabel: {
    type: String
  },
  filterCategories: {
    type: Array,
    default: () => []
  },
  urlPrefix: {
    type: String
  }
})

const sortedCategories = computed(() => {
  return [...props.categories].sort((a, b) => {
    if (a.name > b.name) return 1
    else if (a.name < b.name) return -1
    else return 0
  })
})

const displayCategories = computed(() => {
  return sortedCategories.value.filter(
    category => !props.filterCategories.includes(category.value)
  )
})

const generateLinkTo = category => {
  return `${props.urlPrefix}${category.slug}/`
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.button-wrapper {
  margin-top: 0;
}

.fixed-height {
  height: 14.5rem;
}

.category-container {
  text-align: center;
}
</style>
