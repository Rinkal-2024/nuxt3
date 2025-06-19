<template>
  <div class="subtitle">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No logic needed for this component
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.subtitle {
  @include apply-font-and-size("heading", 9);
  font-style: italic;
  font-weight: 100;
  margin: 0.5rem 0 0 0;
  text-align: center;
  width: 100%;

  @include medium-and-large-screens {
    text-align: left;
  }
}
</style>
// This component serves as a subtitle for forms, providing a consistent style