<template>
  <div class="page-layout-margin">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No script logic needed for this simple wrapper component
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

// .page-layout-margin {
//   width: 100%;
//   max-width: $page-layout-max-width;
//   margin-right: auto;
//   margin-left: auto;
//   padding-left: $mobile-page-layout-horizontal-margin;
//   padding-right: $mobile-page-layout-horizontal-margin;

//   @include medium-and-large-screens {
//     padding-left: $page-layout-horizontal-margin;
//     padding-right: $page-layout-horizontal-margin;
//   }
// }
</style>
