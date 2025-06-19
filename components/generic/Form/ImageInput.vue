<template>
  <FormField name="" full-width>
    <div class="wrapper">
      <input
        :id="id"
        :name="inputId"
        @change="onInputChange"
        type="file"
        accept=".jpg,.jpeg,.gif,.png"
        ref="fileInput"
        class="file-input"
      />

      <div
        class="image-input"
        :class="{ 'with-error': touched && errorMessage }"
      >
        <img
          :id="`${id}-img`"
          :src="imageData"
          alt=""
          data-pin-nopin="true"
          class="hidden"
        />
        <span :id="`${id}-placeholder`">Your image will be shown here.</span>
      </div>

      <div class="file" v-if="withFileButton">
        <div class="content">
          <div class="file-headline">
            FEATURED PROFILE COVER PHOTO*
          </div>
          <Button
            :id="`${id}-button`"
            @click="onButtonClick"
            class="add-file-button"
            :class="{ 'with-error': touched && errorMessage }"
            variant="outline"
          >
            CHOOSE IMAGE
          </Button>
          <div class="file-type">
            SELECT ONLY JPEG, PNG, GIF IMAGES.
          </div>
          <div class="file-size">MAX 2MB</div>
        </div>
      </div>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

// Props
const props = defineProps<{
  id: string
  withFileButton?: boolean
  touched?: boolean
  errorMessage?: string | boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'change', value: string | null): void
}>()

// Refs
const fileInput = ref<HTMLInputElement | null>(null)
const imageData = ref(
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
)

// Derived value for input name (optional customization)
const inputId = computed(() => props.id)

// Methods
function onButtonClick() {
  fileInput.value?.click()
}

function createBase64Image(file: File) {
  const reader = new FileReader()
  reader.onload = e => {
    const result = (e.target as FileReader).result as string
    emit('change', result)
    imageData.value = result
  }
  reader.readAsDataURL(file)
}

function onInputChange(evt: Event) {
  const target = evt.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    createBase64Image(files[0])
  } else {
    imageData.value = ''
    emit('change', null)
  }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.file-input {
  visibility: hidden;
  opacity: 0;
  left: 0;
  position: absolute;
}

.image-input {
  border: $input-border-size solid $input-border-color;
  box-shadow: inset 0 0 0.1rem $color-darker-white, 0 0 0.1rem $color-darker-white;
  flex: 1 1 100%;
  width: 100%;
  min-height: 12.5rem;
  max-height: 32rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  &.with-error {
    border: $input-border-size solid $error-border-color;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 30rem;
  }
}

.file-headline,
.file-type,
.file-size,
.add-file-button {
  letter-spacing: 0.05rem;
}

.file-headline {
  @include apply-font-and-size("label", 4);
}

.file-type,
.file-size {
  font-weight: 300;
}

.file-type,
.file-size,
.add-file-button {
  @include apply-font-and-size("label", 5);
}

.file-size {
  margin-top: 0.1rem;
  text-transform: none;
}

.add-file-button {
  margin: 1rem 0 1rem 0;
  letter-spacing: 0.1rem;

  &.with-error {
    border-color: $error-border-color;
    color: $error-text-color;
  }

  @include medium-and-large-screens {
    margin: 2rem 0 1rem 0;
  }
}

.file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  @include medium-and-large-screens {
    flex: 1 1 80%;
    margin-top: 0;
    align-items: flex-end;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include medium-and-large-screens {
      margin-top: 0;
      align-items: flex-start;
    }
  }
}

.wrapper {
  @include apply-font-and-size("label", 5);
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  height: auto;

  @include medium-and-large-screens {
    flex-direction: row;
    flex: 1 1 100%;
    align-items: center;
  }
}
</style>
