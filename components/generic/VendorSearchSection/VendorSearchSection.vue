<template>
  <PageSection
    :title="title"
    :subtitle="subtitle"
    class="with-background"
    withoutTopBodyMargin
  >
    <slot />
  </PageSection>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Vendor search'
  },
  subtitle: {
    type: String,
    required: false
  }
})
</script>

<style scoped lang="scss">
// @use '~/assets/styles/partials' as *;

</style>
