<template>
  <input
    class="input"
    :class="{ 'with-error': hasError }"
    :type="type"
    :placeholder="placeholder"
    :id="id"
    :name="name"
    :disabled="disabled"
    v-model="modelValue"
    @blur="emitBlur"
  />
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: value => ['text', 'password', 'url', 'tel', 'email', 'search'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: String,
  name: String,
  modelValue: {
    type: String,
    default: ''
  },
  hasError: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

function emitBlur() {
  emit('blur')
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.input {
  @include apply-font-and-size("label", 4);
  @include medium-and-large-screens {
    @include apply-font-and-size("label", 6);
  }
  font-weight: 100;
  border: $input-border-size solid $input-border-color;
  border-radius: $input-border-radius;
  background-color: $color-white;
  color: $input-text-color;
  padding: 0 0.8rem;
  height: calc(2.5rem - #{($input-border-size * 2)});
  box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
  letter-spacing: 0.1rem;

  &.with-error {
    border: solid 1px $error-border-color;
  }

  &[disabled] {
    opacity: $disabled-element-opacity;
  }

  &::placeholder {
    color: $input-placeholder-text-color;
    text-transform: uppercase;
  }
}
</style>
