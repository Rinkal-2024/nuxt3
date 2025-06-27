HomePageNewsCarousel.vue

<template>
  <div id="news-slider" class="slider">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :style="calcStyle(index)"
      class="slide"
    >
      <NuxtLink :to="item.linkTo">
        <Photo
          :image="item.image"
          :isSharable="false"
          :lazy="index > 0"
          :sizes="sizes"
          withPhotoCredits
          withPhotoCreditsPosition="topRight"
          class="slider_image"
        />
      </NuxtLink>

      <div class="slider_titles">
        <NuxtLink :to="item.linkTo">
          <h2>{{ item.title }}</h2>
          <h3 v-if="item.subtitle">{{ item.subtitle }}</h3>
        </NuxtLink>
      </div>
    </div>

    <button class="slider-btn slider-btn-next" aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill="#ffffff"
          d="M358.57 255.99L130.96 18.03C126.9 13.77 127.05 7.02 131.3 2.95C135.53 -1.12 142.28 -0.95 146.38 3.28L381.05 248.62C384.98 252.74 384.98 259.24 381.05 263.37L146.38 508.7C144.28 510.89 141.48 511.99 138.67 511.99C136.02 511.99 133.36 511.01 131.3 509.03C127.05 504.96 126.9 498.21 130.96 493.95L358.57 255.99Z"
        />
      </svg>
    </button>

    <button class="slider-btn slider-btn-prev" aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill="#ffffff"
          d="M153.43 255.99L381.04 18.03C385.1 13.77 384.95 7.02 380.7 2.95C376.47 -1.12 369.72 -0.95 365.62 3.28L130.95 248.62C127.02 252.74 127.02 259.24 130.95 263.37L365.62 508.7C367.72 510.89 370.52 511.99 373.33 511.99C375.98 511.99 378.64 511.01 380.7 509.03C384.95 504.96 385.1 498.21 381.04 493.95L153.43 255.99Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getImageSizes } from '~/utils/imgSrcSet'
import { useHomeNewsCarouselStore } from '../../../store/home/newsCarousel'
import Photo from '~/components/generic/Photo/Photo.vue'

// Store access
const store = useHomeNewsCarouselStore()
const items = computed(() => store.items)
console.log('Carousel items:', items.value)

// Sizes for responsive image loading
const sizes = computed(() => getImageSizes(100))

// Slide transformation
const calcStyle = (index: number) => `transform: translateX(${index * 100}%)`
</script>

<style lang="scss" scoped>
</style>