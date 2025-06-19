<template>
  <input
    type="radio"
    :class="['radio-button', radioClass]"
    :id="id"
    :name="name"
    :value="elValue"
    :disabled="disabled"
    v-model="scopedValue"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: [String, Boolean],
    default: false
  },
  id: {
    type: String
  },
  elValue: {
    type: String,
    default: null
  },
  value: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  linkTo: {
    type: [String, Boolean],
    default: false
  },
  radioClass: {
    type: String,
    default: 'radbut'
  }
})

const emit = defineEmits(['input'])

const scopedValue = ref(props.value)

// Keep `scopedValue` synced with `value` prop
watch(
  () => props.value,
  (newVal) => {
    if (scopedValue.value !== newVal) {
      scopedValue.value = newVal
    }
  },
  { immediate: true }
)

// Emit 'input' when `scopedValue` changes
watch(scopedValue, (val) => {
  emit('input', val)
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.radio-button {
  &[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    flex: 0 0 auto;
    width: 0.9rem;
    height: 0.9rem;
    margin: 0 0.5rem 0 0;
    border: $border-width solid $input-border-color;
    box-shadow: inset 0 0 0.1rem $color-darker-white, 0 0 0.1rem $color-darker-white;
    background-color: $color-white;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    background-image: url('~assets/icons/tick.svg');

    &:checked {
      border-color: $color-black;
      background-color: $color-black;
      background-size: 0.5rem 0.5rem;
      background-position: center;
      background-repeat: no-repeat;
    }

    &.withError {
      border: solid $border-width $color-red;
    }

    &[disabled] {
      opacity: $disabled-element-opacity;
    }
  }
}
</style>
