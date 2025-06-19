<template>
    <div class="zoomed-image">
        <Modal @onClose="onClose">
            <div class="scroll-container">
                <Photo :image="image" />
            </div>
        </Modal>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define component props
const props = defineProps({
    image: {
        type: Object,
        required: true
    }
});

// Define the event emitter (onClose)
const emit = defineEmits(['onClose']);

// Method to handle close event
const onClose = () => {
    emit('onClose');
};
</script>

<style scoped lang="scss">
.zommed-image {
    ::v-deep {
        .image {
            position: relative;
        }
    }
}

// .scroll-container {
//     height: 100%;
//     width: 100%;
//     overflow: scroll;
// }

.mobile-modal {
    ::v-deep {
        .modal {
            flex: 1 1;
            max-height: 100%;
            width: 90%;
            overflow: scroll;
        }

        .close-icon {
            &:after,
            &:before {
                background-color: $color-white;
            }
        }
    }
}

.scroll-container {
    ::v-deep {
        img {
            max-height: 90vh;
            width: 80vw;
        }
    }
}
</style>
