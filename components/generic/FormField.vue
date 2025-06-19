<template>
  <div
    :data-anchor-name="name"
    class="label"
    :class="{ 'full-width': fullWidth, 'with-field-error': withFieldError, 'appearance-form': appearance === 'form' }"
  >
    <NuxtLink v-if="linkTo && label" :to="linkTo">
      <label v-if="label" :for="forName" class="label-text label-text-link">
        {{ label }}
      </label>
    </NuxtLink>

    <label
      v-if="!linkTo && label"
      :for="forName"
      class="label-text"
      v-html="label"
    />

    <div class="field-component">
      <slot />
    </div>

    <FormFieldErrorMessage
      v-if="withFieldError"
      :error-message="errorMessage"
      :has-error="hasError"
    />
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: [String, Boolean],
    default: false
  },
  forName: {
    type: [String, Boolean],
    default: false
  },
  linkTo: {
    type: [String, Boolean],
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  withFieldError: {
    type: Boolean,
    default: true
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'This field is required.'
  },
  appearance: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
// Import your global mixins or utilities here if needed
// Example: @use "@/assets/styles/mixins" as *;

.label {
  display: flex;
  flex-direction: column;
  justify-items: center;

  &.full-width {
    flex-basis: 100%;
  }

  .field-component {
    margin-top: -15px;
  }

  .label-text {
    margin-left: 20px;
  }

  &.with-field-error {
    .field-component {
      margin-top: 0;
    }
  }

  &.appearance-form {
    .label-text {
      // Replace this with your own mixin or remove
      // @include apply-font-and-size("label", 6);
      font-size: 0.45rem;
    }
  }

  max-width: 100%;
  flex-grow: 0;
  flex-basis: 100%;

  @media (min-width: 768px) {
    flex-basis: calc(50% - 0.45rem);

    &.fullWidthField {
      flex-basis: 100%;
    }
  }
}

.form-field-error-message {
  flex: 0 1 auto;
}

.label-text {
  flex: 1 1;
  font-size: 0.45rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 100;
  color: $primary-text-color;
  cursor: pointer;

  .label.disabled & {
    opacity: $disabled-element-opacity;
  }

  & + .field-component {
    margin-top: 0.6rem;
  }

  margin-left: 20px !important;
}

.field-component {
  flex: 1 1 100%;
  max-width: 100%;
}

.disabled {
  cursor: not-allowed;
}
</style>
