<template>
  <textarea
      class="textarea"
      :class="{'with-error': hasError}"
      :name="name"
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onChange"
      @blur="onBlur"
  >
  </textarea>
</template>

<script>
export default {
    name: "Textarea",
    props: {
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        id: {
            type: [String, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hasError: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: 'This field is required.'
        }
    },
    methods: {
        onChange(evt){
            this.$emit('change', evt.target.value)
        },
        onBlur(evt){
            this.$emit('blur', evt)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.textarea {
    @include apply-font-and-size("label", 6);
    display: block;
    letter-spacing: 0.05rem;
    font-weight: 100;
    width: 100%;
    height: 5rem;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    background-color: $input-background-color;
    padding: 0.5rem 0.8rem;
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;

    &.with-error {
        border: solid 1px $error-border-color;
    }

    &[disabled] {
        opacity: $disabled-element-opacity;
    }
}

</style>
