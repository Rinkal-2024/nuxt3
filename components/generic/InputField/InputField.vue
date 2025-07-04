<template>
  <FormField
    :name="name"
    :forName="id"
    :fullWidth="fullWidth"
    :withFieldError="withFieldError"
    :error-message="errorMessage"
    :has-error="hasError"
  >
    <Input
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      v-model="model"
      :has-error="hasError"
      :disabled="disabled"
      @blur="emitBlur"
    />
  </FormField>
</template>

<script setup>
import { ref, watch } from 'vue'
import Input from '../Input/Input.vue'
import FormField from '../FormField.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  withFieldError: {
    type: Boolean,
    default: true
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'This field is required.'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'search'
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'blur'])

const model = ref(props.value)

watch(() => props.value, (newVal) => {
  model.value = newVal
})

watch(model, (newVal) => {
  emit('update:value', newVal)
})

function emitBlur() {
  emit('blur')
}
</script>

<style scoped>
</style>
