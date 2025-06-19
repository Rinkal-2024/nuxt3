<template>
  <div class="card-style-4">
    <img
      v-if="isTopLevel"
      :alt="`${title} - top level badge`"
      class="top-level-badge"
      src="~/assets/images/shared/topLevelBadge.svg"
    />

    <template v-if="image">
      <Photo
        v-if="!nuxtApp.$isAMP"
        :image="image"
        :withPhotoCreditsPosition="withPhotoCreditsPosition"
        withPhotoCredits
      />
      <AmpPhoto
        v-else
        :height="ampPhotoHeight"
        :image="image"
      />
    </template>

    <h2 class="title">
      <NuxtLink
        :rel="noFollow ? 'nofollow' : undefined"
        :to="linkTo"
        class="title__link js-card-style-4-link-title"
        without-styles
      >
        {{ title }}
      </NuxtLink>
    </h2>

    <div class="vendor-meta">
      <Category class="category-link categories js-card-style-4-category">
        {{ category }}
      </Category>
      <Label v-if="location" class="location">
        {{ location }}
      </Label>
    </div>

    <div class="description card-style-4__description">
      {{ truncateDescription ? truncatedDescription : description }}
    </div>

    <div class="slot-container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  categories: { type: Array, default: () => [] },
  linkTo: { type: [String, Object], default: '/' },
  image: { type: Object, required: true },
  withLinkButton: { type: Boolean, default: false },
  withPhotoCreditsPosition: { type: String, default: 'bottomRight' },
  isTopLevel: { type: Boolean, default: false },
  location: { type: String, default: '' },
  description: { type: String, default: '' },
  noFollow: { type: Boolean, default: false },
  truncateDescription: { type: Boolean, default: true },
  ampPhotoHeight: { type: Number, default: 160 }
})

const nuxtApp = useNuxtApp()

const category = computed(() => props.categories[0]?.name ?? '')

const truncatedDescription = computed(() => {
  const max = 95
  return props.description.length > max
    ? props.description.slice(0, max) + '...'
    : props.description
})
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.top-level-badge {
  position: absolute;
  z-index: $top-paid-badge-z-index;
  top: -2.15rem;
  left: 50%;
  transform: translateX(-50%);
}

.card-style-4 {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 2rem 0 0 0;
  min-width: 8rem;

  a {
    margin: 0;
  }

  .category-link {
    color: $color-darker-grey;
    @include apply-font-and-size("label", 6);
    @include medium-and-large-screens {
      @include apply-font-and-size("label", 13);
    }
  }

  ::v-deep .image {
    width: 100% !important;
    position: inherit;
    display: initial;
    top: initial;
    left: initial;
    height: 15rem;

    @include medium-and-large-screens {
      height: 15rem;
    }

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
    }
  }
}

.image {
  height: 15rem;
  width: 100%;

  @include medium-and-large-screens {
    height: 15rem;
  }

  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
  }
}

.title {
  margin: -1rem 0 0 0;
  padding-top: 1rem;
  font-style: normal;
  font-weight: 500;
  @include apply-font-and-size("heading", 3);
  text-align: center;

  @include medium-and-large-screens {
    text-align: left;
    @include apply-font-and-size("heading", 9);
  }

  .title__link {
    &:after {
      $button-height-offset: 40px;
      position: absolute;
      height: calc(100% - #{$button-height-offset});
      width: 100%;
      content: "";
      top: 0;
      left: 0;
    }
  }
}

.vendor-meta {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @include medium-and-large-screens {
    align-items: flex-start;
    text-align: left;
  }
}

.description {
  margin-top: 0.75rem;
  @include apply-font-and-size("paragraph", 5);
  font-size: 0.95rem !important;
  line-height: 1.55rem;
  -webkit-font-smoothing: antialiased;
  color: #222;

  @include medium-and-large-screens {
    @include apply-font-and-size("paragraph", 5);
    font-size: 0.75rem !important;
    line-height: 1.25rem;
  }
}

.slot-container {
  z-index: 2;
  margin-top: 1rem;
}
</style>
