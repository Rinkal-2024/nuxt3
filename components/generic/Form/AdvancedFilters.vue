<template>
  <div ref="filters" class="advanced-filters">
    <div class="advanced-filters__button-wrapper">
      <ToggleButton
        id="advanced-filters-button"
        :isToggled="areFiltersToggled"
        @click="toggleFilters"
      >
        Advanced filters
      </ToggleButton>
    </div>

    <Panel
      id="advanced-filters-panel"
      :isToggled="areFiltersToggled"
    >
      <div class="filters">
        <div
          v-for="section in sections"
          :key="section.label"
          class="filter-section"
        >
          <div class="section-name">{{ section.label }}</div>

          <div
            v-for="filter in section.filters"
            :key="FILTERS[filter].queryKey"
            class="filter"
          >
            <CheckboxField
              checkBoxClass="advanced-filters-checkbox"
              :name="`${section.index}.${FILTERS[filter].queryKey}`"
              :label="FILTERS[filter].label"
              :linkTo="{
                name: 'weddings-search-category-categoryType-categoryId',
                params: {
                  categoryType: FILTERS[filter].sectionQueryKey,
                  categoryId: FILTERS[filter].queryKey
                }
              }"
              v-model="selection[FILTERS[filter].sectionQueryKey][FILTERS[filter].queryKey]"
            />
          </div>
        </div>

        <Button
          id="advanced-filters-clear-all"
          @click="clearModel"
          class="clear-all-button"
        >
          Clear all
        </Button>
      </div>
    </Panel>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FILTERS, SECTION_LABELS } from '~/constants/weddingsFilters'
import { registerOutsideClickHandler } from '~/utils/dom'
import { forEachInObject } from '~/utils/object'

const filters = ref(null)
const areFiltersToggled = ref(false)
const route = useRoute()

// Prepare sections array from SECTION_LABELS and FILTERS
const sections = Object.keys(SECTION_LABELS).map(index => ({
  index,
  label: SECTION_LABELS[index],
  filters: Object.keys(FILTERS).filter(filter => FILTERS[filter].sectionQueryKey === index)
}))

const selection = reactive({})

// Initialize selection model
function prepareModel() {
  for (const section of sections) {
    for (const filter of section.filters) {
      if (!selection[FILTERS[filter].sectionQueryKey]) {
        selection[FILTERS[filter].sectionQueryKey] = {}
      }
      selection[FILTERS[filter].sectionQueryKey][FILTERS[filter].queryKey] = false
    }
  }
}

// Clear all selections
function clearModel() {
  forEachInObject(selection, () => false, true)
}

// Restore selection from route query params
function restoreModelFromQuery() {
  const rawQuery = route.query
  let params = []

  for (const param in rawQuery) {
    if (['colors', 'venue', 'business', 'couple', 'location'].includes(param)) {
      continue
    }
    params = [...params, rawQuery[param]]
  }

  forEachInObject(
    selection,
    (value, key) => params.flat().includes(key),
    true
  )
}

// Toggle filters panel open/close
function toggleFilters() {
  areFiltersToggled.value = !areFiltersToggled.value
}

// Watch selection to emit event on change
watch(selection, () => {
  // Emit event for parent component — use 'emits' with <script setup>
  emit('selectionChanged', selection)
}, { deep: true })

// Watch route changes to restore selection
watch(() => route.fullPath, () => {
  restoreModelFromQuery()
})

// Set up outside click handler and initial state on mount
onMounted(() => {
  registerOutsideClickHandler(filters.value, () => {
    areFiltersToggled.value = false
  })
  prepareModel()
  restoreModelFromQuery()
})

// Emit definition for event
const emit = defineEmits(['selectionChanged'])
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.advanced-filters {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  border-right: $input-border-size solid $input-border-color;

  .advanced-filters__button-wrapper {
    padding-right: 1rem;
    display: flex;
  }
}

.advanced-filters {
  .filters {
    display: flex;
    justify-content: space-between;

    .button-wrapper {
      position: relative;
      padding-right: 1rem;

      &:after {
        content: "";
        width: $input-border-size;
        right: 0;
        height: 2rem;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        background-color: $color-grey;
        outline: none;
      }
    }

    .panel {
      position: absolute;
      top: calc(100% + 1px);
      padding-bottom: 1rem;
      background-color: $color-white;
      z-index: 1;
      width: 100%;
      left: 0;
      box-shadow: 0 4px 15px -13px $box-shadow-color;
    }

    .filter-section {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .section-name {
      margin: 1rem 0 0.5rem 0;
      width: 100%;
      @include apply-font-and-size("label", 13);
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      font-weight: 100;
    }

    .filter {
      width: 100%;
      margin-top: 0.5rem;

      ::v-deep .checkbox {
        height: 0.65rem;
        width: 0.65rem;

        &:checked {
          background-size: 0.4rem;
        }
      }
    }

    ::v-deep .label {
      @include apply-font-and-size("label", 13);
      font-weight: bold;
      letter-spacing: 0.05rem;
    }

    .error-message {
      min-height: 0;
    }

    .clear-all-button {
      @include button-as-normal-text;
      @include apply-font-and-size("label", 13);
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      color: $color-darker-grey;
      align-self: flex-start;
      margin-top: 1rem;
    }
  }
}
</style>
