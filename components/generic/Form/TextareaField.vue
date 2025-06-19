<template>
  <FormField :name="name" :label="label" :full-width="fullWidth" with-field-error :has-error="hasError">
    <Textarea
      :aria-label="ariaText"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      :has-error="hasError"
      v-model="modelValue"
      @blur="onBlur"
      :placeholder="placeholder"
    />
  </FormField>
</template>

<script setup lang="ts">
// Define props, including modelValue for v-model support
const props = defineProps({
  name: { type: String, required: true },
  id: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  fullWidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hasError: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },  // for v-model
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  ariaText: { type: String, default: '' }
})

// Declare emitted events
const emit = defineEmits(['update:modelValue', 'blur'])

// Proxy v-model update event
function onChange(value: string) {
  emit('update:modelValue', value)
}

// Emit blur event
function onBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<style scoped>
/* no styles provided */
</style>
