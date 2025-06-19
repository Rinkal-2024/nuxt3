<template>
  <div class="form-field-error-message">
    <span class="input-error-msg" :class="{ hidden: !hasError }">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasError?: boolean
  errorMessage: string
}>()
</script>

<style scoped lang="scss">
// Ensure your mixin and variables are available globally or imported here
// @import "~/assets/styles/partials";

.form-field-error-message {
  @include apply-font-and-size("label", 7);
  font-weight: 100;
  margin: 0;
  min-height: 1.75rem;
  width: 100%;
  color: $error-text-color;
}

.input-error-msg.hidden {
  display: none;
}
</style>
