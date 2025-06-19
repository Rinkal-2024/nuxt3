<template>
  <div :class="['colors-container', { '--circular': isCircular }]">
    <template v-for="color in colors" :key="color.id">
      <ColorsSelectorColor
        v-if="!isAmp"
        :color="color"
        :isSelected="selectedColors.includes(color.id)"
        @click="emitClickEvent"
      />
      <Link v-else :to="getColorLink(color)" without-styles>
        <div
          :class="{ selected: selectedColors.includes(color.id) }"
          :style="{ backgroundColor: color.color }"
          class="color"
          @click="emitClickEvent"
        >
          {{ color.name }}
        </div>
      </Link>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ColorsSelectorColor from './ColorsSelectorColor.vue'
import Link from '~/components/Link.vue'

// Detect AMP mode — replace with your actual AMP detection logic
const isAmp = false // or import/use composable to detect AMP

const props = defineProps({
  colors: {
    type: Array,
    default: () => []
  },
  isCircular: {
    type: Boolean,
    default: false
  },
  selectedColors: {
    type: Array,
    default: () => []
  },
  ampBasePath: {
    type: String,
    default: '/weddings/search/color'
  }
})

const emit = defineEmits(['click'])

function emitClickEvent(colorId) {
  emit('click', colorId)
}

function getColorLink(color) {
  return `${props.ampBasePath}/${color.id}`
}
</script>

<style scoped lang="scss">
// Your styles here
</style>
