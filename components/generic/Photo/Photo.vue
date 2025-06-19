<template>
  <figure class="figure" :class="`appearance-${appearance}`">
    <div
      :style="{ 'padding-bottom': placeholderPaddingBottom }"
      :class="{ 'sharable-image': isSharable }"
      class="figure__image-container js-figure-image-container"
      ref="container"
    >
      <img
        :data-srcset="dataSrcSet"
        :srcset="srcSet"
        :data-sizes="dataSizes"
        :sizes="srcSizes"
        :src="defaultSrc"
        class="image"
        :class="classList"
        :alt="image.alt"
        :title="image.title"
        :data-parent-fit="objectFit"
        data-parent-container=".figure__image-container"
        :data-pin-media="dataPinMedia"
        :data-pin-nopin="noPin"
        :loading="loadingProp"
      />
    </div>
    <figcaption
      v-if="showFigCaption"
      class="figure__caption"
      :class="withPhotoCreditsPosition"
    >
      <i class="js-figure-image-caption">Photo: {{ image.photographed_by }}</i>
    </figcaption>
  </figure>
</template>

<script setup>
import { ref, computed } from 'vue'
import IMAGE_SIZES from '~/constants/imageSizes'
import { getImageSrcSet } from '~/utils/imgSrcSet'

const props = defineProps({
  image: {
    type: Object,
    required: true
  },
  withRelativeHeight: {
    type: Boolean,
    default: false
  },
  withObjectFitContain: {
    type: Boolean,
    default: false
  },
  withPhotoCreditsPosition: {
    type: String,
    default: 'topRight',
    validator: (value) =>
      ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottomCenter', 'below'].includes(
        value
      )
  },
  socialShareButtonClassName: {
    type: String,
    default: ''
  },
  withPhotoCredits: {
    type: Boolean,
    default: false
  },
  isSharable: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: true
  },
  appearance: {
    type: String,
    default: ''
  },
  singleUrl: {
    type: String,
    default: ''
  },
  noPin: {
    type: Boolean,
    default: false
  },
  sizes: {
    type: String,
    default: 'auto'
  },
  fixedHeight: {
    type: Number,
    default: 0
  }
})

const container = ref(null)

const defaultSrc = ref(
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
)

const placeholderPaddingBottom = computed(() => {
  const original = props.image.original
  return props.withRelativeHeight
    ? `${(original.height / original.width) * 100}%`
    : 'inherit'
})

const objectFit = computed(() => (props.withObjectFitContain ? 'contain' : 'cover'))

const showFigCaption = computed(() => props.withPhotoCredits && props.image.photographed_by)

const dataSrc = computed(() => getImageSrcSet(props.image, props.fixedHeight))

const dataSrcSet = computed(() => (props.lazy ? dataSrc.value : null))

const srcSet = computed(() => (props.lazy ? null : dataSrc.value))

const dataSizes = computed(() => (props.lazy ? props.sizes : null))

const srcSizes = computed(() => (props.lazy ? null : props.sizes))

const classList = computed(() => {
  const lazyClass = props.lazy ? 'lazyload' : ''
  return `${objectFit.value} ${lazyClass}`
})

const loadingProp = computed(() => (props.lazy ? 'lazy' : 'eager'))

const dataPinMedia = computed(() => {
  return (
    props.image.original?.url.replace('media-staging', 'media2') || defaultSrc.value
  )
})

const url = computed(() => {
  return typeof window !== 'undefined'
    ? props.singleUrl || `https://insideweddings.com/inspiration/photo/${props.image.id}`
    : ''
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.figure {
  display: flex;
  flex-direction: column;

  .figure__caption {
    display: block;
    margin: 0.25rem 0 0 0;
    opacity: 0;
    text-transform: capitalize;
    font-size: 10px !important;

    &.topLeft,
    &.topRight,
    &.bottomLeft,
    &.bottomRight,
    &.bottomCenter {
      position: absolute;
      color: $color-white;
      text-shadow: 0 0 4px $color-black;
      font-style: italic;
      padding: 0 0 0.3rem 0;
      font-weight: bold;
      @include apply-font-and-size("paragraph", 5);
    }

    &.topLeft,
    &.topRight,
    &.bottomLeft,
    &.bottomRight {
      max-width: 75%;
    }

    &.below {
      @include apply-font-and-size("label-decorative", 5);
      position: absolute;
      padding: 0.2rem 0.5rem;

      @include medium-and-large-screens {
        @include apply-font-and-size("label-decorative", 7);
      }
    }

    &.topLeft {
      top: 0.2rem;
      left: 0.6rem;
      text-align: left;
    }

    &.topRight {
      top: 0.2rem;
      right: 0.6rem;
      text-align: right;
    }

    &.bottomLeft {
      bottom: 0.2rem;
      left: 0.6rem;
      text-align: left;
    }

    &.bottomRight {
      bottom: 0.2rem;
      right: 0.6rem;
      text-align: right;
    }

    &.bottomCenter {
      bottom: 0.2rem;
      text-align: center;
      padding: 0 5px;
      width: 100%;
    }

    &.below {
      display: block;
      opacity: 1;
      position: relative;
      padding: 0.2rem 0;
      font-size: 0.7rem !important;
    }
  }

  &:active,
  &:hover {
    .figure__caption {
      opacity: 1;
    }
  }
}

.figure__image-container {
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;

  .contain {
    object-fit: contain;
  }

  .cover {
    object-fit: cover;
  }
}

.image {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-position: 50% 40%;
}

.appearance-static {
  position: static;

  img {
    position: static;
  }
}
</style>
