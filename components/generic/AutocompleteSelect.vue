<template>
  <v-select
    :options="options"
    :placeholder="placeholder"
    :value="value"
    :searchable="true"
    class="autocomplete-select"
    :class="{
      'has-value': !!value,
      'with-error': hasError,
      'transparent': transparent
    }"
    @input="onInput"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="isClearable"
    :reduce="reduceOptionValue"
  >
    <template #option="{ label }">
      <div class="wrap-option">{{ label }}</div>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number, Array, Object, null],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  isClearable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  reduceValue: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  transparent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits()

const onInput = (event: any) => {
  emit('change', event)
}

const reduceOptionValue = (option: any) => {
  return props.reduceValue ? option.value : option
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.autocomplete-select {
  min-height: 2.4rem;
  border: $input-border-size solid $input-border-color;

  ::v-deep {
    input {
      @include apply-font-and-size("label", 6);
      &::placeholder {
        @include apply-font-and-size("label", 6);
        color: $input-placeholder-text-color;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }
    }

    ul > li {
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      @include apply-font-and-size("label", 6);
    }

    .vs__search {
      padding: 10px 0.7rem;
    }

    &.has-value .vs__search {
      display: none;
    }
  }

  &.vs--disabled {
    ::v-deep .vs__dropdown-toggle {
      background-color: #f8f8f8;
    }
  }

  &.with-error {
    border-color: $error-border-color;
  }
}

.autocomplete-select ::v-deep .vs__dropdown-toggle {
  flex: 1 1 100%;
  border-radius: $input-border-radius;
  @include apply-font-and-size("label", 6);
  background-color: $color-white;
  font-weight: 100;
  height: calc(2.5rem - #{($input-border-size * 2)});
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  border: none;

  ::v-deep {
    input {
      @include apply-font-and-size("label", 7);
      letter-spacing: 0.1rem;
    }
  }

  &.disabled {
    opacity: $disabled-element-opacity;
    border-color: $input-border-disabled-color;
    box-shadow: none;
  }

  &.is-multi {
    min-height: calc(2.5rem - #{($input-border-size * 2)});
    height: auto;
  }
}

.autocomplete-select.transparent {
  border: none;
  ::v-deep .vs__dropdown-toggle {
    border-left: none;
    background-color: transparent;
  }
  ::v-deep .vs__selected {
    height: 90%;
  }
}

::v-deep .vs__open-indicator {
  width: 0;
  height: 0;
  margin-right: 1rem;
  border-left: 0.25rem solid transparent;
  border-right: 0.25rem solid transparent;
  border-top: 0.25rem solid $color-black;

  &.is-focused {
    transform: rotate(180deg);
  }
}

.wrap-option {
  white-space: break-spaces;
  margin: 2px 0;
}
</style>
