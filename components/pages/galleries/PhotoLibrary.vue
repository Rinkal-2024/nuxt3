<template>
    <div>
        <template v-if="!isAMP">
            <div :class="['photo-library-block', containerClass]">
                <div
                    v-for="image in images"
                    :key="image.id"
                    class="photo-library-element js-photo-library-element"
                >
                    <div
                        class="photo-library-image"
                        :style="{ height: getHeight(image) + 'px' }"
                    >
                        <Photo :image="image.image" lazy isSharable withObjectFitContain />
                        <Link
                            :to="imageUrl(image)"
                            :aria-label="'zoom image: ' + image.title"
                            class="image-overlay js-photo-library-element-link"
                        >
                            <div v-if="zoomAvailable" class="image-overlay-zoom">
                                <Button
                                    class="image-overlay-zoom-button"
                                    @click="setZoomedImage(image.image, $event)"
                                >
                                    <Icon height="38" name="zoomLight" width="38"/>
                                </Button>
                            </div>
                        </Link>
                        <div class="image-overlay-author js-figure-image-caption">
                            {{
                                image.image.photographed_by ? `Photo: ${image.image.photographed_by}` : ''
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div :style="styleObj.layout" class="photo-library mansonry-layout">
                <div
                    v-for="(column, columnIndex) in columns"
                    :key="columnIndex"
                    :style="styleObj.column"
                    class="photo-library-column"
                >
                    <div
                        v-for="(columnElement, ceIndex) in sliceColumn(column, splitColumnIndexes[columnIndex])"
                        :key="ceIndex"
                        :style="{ width: '100%' }"
                    >
                        <div
                            v-for="image in columnElement"
                            :key="image.id"
                            class="photo-library-column-element"
                        >
                            <div class="photo-library-image">
                                <AmpPhoto :column-width="300" :image="image.image" />
                                <Link :to="imageUrl(image)" class="image-overlay">
                                    <div v-if="zoomAvailable" class="image-overlay-zoom">
                                        <Button
                                            class="image-overlay-zoom-button"
                                            @click="setZoomedImage(image.image, $event)"
                                        >
                                            <Icon height="38" name="zoomLight" width="38"/>
                                        </Button>
                                    </div>
                                </Link>
                                <div class="image-overlay-author">
                                    {{
                                        image.image.photographed_by ? `Photo: ${image.image.photographed_by}` : ''
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <ZoomedImage v-if="imagePreview" :image="zoomedImage" @onClose="removeZoomedImage" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { splitArrayWithSort } from '~/utils/array'; // Utility function remains unchanged
import { useState } from 'nuxt3'; // Nuxt 3 hooks for global state

// Props
const props = defineProps({
    gap: { type: Number, default: 4 },
    columnWidth: { type: Number, default: 400 },
    containerMargin: { type: Number, default: 120 },
    images: { type: Array, default: () => [] },
    adUnits: { type: Array, default: () => [] },
    strictWidth: { type: Boolean, default: false },
    ampNoAds: { type: Boolean, default: false },
    containerClass: { type: String, default: '' },
});

// Reactive data
const zoomedImage = ref(null);
const outsideClickLock = ref(false);
const loadAds = ref(false);
const splitColumnIndexes = ref([9, 0, 3, 0]);

// Computed properties
const windowWidth = computed(() => useState('global/config/windowWidth'));
const isMobile = computed(() => useState('global/config/isMobile'));
const isAMP = computed(() => false); // Implement AMP logic accordingly
const zoomAvailable = computed(() => columnsCount.value !== 1 && !isAMP.value);

// Columns count and layout
const columnsCount = computed(() => {
    if (process.server) return isMobile.value ? 1 : 3;

    const columnsFromWindowWidth = Math.max(
        1,
        Math.floor((windowWidth.value - props.containerMargin) / (props.columnWidth + props.gap))
    );

    return columnsFromWindowWidth <= 4 ? columnsFromWindowWidth : 4;
});

const columns = computed(() => splitArrayWithSort(props.images, columnsCount.value));
const styleObj = computed(() => {
    const style = {
        layout: {},
        column: {}
    };

    if (props.strictWidth) {
        style.column.width = `${props.columnWidth}px`;
        style.column.maxWidth = `${props.columnWidth}px`;
        style.layout.justifyContent = 'center';
    }

    return style;
});

// Methods
const setZoomedImage = (image, event) => {
    event.preventDefault();
    outsideClickLock.value = true;
    zoomedImage.value = image;

    setTimeout(() => {
        outsideClickLock.value = false;
    }, 500);
};

const removeZoomedImage = () => {
    if (outsideClickLock.value) return;

    zoomedImage.value = null;
};

const imageUrl = (image) => ({
    name: 'inspiration-photo-photoId-slug1-slug2',
    params: {
        photoId: image.id,
        slug1: image?.category?.slug ?? 'no-categorized',
        slug2: image?.image?.slug || 'unnamed',
    },
});

const sliceColumn = (column, elementLength) => {
    if (elementLength === 0) return [column];

    const columnElements = [];

    for (let index = 0; index < column.length; index += elementLength) {
        columnElements.push(column.slice(index, index + elementLength));
    }

    return columnElements;
};

const getHeight = (image) => {
    const ratio = props.columnWidth / image.image.original.width;
    return Math.ceil(ratio * image.image.original.height);
};

// Lifecycle hooks
onMounted(() => {
    setTimeout(() => loadAds.value = true, 0);
});
</script>

<style lang="scss" scoped>
// Same scoped styles as before
</style>
