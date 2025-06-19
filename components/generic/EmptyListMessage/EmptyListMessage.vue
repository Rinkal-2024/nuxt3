<template>
  <PageLayoutMargin>
    <div class="empty-list-message">
      <slot />
    </div>
  </PageLayoutMargin>
</template>

<script setup>
// No logic needed — this is a simple layout wrapper
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.empty-list-message {
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10rem 0;
  @include apply-font-and-size("label", 3);
}
</style>
