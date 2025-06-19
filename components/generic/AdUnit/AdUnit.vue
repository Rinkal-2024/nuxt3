<template>
  <div
    :class="{ 'no-margin': noMargin, sticky }"
    class="ad-unit-container"
    :style="style"
  >
    <div v-if="!isAMP && adUnit" :data-aa-adunit="adUnit" data-aaad="true"></div>

    <amp-ad
      v-else-if="isAMP && ampAdSlotId !== null"
      :data-slot="ampAdSlot?.dataSlot"
      :rtc-config="rtcConfig"
      attr:data-force-safeframe="true"
      data-multi-size-validation="false"
      height="250"
      type="doubleclick"
      width="300"
    ></amp-ad>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNuxtApp } from '#app'
import AD_SLOTS from '~/constants/adSlots'
import AMP_AD_SLOTS from '~/constants/ampAdSlots'

const props = defineProps({
  adSlotName: {
    type: String,
    default: ''
  },
  adSlot: {
    type: String,
    default: null
  },
  noMargin: {
    type: Boolean,
    default: false
  },
  ampAdSlotId: {
    type: Number,
    default: null
  },
  minHeight: {
    type: Number,
    default: null
  },
  sticky: {
    type: Boolean,
    default: false
  }
})

const { $isAMP } = useNuxtApp()
const isAMP = $isAMP

const adUnit = computed(() => {
  return props.adSlot || AD_SLOTS[props.adSlotName]
})

const ampAdSlot = computed(() => {
  if (props.ampAdSlotId === null) return null
  return AMP_AD_SLOTS[props.ampAdSlotId]
})

const style = computed(() => {
  return props.minHeight ? `min-height: ${props.minHeight}px` : ''
})

const rtcConfig = computed(() => {
  if (!ampAdSlot.value) return null
  return {
    vendors: {
      prebidappnexus: {
        PLACEMENT_ID: ampAdSlot.value.placementId
      }
    },
    timeoutMillis: 900
  }
})
</script>

<style lang="scss" scoped>
.ad-unit-container {
  /* background-color: antiquewhite; */
  margin: 10px auto;

  &.no-margin {
    margin: 0 auto;
  }
}
</style>
