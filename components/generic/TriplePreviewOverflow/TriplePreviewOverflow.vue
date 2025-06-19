<template>
  <Cards class="cards triple-preview-overflow">
    <slot />
  </Cards>
</template>

<script setup lang="ts">
// No props or logic needed here, script setup is minimal
</script>

<style lang="scss" scoped>
// If you're using Nuxt 3 + style-resources, make sure your mixins are auto-included
// @use '~/assets/styles/partials' as *;

.cards {
  @include medium-and-large-screens {
    margin-top: 1rem;
  }
}

/* Scoped deep selector syntax for Vue 3 */
:deep(.card) {
  margin-top: 1rem;

  &:hover {
    .content {
      top: -1rem;
    }
  }
}
</style>
