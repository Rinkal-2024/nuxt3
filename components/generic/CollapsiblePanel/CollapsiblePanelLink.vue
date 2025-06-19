<template>
  <Link
    :to="to"
    class="collapsible-panel__link"
  >
    <slot />
  </Link>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
}>()
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.link {
  @include apply-font-and-size("link", 5);
  padding: 0.4rem 0;

  @include medium-and-large-screens {
    @include apply-zero-padding-and-margin-for-first-and-last-child;
  }
}
</style>
