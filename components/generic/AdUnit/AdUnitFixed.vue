<template>
  <div class="ad-unit-fixed-container">
    <AdUnit :ad-slot="adSlot" :ad-slot-name="adSlotName" />
  </div>
</template>

<script setup>
import AdUnit from './AdUnit.vue';


const props = defineProps({
  adSlot: {
    type: String,
    default: ''
  },
  adSlotName: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.ad-unit-fixed-container {
  position: fixed;
  bottom: 0;
  height: 95px;
  z-index: 999;
}
</style>
