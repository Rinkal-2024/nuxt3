<template>
  <div class="loading-indicator" />
</template>

<script setup>
// No props or logic needed
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.loading-indicator,
.loading-indicator:after {
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
}

.loading-indicator {
  // margin: 10rem auto;
  font-size: 0.1rem;
  // text-indent: -9999rem;
  border: 0.1rem solid darken($color-white, 10%);
  border-left: 0.1rem solid $color-black;
  transform: translateZ(0);
  animation: spinner 1.1s infinite linear;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
