<template>
  <div>
    <div
      class="menu-dropdown"
      :class="{ visible }"
    >
      <button
        class="menu-trigger link"
        ref="menuTrigger"
        @click="toggleDropdownVisibility"
        @mouseenter="onDropdownMouseEnter"
        @mouseleave="onDropdownMouseLeave"
        aria-label="Menu dropdown trigger"
        aria-haspopup="true"
      >
        <slot />
      </button>
      <ul
        class="menu-items"
        :class="{ isTop }"
        aria-label="submenu"
        @mouseenter="onDropdownMouseEnter"
        @click="() => setDropdownVisibility(false)"
        @mouseleave="onDropdownMouseLeave"
      >
        <slot name="items" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

defineProps({
  isTop: {
    type: Boolean,
    default: false
  }
})

const visible = ref(false)
let dropdownTimeout = null

function setDropdownVisibility(val) {
  visible.value = val
}

function toggleDropdownVisibility() {
  setDropdownVisibility(!visible.value)
}

function onDropdownMouseEnter() {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout)
    dropdownTimeout = null
  }
  setDropdownVisibility(true)
}

function onDropdownMouseLeave() {
  dropdownTimeout = setTimeout(() => setDropdownVisibility(false), 1000)
}

onBeforeUnmount(() => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout)
  }
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.menu-dropdown {
  position: relative;
  line-height: 0;

  .menu-items {
    display: none;
  }

  &.visible .menu-items {
    display: flex;
  }
}

.menu-items {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  position: absolute;

  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  background-color: $color-white;
  border: solid $border-width $color-grey;

  @include small-and-medium-screens {
    &.isTop.isTop {
      top: -100px;
    }
  }

  &.isTop {
    top: -130px;
  }
}

.menu-trigger {
  @include button-as-normal-text();
  @include apply-font-and-size("link", 5);
  font-weight: 100;
  text-transform: uppercase;
}

.link {
  font-weight: 100;
  color: $color-black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @include apply-font-and-size("link", 6);
  text-transform: uppercase;
}
</style>
