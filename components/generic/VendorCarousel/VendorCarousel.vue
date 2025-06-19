<template>
  <div v-if="vendors?.length" class="vendor-carousel">
    <PageSection :title="title">
      <div class="vendor-container fixed-height hide-overflow">
        <CardStyle5
          v-for="vendor in vendors"
          :key="vendor.id"
          :title="vendor.name"
          :image="vendor.main_image.image"
          :link-to="vendorProfilePath(vendor)"
          link-to-label="View vendor"
        />
      </div>
      <div class="vendor-carousel__link-container">
        <Link :to="vendorCategoryPath">
          <Button variant="primary">See more vendors</Button>
        </Link>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '~/stores/api/news' // Adjust your path accordingly

const newsStore = useNewsStore()
const { vendors } = storeToRefs(newsStore)

const vendorCategoryPath = computed(() => {
  if (vendors.value?.length) {
    return {
      name: 'vendor-search-category-categorySlug',
      params: {
        categorySlug: vendors.value[0].categories?.[0]?.slug ?? ''
      }
    }
  }
  return null
})

const title = computed(() => {
  if (vendors.value?.length) {
    return `${vendors.value[0].categories?.[0]?.name} Vendors`
  }
  return ''
})

function vendorProfilePath(vendor: any) {
  return {
    name: 'biz-slug-id',
    params: {
      slug: vendor.slug,
      id: vendor.id
    }
  }
}

// Carousel settings can be defined as refs or plain objects if used later
const carouselSettings = {
  dots: false,
  centerMode: false,
  slidesToScroll: 1,
  variableWidth: true,
  swipeToSlide: true,
  lazyLoad: null,
  infinite: true
}

const mobileCarouselSettings = {
  slidesToShow: 1,
  dots: false,
  swipeToSlide: true
}
</script>

<style scoped lang="scss">
// @use '~/assets/styles/partials' as *;

.vendor-carousel__link-container.vendor-carousel__link-container {
  margin-top: 2rem;
}

.vendor-carousel {
  &__link-container {
    margin-top: 0;
    width: 100%;
    text-align: center;

    @include small-and-medium-screens {
      margin-top: 0;
    }
  }
}

.vendor-container {
  text-align: center;
}

.fixed-height {
  height: 14.5rem;
}
</style>
