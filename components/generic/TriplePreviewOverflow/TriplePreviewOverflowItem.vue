<template>
  <div
    :class="{ 'with-hover-call-to-action': withHoverCallToAction }"
    class="card triple-preview-overflow-item"
  >
    <NuxtLink :to="linkTo" rel="nofollow" custom>
      <template #default="{ navigate, href, isActive, isExactActive }">
        <a :href="href" @click="navigate" rel="nofollow" class="link-no-style">
          <Photo
            v-if="!isAmp"
            :image="image"
            class="card__image"
            withPhotoCredits
            withPhotoCreditsPosition="topRight"
          />
          <AmpPhoto v-else :height="200" :image="image" class="card__image" />
        </a>
      </template>
    </NuxtLink>

    <div class="card__content">
      <h2 class="content__title">
        <NuxtLink :to="linkTo" custom>
          <template #default="{ navigate, href }">
            <a :href="href" @click="navigate" class="link-no-style">{{ title }}</a>
          </template>
        </NuxtLink>
      </h2>

      <template v-if="category">
        <NuxtLink
          v-if="categoryLinkTo"
          :to="categoryLinkTo"
          custom
          class="content__category-link"
        >
          <template #default="{ navigate, href }">
            <a :href="href" @click="navigate" class="content__category">
              {{ category }}
            </a>
          </template>
        </NuxtLink>
        <span v-else class="content__category">{{ category }}</span>
      </template>

      <p v-if="description">
        <NuxtLink
          v-if="linkDescription"
          :to="linkTo"
          custom
          class="content__description-link"
        >
          <template #default="{ navigate, href }">
            <a :href="href" @click="navigate" rel="nofollow" class="content__description">
              {{ description }}
            </a>
          </template>
        </NuxtLink>
        <span v-else class="content__description">{{ description }}</span>
      </p>

      <NuxtLink
        v-if="!withoutCallToAction"
        :to="linkTo"
        class="content__link desktop"
        rel="nofollow"
        custom
      >
        <template #default="{ navigate, href }">
          <a :href="href" @click="navigate"><span>{{ linkTitle }}</span></a>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import Photo from '../Photo/Photo.vue'
import AmpPhoto from '~/components/amp/AmpPhoto.vue'

// Props
defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: [String, Boolean],
    default: false
  },
  description: {
    type: [String, Boolean],
    default: false
  },
  linkTo: {
    type: [String, Object],
    default: '/'
  },
  categoryLinkTo: {
    type: [String, Object],
    default: ''
  },
  image: {
    type: Object,
    required: true
  },
  withoutCallToAction: {
    type: Boolean,
    default: false
  },
  linkTitle: {
    type: String,
    default: 'See more'
  },
  withHoverCallToAction: {
    type: Boolean,
    default: false
  },
  withLinkAsButton: {
    type: Boolean,
    default: false
  },
  linkDescription: {
    type: Boolean,
    default: false
  }
})

const { $isAMP } = useNuxtApp()
const isAmp = ref($isAMP)
</script>

<style scoped lang="scss">
</style>
