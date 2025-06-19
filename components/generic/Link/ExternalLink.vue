<template>
  <a
    :class="{ 'without-styles': withoutStyles, 'with-styles': !withoutStyles }"
    :href="to"
    rel="noopener"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  to: string | Record<string, any>
  withoutStyles?: boolean
}>()
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
