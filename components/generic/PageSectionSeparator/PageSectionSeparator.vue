<template>
  <PageLayoutMargin>
    <div class="page-section-separator">
      <Separator />
    </div>
  </PageLayoutMargin>
</template>

<script setup>
import PageLayoutMargin from '../PageLayoutMargin/PageLayoutMargin.vue';
import Separator from '../Separator/Separator.vue';

// No need for a name or export default in <script setup>
</script>

<style scoped lang="scss">
// Uncomment if needed
// @import "~/assets/styles/partials";

.page-section-separator {
  margin: 2rem 0 0 0;

  @media (min-width: 768px) {
    margin: 3rem 0 0 0;
  }
}
</style>
