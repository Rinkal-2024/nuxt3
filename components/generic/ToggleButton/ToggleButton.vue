<template>
  <Button
    class="toggle-button"
    :class="{ '--toggled': isToggled }"
    @click="$emit('click')"
  >
    <slot />
    <Icon
      name="rightArrow"
      class="toggle-button__arrow"
    />
  </Button>
</template>

<script setup lang="ts">
defineProps<{
  isToggled?: boolean
}>()
</script>

<style scoped lang="scss">
// If using style-resources, ensure it's configured in nuxt.config.ts
// @use '~/assets/styles/partials' as *;

.toggle-button {
  @include button-as-normal-text;
  @include apply-font-and-size("label", 7);
  font-weight: 100;
  padding: 0 1rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  position: relative;

  .toggle-button__arrow {
    height: 0.6rem;
    width: 0.6rem;
    transform: rotate(90deg) translate(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }

  &.--toggled .toggle-button__arrow {
    transform: rotate(-90deg) translate(50%);
  }
}
</style>
