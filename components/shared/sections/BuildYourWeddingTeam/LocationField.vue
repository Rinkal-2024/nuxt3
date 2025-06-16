<template>
    <div class="location">
        <FieldTitle>Location:</FieldTitle>
        <Input
            id="vendor-location"
            name="location"
            type="text"
            placeholder="Enter Zip, City or State"
            class="input"
            v-model="value"
        />
    </div>
</template>

<script>
export default {
    name: 'LocationField',
  data: () => ({
    value: null
  }),
  watch: {
    value(value) {
      return this.$emit('change', value)
    }
  }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.location {
    display: flex;
    flex: 66.666%;
    flex-wrap: wrap;

  @include small-and-medium-screens {
    width: 100%;
  }

    ::v-deep .field-title {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0.6rem;
        @include apply-font-and-size("label", 5);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 7);
        }
    }

    ::v-deep .input {
        flex: 1 1 100%;
        border: $input-border-size solid $input-border-color;
        border-radius: $input-border-radius;
        @include apply-font-and-size("label", 6);
        background-color: transparent;
        font-weight: 100;
        height: calc(2.5rem - #{($input-border-size * 2)});
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        box-shadow: inset 0 0 0.1rem $color-darker-white,
        0 0 0.1rem $color-darker-white;
    }

    ::v-deep .error-message {
        min-height: 0;
    }
}

</style>
