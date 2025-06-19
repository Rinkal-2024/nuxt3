<template>
  <div class="form-buttons">
    <slot />
  </div>
</template>

<script setup>
// No props or logic needed
</script>

<style scoped lang="scss">
.form-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  button {
    margin: 0 0.5rem;
  }
}
</style>
