<template>
  <textarea
    class="textarea"
    :class="{ 'with-error': hasError }"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :disabled="disabled"
    v-model="modelValue"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
// Define props with types
const props = defineProps({
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' }, // use modelValue as the v-model prop
  id: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  hasError: { type: Boolean, default: false },
  errorMessage: { type: String, default: 'This field is required.' }
})

// Define emits for v-model and blur event
const emit = defineEmits(['update:modelValue', 'blur'])

// Handle v-model update
function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<style scoped lang="scss">
// Your styles unchanged
.textarea {
  @include apply-font-and-size("label", 6);
  display: block;
  letter-spacing: 0.05rem;
  font-weight: 100;
  width: 100%;
  height: 5rem;
  border: 1px solid $input-border-color;
  border-radius: $input-border-radius;
  background-color: $input-background-color;
  padding: 0.5rem 0.8rem;
  box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;

  &.with-error {
    border: solid 1px $error-border-color;
  }

  &[disabled] {
    opacity: $disabled-element-opacity;
  }
}
</style>
