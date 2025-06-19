<template>
  <div ref="search" class="advanced-search">
    <div class="advanced-filters__button-wrapper">
      <ToggleButton
        id="advanced-search-button"
        :isToggled="areFiltersToggled"
        @click="toggleFilters"
      >
        Advanced search
      </ToggleButton>
    </div>

    <Panel
      id="advanced-search-panel"
      :isToggled="areFiltersToggled"
    >
      <div class="fields">
        <div class="search">
          <InputField
            :placeholder="`Search in ${currentSearchCategory}`"
            name="search"
            id="advanced-search-in"
            v-model="search"
          />
          <div class="radio-buttons">
            <RadioButtonField
              v-for="radioButton in radioButtons"
              :key="radioButton.id"
              :label="radioButton.label"
              :id="radioButton.id"
              name="advanced-search-radio"
              :elValue="radioButton.id"
              radioClass="advanced-search-radio"
              v-model="currentSearchCategory"
              class="radio-button"
            />
          </div>
        </div>

        <InputField
          placeholder="Enter Zip Code, City or State"
          name="location"
          class="location"
          id="advanced-search-location"
          v-model="location"
        />
      </div>
    </Panel>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { registerOutsideClickHandler } from '~/utils/dom'
import { defineEmits } from 'vue'

const emit = defineEmits(['selectionChanged'])

const search = ref('')
const location = ref('')
const areFiltersToggled = ref(false)
const currentSearchCategory = ref('venue')

const radioButtons = [
  { label: 'Venue', id: 'venue', name: 'searchType' },
  { label: 'Couple', id: 'couple', name: 'searchType' },
  { label: 'Business', id: 'business', name: 'searchType' }
]

const searchRef = ref(null)
let destroyOutsideClickHandler = null

function toggleFilters() {
  areFiltersToggled.value = !areFiltersToggled.value
}

function emitSelectionChangedEvent() {
  const payload = {
    [currentSearchCategory.value]: search.value.replace(/ /g, '+')
  }
  if (location.value) {
    payload.location = location.value.replace(/ /g, '+')
  }
  emit('selectionChanged', payload)
}

watch([location, currentSearchCategory, search], () => {
  emitSelectionChangedEvent()
})

onMounted(() => {
  destroyOutsideClickHandler = registerOutsideClickHandler(
    searchRef.value,
    () => (areFiltersToggled.value = false)
  )
})

onBeforeUnmount(() => {
  if (destroyOutsideClickHandler) {
    destroyOutsideClickHandler()
  }
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.advanced-search {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  margin-right: 0.5rem;
}

.fields {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 0.5rem 0;
}

.search {
  display: flex;
  flex-direction: column;
  position: relative;
  flex-basis: calc(50% - 0.45rem);
  margin-top: 1rem;
}

.radio-buttons {
  display: flex;
  flex: 1;
  margin-top: 1rem;
  justify-content: flex-start;
  font-size: 13px;
  text-transform: uppercase;

  ::v-deep {
    .field-component {
      margin-top: -20px;
    }

    .label-text {
      margin-left: 30px !important;
      cursor: pointer;
      z-index: 2;
    }
  }
}

.location {
  margin-top: 1rem;
  width: 50%;
}

.error-message {
  min-height: 0;
}
</style>
