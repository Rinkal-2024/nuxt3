<template>
  <div class="form-fields">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No script logic needed for now, so this stays empty
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.form-fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: space-between;
}
</style>
