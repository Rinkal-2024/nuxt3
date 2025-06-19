<template>
  <AutocompleteSelectField
    :options="vendorCategories"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :full-width="fullWidth"
    :disabled="disabled"
    :value="value"
    @change="onChange"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Vendor'
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Object, null],
    required: true
  }
})

const emit = defineEmits(['change'])

const store = useStore()

const vendorCategories = computed(() => store.getters['api/advertise/vendorCategories'])

function onChange(event) {
  emit('change', event)
}
</script>

<style scoped>
/* No styles provided */
</style>
