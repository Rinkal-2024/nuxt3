<template>
  <div
    :class="['color', { '--bright': isBright, '--selected': isSelected }]"
    :style="{ backgroundColor: color.color }"
    :data-id="color.id"
    @click="emitClickEvent"
    :title="color.name"
  >
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { detectBrightColor } from '~/mixins/detectBrightColorMixin'

defineProps({
  isSelected: {
    type: Boolean,
    default: false
  },
  color: {
    type: Object,
    required: true,
    validator: (color) => ['color', 'id', 'name'].every(prop => prop in color)
  }
})

const emit = defineEmits(['click'])

const props = defineProps()

const isBright = computed(() => detectBrightColor(props.color.color))

function emitClickEvent() {
  emit('click', props.color.id)
}
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>
