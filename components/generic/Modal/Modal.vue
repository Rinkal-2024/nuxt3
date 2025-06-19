<template>
  <div>
    <div class="modal-backdrop"></div>
    <div class="modal" ref="modalContainer">
      <section class="modal-content" :class="{ flex }">
        <slot />
      </section>
      <button
        @click="onClose"
        class="modal-close-button"
        :class="{ dark: withDarkCloseButton }"
        aria-label="Close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { registerOutsideClickHandler } from '~/utils/dom'

const props = defineProps({
  withDarkCloseButton: { type: Boolean, default: false },
  flex: { type: Boolean, default: false }
})

const emit = defineEmits(['onClose'])

const modalContainer = ref<HTMLElement | null>(null)
let onDestroyHandler: (() => void) | null = null

const onClose = () => {
  emit('onClose')
}

onMounted(() => {
  if (modalContainer.value) {
    onDestroyHandler = registerOutsideClickHandler(modalContainer.value, onClose)
  }
})

onBeforeUnmount(() => {
  if (onDestroyHandler) {
    onDestroyHandler()
  }
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.modal {
  background: $color-white;
  box-shadow: 0 2px 8px $color-black-transparent;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  z-index: $modal-content-z-index;

  .modal-content,
  .modal-content > * {
    width: 100%;
    height: 100%;
  }

  .modal-content.flex {
    display: flex;
    flex-flow: row nowrap;
    img {
      width: unset;
    }
  }

  .modal-close-button {
    @include button-as-normal-text;
    padding: 0;
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
    opacity: 0.8;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    &.dark {
      padding-top: 1rem;
      &:before,
      &:after {
        background-color: $color-black;
      }
    }
  }
  .modal-close-button:hover {
    opacity: 1;
    background-color: transparent;
  }
  .modal-close-button:before,
  .modal-close-button:after {
    background-color: $color-white;
    position: absolute;
    top: 0;
    content: " ";
    height: 1rem;
    width: 0.1rem;
  }
  .modal-close-button:before {
    transform: rotate(45deg);
  }
  .modal-close-button:after {
    transform: rotate(-45deg);
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: $color-black-transparent;
  z-index: $modal-backdrop-z-index;
}
</style>
