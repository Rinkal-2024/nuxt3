<template>
  <div class="cards">
    <slot />
  </div>
</template>

<script setup>
// No logic needed in script setup for this simple layout wrapper
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  @include medium-and-large-screens {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
