<template>
  <div class="title">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props or logic needed, so script block is empty
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.title {
  @include apply-font-and-size("heading", 1);
  font-style: normal;
  font-weight: normal;
  margin: 3rem 0 0 0;
  text-align: center;
  width: 100%;

  @include medium-and-large-screens {
    text-align: left;
  }
}
</style>
