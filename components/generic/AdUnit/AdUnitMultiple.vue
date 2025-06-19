<template>
  <div class="ad-unit-multiple-container">
    <AdUnit
      v-for="ad in adSlotNames"
      :key="ad"
      :ad-slot-name="ad"
      :minHeight="minHeight"
    />
  </div>
</template>

<script setup>
import AdUnit from '~/components/generic/AdUnit/AdUnit.vue'
const props = defineProps({
  adSlotNames: {
    type: Array,
    default: () => []
  },
  minHeight: {
    type: Number,
    default: null
  }
})
</script>

<style scoped lang="scss">
.ad-unit-multiple-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
</style>
