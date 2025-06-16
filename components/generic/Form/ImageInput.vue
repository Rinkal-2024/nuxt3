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
                :class="{'with-error': touched && errorMessage}"
            >
                <img  :id="id + '-img'" :src="imageData" alt="" data-pin-nopin="true" class="hidden" />
                <span :id="id + '-placeholder'">Your image will be shown here.</span>
            </div>
            <div class="file" v-if="withFileButton">
                <div class="content">
                    <div class="file-headline">
                        FEATURED PROFILE COVER PHOTO*
                    </div>
                    <Button 
                        :id="id + '-button'" 
                        @click="onButtonClick"
                        class="add-file-button"
                        :class="{'with-error': touched && errorMessage}"
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

<script>
export default {
    name: "ImageInput",
    data: () => ({
        imageData: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
    }),
    props: {
        id: {
            type: String,
            required: true
        },
        withFileButton: {
            type: Boolean,
            default: false
        },
        touched: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: [String, Boolean],
            default: false
        },
    },
    methods: {
        onButtonClick() {
            this.$refs.fileInput.click()
        },
        createBase64Image(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.$emit('change', e.target.result)
                this.imageData = e.target.result
            }
            reader.readAsDataURL(file)
        },
        onInputChange(evt) {
            if(evt.target.files?.length > 0){
                this.createBase64Image(evt.target.files[0])
            } else {
                this.imageData = null
                this.$emit('change', null)
            }
        }
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
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
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
}

.file-size {
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
