<template>
  <section class="section">
    <NuxtLink v-if="title && typeof linkTo === 'string'" :to="linkTo">
      <component :is="titleTag" class="title">{{ title }}</component>
    </NuxtLink>

    <component v-else-if="title" :is="titleTag" class="title">{{ title }}</component>

    <component v-if="subtitle" :is="subtitleTag" class="subtitle">{{ subtitle }}</component>

    <template v-if="description">
      <HtmlView
        v-if="descriptionAsHtml"
        class="description"
        :html="parsedDescriptionHtml"
      />
      <p v-else class="description">{{ description }}</p>
    </template>

    <div class="body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { parseHtmlArray } from '~/utils/html'

const props = defineProps({
  title: {
    type: [String, Boolean],
    default: false,
  },
  subtitle: {
    type: [String, Boolean],
    default: false,
  },
  description: {
    type: [String, Boolean, Array],
    default: false,
  },
  linkTo: {
    type: String,
    default: undefined,
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
  subtitleTag: {
    type: String,
    default: 'h3',
  },
  descriptionAsHtml: {
    type: Boolean,
    default: false,
  },
})

const parsedDescriptionHtml = computed(() => {
  if (Array.isArray(props.description)) {
    return parseHtmlArray(props.description)
  }
  return props.description
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.section {
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include medium-and-large-screens {
    margin: 3rem 0 0 0;
  }

  @include small-and-medium-screens {
    .body {
      margin-top: 30px;
    }
  }

  &.topBorder {
    &::before {
      content: "";
      position: relative;
      top: 1.5rem;
      width: 100%;
      height: 1px;
      background-color: $color-light-grey;
    }
  }

  .title {
    @include apply-font-and-size("heading", 2);
    font-style: normal;
    text-align: center;
    font-weight: 100;
    @include medium-and-large-screens {
      @include apply-font-and-size("heading", 1);
    }
  }

  .subtitle {
    margin: 0.5rem 0 0 0;
    @include apply-font-and-size("heading", 3);
    font-weight: 100;
    font-style: italic;
    text-align: center;
    white-space: pre-line;
    ::v-deep p {
      @include apply-font-and-size("heading", 3);
    }
  }

  .description {
    display: block;
    margin: 1rem 0 0 0;
    @include medium-and-large-screens {
      margin: 1rem 20% 0;
      @include apply-font-and-size("heading", 4);
    }
  }

  .description,
  .description ::v-deep p {
    @include apply-font-and-size("heading", 4);
    font-weight: 100;
    text-align: center;
  }

  .description ::v-deep p:first-child {
    margin-top: 0;
  }

  .body {
    width: 100%;
    padding-top: 2rem;
  }

  .withoutVerticalMargins {
    margin-top: 0;
    margin-bottom: 0;

    .body {
      margin-top: 0;
    }
  }
}
</style>
