<template>
  <Button
    @click="emitClick"
    class="remove-field-input-button"
  >
    <Icon name="trash" class="trash-can" />
  </Button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

const emitClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.remove-field-input-button {
  @include button-as-normal-text;
  align-self: flex-end;
  margin: 0 0 0.6rem 0;
  line-height: 0;
  outline: none;

  svg {
    transition: fill 0.2s ease-in-out;
    fill: $input-border-color;

    &:hover {
      fill: $color-black;
    }
  }
}
</style>
