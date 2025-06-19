<template>
  <Button
    class="button"
    :class="{ 'with-error': isDisabled }"
    @click="emitClick"
    :disabled="isDisabled"
  >
    <LoadingIndicator v-if="isLoading" />
    <slot v-else>Submit</slot>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isLoading?: boolean
  errors?: unknown[]
}>()

const emit = defineEmits(['click'])

const isDisabled = computed(() => {
  return (props.errors?.length ?? 0) > 0 || props.isLoading
})

const emitClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.loading-indicator {
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
}

.button {
  min-width: 105px;

  &:hover {
    background-color: $color-black;
    color: $color-white;
  }

  &.with-error {
    &[disabled],
    &[disabled]:hover {
      background-color: $color-red;
      color: $color-white;
      opacity: 0.75;
      text-decoration: none;
      border-color: $color-red;
    }
  }
}
</style>
