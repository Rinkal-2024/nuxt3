<template>
  <a
    target="_blank"
    rel="noopener"
    :href="href"
    :class="{ 'without-styles': withoutStyles, 'with-styles': !withoutStyles }"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string
  withoutStyles?: boolean
}>()

// no additional logic needed
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.without-styles {
  text-decoration: none;
  color: $color-black;

  &:hover {
    text-decoration: underline;
  }
}

.with-styles {
  font-weight: 100;
  color: $color-black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @include apply-font-and-size("link", 6);
  text-transform: uppercase;
}
</style>
