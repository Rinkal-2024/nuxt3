<template>
  <div v-show="isMobile">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/stores/config'

const configStore = useConfigStore()
const isMobile = computed(() => configStore.isMobile)
</script>

<style scoped>
</style>
