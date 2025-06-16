<template>
    <div :style="photoStyleObj"
         class="amp-photo-container">
        <amp-img :class="`img--${objectFit}`" 
                 :height="imgHeight" 
                 :srcset="dataSrc"
                 :sizes="srcSizes"
                 :style="{height: `${imgHeight}`}"
                 layout="responsive"/>
        <span
            v-if="withHoverCaption"
            class="amp-photo-caption"
        >
            <i>Photo: {{ image.photographed_by }}</i>
        </span>
    </div>
</template>

<script>
import IMAGE_SIZES from "~/constants/imageSizes";
import {getImageSrcSet} from "~/utils/imgSrcSet";


export default {
    name: "AmpPhoto",
    data: () => ({
        defaultSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        minGalleryPhotoHeight: 240,
    }),
    props: {
        image: {
            type: Object,
            required: true,
        },
        height: {
            type: Number,
            default: 530
        },
        width: {
            type: Number,
            default: null
        },
        objectFit: {
            type: String,
            default: 'cover'
        },
        columnWidth: {
            type: Number,
            default: undefined
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        autoWidth: {
            type: Boolean,
            default: false
        },
        withHoverCaption: {
            type: Boolean,
            default: false
        },
        sizes: {
            type: String,
            default: 'auto'
        }
    },
   /* mounted() {
        this.defaultSrc = this.image.tiny.url
    },*/
    computed: {
        dataSrc() {
            return getImageSrcSet(this.image)
        },
        photoStyleObj() {
            const styleObj = {
                minHeight: `${this.imgHeight}px`,
                maxHeight: `${this.imgHeight}px`,
            }
            if (this.fullWidth) {
                styleObj.width = '100%'
            } else if (this.autoWidth) {
                const photoRatio = this.image.original.width / this.image.original.height
                const scaledWidth = photoRatio * this.height
                styleObj.width = `${scaledWidth}px`
            } else {
                styleObj.width = this.width
            }
            styleObj.margin = '0 0 1rem 0'
            return styleObj
        },
        srcSizes() {
            return this.sizes
        },
        imgHeight() {
            if (this.columnWidth) {
                const computedHeight = this.image.original.height / this.image.original.width * this.columnWidth
                return Math.max(computedHeight, this.minGalleryPhotoHeight)
            }
            return `${this.height}`
        }
    }
}
</script>

<style scoped>

</style>
