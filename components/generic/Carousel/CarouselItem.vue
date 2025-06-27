<template>
  <div class="carousel__container">
    <div class="container__item">
      <NuxtLink :to="to" rel="nofollow">
        <Photo
          v-if="!$isAMP"
          :image="image"
          :isSharable="isSharable"
          :lazy="lazy"
          :sizes="sizes"
          :withPhotoCreditsPosition="withPhotoCreditsPosition"
          class="item__image"
          withPhotoCredits
        />
        <AmpPhoto
          v-else
          :height="ampPhotoHeight"
          :image="image"
          class="item__image"
        />
      </NuxtLink>
      <div class="item__titles">
        <NuxtLink :to="to">
          <h2>{{ title }}</h2>
        </NuxtLink>
        <NuxtLink v-if="withSubtitle" :to="to" rel="nofollow">
          <h3>{{ subtitle }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import AmpPhoto from '~/components/amp/AmpPhoto.vue';
import Photo from '../Photo/Photo.vue';

export default {
  name: 'CarouselItem',
  props: {
    image: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    to: {
      type: String,
      required: true
    },
    isSharable: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: true
    },
    sizes: {
      type: String
    },
    withPhotoCreditsPosition: {
      type: String,
      default: 'bottomRight'
    },
    ampPhotoHeight: {
      type: Number,
      default: 320
    }
  },
  computed: {
    withSubtitle() {
      return this.subtitle !== null && this.subtitle !== ''
    }
  }
}
</script>
