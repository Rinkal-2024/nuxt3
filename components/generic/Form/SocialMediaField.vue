<template>
  <div class="social-input">
    <div class="social-icon-wrapper">
      <Icon
        class="social-icon"
        v-if="iconName"
        :name="iconName"
      />
    </div>

    <AutocompleteSelectField
      class="autocomplete-select-field"
      :options="socialPlatformOptions"
      v-model="innerValue.platform"
      reduce-value
      transparent
      @change="emitChange"
    />

    <InputField
      type="url"
      class="input-field"
      v-model="innerValue.url"
      @input="emitChange"
      :has-error="hasError"
      :error-message="errorMessage"
    />

    <button
      type="button"
      @click="emit('remove')"
      class="remove-button-icon"
      title="Delete this social"
      aria-label="Delete social"
    >
      <Icon name="trash" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import socialPlatforms from '~/constants/socialPlatforms'

const props = defineProps<{
  value: {
    platform: string
    url: string
  }
  hasError?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'change', value: { platform: string; url: string }): void
  (e: 'remove'): void
}>()

// Reactive local copy of the prop
const innerValue = ref({ ...props.value })

// Keep innerValue in sync with external prop updates
watch(
  () => props.value,
  newVal => {
    innerValue.value = { ...newVal }
  },
  { deep: true, immediate: true }
)

// Emit change when local model updates
const emitChange = () => {
  emit('change', innerValue.value)
}

// Computed: convert constant to select options
const socialPlatformOptions = computed(() =>
  Object.keys(socialPlatforms).map(key => ({
    label: socialPlatforms[key].label,
    value: socialPlatforms[key].value
  }))
)

// Computed: get icon name for current platform
const iconName = computed(() =>
  socialPlatforms[innerValue.value.platform]?.iconName || ''
)
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.social-input {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
}

.autocomplete-select-field {
  flex: 0 1 50%;
  padding-left: 42px;

  @include medium-and-large-screens {
    flex: 0 1 25%;
  }

  ::v-deep {
    .vs__dropdown-toggle.vs__dropdown-toggle {
      border: none;
      font-size: 10px;
    }
  }
}

.input-field {
  flex: 1 1;
  z-index: $social-input-url-z-index;
}

$social-icon-size: 1.6rem;
.social-icon-wrapper {
  display: flex;
  align-items: center;
  padding: 0 0 0 0.25rem;
  height: 2.4rem;
  border: $input-border-size solid $input-border-color;
  background-color: $color-darker-white;
  box-shadow: inset 0 0 0.1rem $color-darker-white, 0 0 0.1rem $color-darker-white;
  border-right: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 242px;

  .social-icon {
    width: $social-icon-size;
    height: $social-icon-size;
    padding: 0.25rem;
  }
}

.remove-button-icon {
  @include button-as-normal-text;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  height: 2rem;
  line-height: 0;
  background-color: $color-white;
  position: absolute;
  padding: 0 0.25rem;
  right: 0.2rem;
  z-index: $social-input-remove-button-z-index;
  outline: none;

  &:hover {
    background-color: $color-white;
  }

  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: $color-dark-grey;
    transition: fill 0.1s ease-in-out;
  }

  &:hover svg {
    fill: $color-black;
  }
}
</style>
