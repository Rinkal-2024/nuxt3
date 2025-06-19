<template>
  <div v-show="!isMobile">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { isMobile } = useState<boolean>('global/config/isMobile')
</script>

<style scoped>
/* No styles currently */
</style>
