<template>
  <div class="array-field">
    <RemoveFieldInputButton
      class="remove-vendor"
      v-if="withRemoveFieldInputButton"
      @click="emitRemove"
    />
    <div class="fields" :class="{ 'full-width': fullWidth }">
      <slot />
    </div>
  </div>
</template>

<script setup>
import RemoveFieldInputButton from '~/components/RemoveFieldInputButton.vue'

// Define props
const props = defineProps({
  withRemoveFieldInputButton: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

// Define emits
const emit = defineEmits(['remove'])

// Method to emit 'remove' event
function emitRemove() {
  emit('remove')
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.array-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 100%;
}

.fields {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 100%;

  & + & {
    margin-top: 1rem;
  }

  &:not(.full-width) {
    @include medium-and-large-screens {
      justify-content: space-between;
      & > * {
        flex-basis: calc(50% - 0.45rem);
      }
    }
  }
}
</style>
