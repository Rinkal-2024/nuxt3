<template>
  <div class="description">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Optional: add props or logic here in <script setup> format if needed
</script>

<style scoped lang="scss">
// Ensure the SCSS partial is properly imported via nuxt.config.ts if global
// Otherwise, import here as needed

.description {
  @include apply-font-and-size("paragraph", 3);
  font-size: 0.8rem;
  font-style: normal;
  font-weight: normal;
  margin: 1rem 0 0 0;
  text-align: left;

  ul,
  ol {
    padding-left: 1rem;
  }

  p,
  li,
  ul,
  ol {
    margin: 0.5rem 0 0 0;
  }
}
</style>
