<template>
  <hr class="separator" />
</template>

<script setup>
defineOptions({
  name: 'Separator'
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.separator {
  margin: 0;
  width: 100%;
  border: none;
  border-top: $border-width solid $color-grey;
}
</style>
