<template>
  <nav class="news-categories-navigation" role="navigation">
    <div
      v-for="category in NEWS_CATEGORIES"
      :key="category.name"
      class="link-wrapper"
    >
      <RouterLink :to="linkToCategory(category.categorySlug)" class="link">
        {{ category.name }}
      </RouterLink>
      <div class="sub-navigation">
        <div class="sub-navigation-overflow-wrapper">
          <div class="sub-navigation-item">
            <RouterLink
              v-for="subcategory in category.subCategories"
              :key="subcategory.name"
              :to="subcategoryLinkTo(category.categorySlug, subcategory.subcategorySlug)"
            >
              {{ subcategory.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import NEWS_CATEGORIES from '~/constants/newsCategories'
import { RouterLink } from 'vue-router'

const linkToCategory = (categorySlug) => ({
  name: 'news-category',
  params: { category: categorySlug }
})

const subcategoryLinkTo = (categorySlug, subcategorySlug) => ({
  name: 'news-category-subcategory',
  params: { category: categorySlug, subcategory: subcategorySlug }
})
</script>

<style scoped lang="scss">
// @use "../../../../assets/styles/partials/mixins" as *;

// .news-categories-navigation {
//   display: flex;
//   flex: 1 1 100%;
//   justify-content: space-between;
//   align-items: center;
// }

// .link {
//   @include apply-zero-padding-and-margin-for-first-and-last-child;
//   margin: 0;

//   @include apply-font-and-size("link-decorative", 7);
//   font-weight: bold;
//   text-align: center;
// }

// .link-wrapper {
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background-color: $color-white;

//     .link {
//       text-decoration: none;
//       z-index: $header-subnavigation-main-link-z-index;
//     }
//     .sub-navigation,
//     &:before {
//       display: flex;
//       visibility: visible;
//     }
//   }
// }

// .sub-navigation {
//   display: none;
//   visibility: hidden;
//   flex-direction: column;
//   justify-content: center;
//   position: absolute;
//   top: -1rem;
//   z-index: $header-subnavigation-z-index;
//   padding: 2.5rem 0 0.5rem 0;

//   background-color: $color-white;
//   list-style: none;

//   &:after {
//     content: "";
//     position: absolute;
//     height: 100%;
//     top: 0;
//     left: -0.5rem;
//     width: calc(100% + 1rem);
//     background-color: $color-white;
//     z-index: -1;
//     @include apply-box-shadow;
//   }
// }

// .sub-navigation-overflow-wrapper {
//   padding: 0 0.2rem;
//   overflow: auto;
//   max-height: 40vh;
// }

// .sub-navigation-item {
//   display: flex;
//   flex: 1;
//   flex-direction: column;

//   text-align: center;
//   padding: 0.5rem 0;

//   a {
//     flex: 1 1 100%;
//     margin: 0;
//     padding: 0.3rem 0.1rem;
//     min-width: 5rem;

//     @include apply-font-and-size("link", 6);
//     letter-spacing: 0.05rem;
//     font-weight: normal;
//     color: $color-darker-grey;

//     &:hover {
//       color: $color-black;
//     }

//     @include large-screens {
//       @include apply-font-and-size("link", 6);
//     }
//   }
// }
</style>
