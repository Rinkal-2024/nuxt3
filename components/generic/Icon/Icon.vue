<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    noloading
  />
</template>

<script setup>
import { computed } from 'vue'
import icons from '~/assets/icons'

// Define props with validation
const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: (value) => typeof icons[value] !== 'undefined'
  },
  isLight: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: '25px'
  },
  height: {
    type: [String, Number],
    default: '25px'
  }
})

// Computed parsedName with suffix if isLight is true
const parsedName = computed(() => props.name + (props.isLight ? 'Light' : ''))

// Computed src from icons map
const src = computed(() => icons[parsedName.value])

// Computed alt text
const alt = computed(() => `${props.name} icon`)
</script>

<style scoped>
</style>
