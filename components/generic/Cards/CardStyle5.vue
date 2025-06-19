<template>
  <div class="card card-style-5">
    <div class="card__image-wrapper">
      <NuxtLink
        :to="linkTo"
        class="link-wrapper"
        rel="nofollow"
        without-styles
      >
        <span class="link-wrapper__label button">
          {{ linkToLabel }}
        </span>
      </NuxtLink>

      <Photo
        :image="image"
        class="card__image card__image--hover-link"
        withPhotoCredits
        withPhotoCreditsPosition="bottomCenter"
      />
    </div>

    <h2 class="content__title">
      <NuxtLink :to="linkTo" without-styles>{{ title }}</NuxtLink>
    </h2>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  linkTo: {
    type: [String, Object],
    default: '/'
  },
  linkToLabel: {
    type: String,
    default: 'Link to label'
  },
  image: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.card {
  width: 11rem;
  display: inline-block;
  padding: 0.5rem;
  vertical-align: top;
  position: relative;
  text-align: center;
  min-height: 14.5rem;
}

.card__image-wrapper {
  position: relative;
  background-color: $color-dark-grey;
}

.content__title {
  margin: 1rem 0 0 0;
  font-weight: 100;
  text-align: center;
  font-style: italic;
  @include apply-font-and-size("heading", 4);
}

::v-deep .card__image {
  height: 10rem;
  width: 100%;
  flex-shrink: 0;

  ::v-deep img {
    object-position: 50% 35%;
  }

  @include medium-and-large-screens {
    ::v-deep img {
      object-position: center;
    }
  }

  $image-size: 10rem;

  ::v-deep .figure {
    height: $image-size;
    width: 100%;
  }
}

@include small-and-medium-screens {
  .link-wrapper {
    display: none;
  }

  ::v-deep .figure__caption {
    z-index: 2;
    visibility: visible;
  }
}

.link-wrapper {
  display: block;
  user-select: none;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;

  &:hover {
    span {
      opacity: 1;
    }

    .card__image--hover-link {
      ::v-deep .figure__image-container:before {
        opacity: 0.9;
      }
    }

    ::v-deep & ~ .figure {
      ::v-deep .figure__caption {
        opacity: 1;
        z-index: 2;
        visibility: visible;
      }
    }
  }

  span {
    @include button;
    @include button-outline;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
    white-space: nowrap;
    z-index: 3;
  }
}

.card__image--hover-link {
  ::v-deep .figure__image-container {
    z-index: 1;

    &:before {
      transition: opacity 0.35s ease-in-out;
      display: block;
      content: "";
      background-color: rgba(255, 255, 255, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      pointer-events: none;
    }
  }
}

.card__image-wrapper:hover {
  ::v-deep .figure__image-container:before {
    opacity: 0.9 !important;
  }

  ::v-deep .figure__caption {
    opacity: 1 !important;
  }
}

::v-deep .figure__caption {
  transition: opacity 0.35s ease-in-out;
  background-color: transparent;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.2rem;
  opacity: 0;
  z-index: 2;
  visibility: visible;
  text-align: center;
}
</style>
