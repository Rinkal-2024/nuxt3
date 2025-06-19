<template>
  <div class="colors-selector">
    <div class="title">
      BY COLOR
    </div>

    <ColorsSelectorColors
      :base-path="basePath"
      :colors="colors"
      :isCircular="isCircular"
      :selectedColors="selectedColors"
      @click="toggleColor"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '~/store' // adjust path if needed
import ColorsSelectorColors from '~/components/ColorsSelectorColors.vue' // adjust path if needed

// Props definition
const props = defineProps({
  colors: {
    type: Array,
    default: () => []
  },
  isCircular: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: '/weddings/search/color'
  }
})

// Emits
const emit = defineEmits(['colorsSelectionChanged'])

// Reactive data
const selectedColors = ref([])

// Nuxt 3 composables for route and store
const route = useRoute()
const store = useStore()

// Restore selection from query or store or params
function restoreSelectionFromQuery() {
  let selection = (
    route.query.colors ||
    store.getters['global/config/colorIdSelected'] ||
    route.params?.colorId ||
    []
  )

  if (!Array.isArray(selection)) {
    selection = [selection]
  }

  selectedColors.value = selection
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
}

// Toggle color selection
function toggleColor(colorId) {
  const index = selectedColors.value.findIndex(x => x === colorId)
  if (index < 0) {
    selectedColors.value.push(colorId)
  } else {
    selectedColors.value.splice(index, 1)
  }
}

// Watch selectedColors to emit event on changes
watch(selectedColors, (newVal) => {
  emit('colorsSelectionChanged', newVal)
})

onMounted(() => {
  restoreSelectionFromQuery()
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.colors-selector {
  display: flex;
  justify-items: center;
  flex-direction: column;
  flex-wrap: nowrap !important;

  @include medium-and-large-screens {
    flex-direction: row;
    align-items: center;
  }

  ::v-deep .color {
    margin: 1rem 0;
    flex: 0 1 auto;
    height: 1.5rem;
    width: 5rem;

    @include medium-and-large-screens {
      margin: 0;
      height: 1rem;
      width: 1.5rem;
    }
  }

  ::v-deep .colors {
    flex: 1 1 100%;
    margin-top: 1rem;
    flex-direction: column;

    @include medium-and-large-screens {
      flex-direction: row;
      flex: 0 0 auto;
      margin-top: 0;
    }
  }

  @include medium-and-large-screens {
    margin: 0 1rem 0 0;
  }

  .title {
    @include apply-font-and-size("label", 7);
    font-weight: 100;
    white-space: nowrap;
    margin-right: 0.5rem;
    letter-spacing: 0.05rem;

    @include medium-and-large-screens {
      display: flex;
    }
  }
}
</style>
