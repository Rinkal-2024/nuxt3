<template>
    <div class="zommed-image">
        <!-- <MobileView>
            <Modal class="mobile-modal" @onClose="onClose">
                <div class="scroll-container">
                    <Photo
                        :image="image"
                    />
                </div>
            </Modal>
        </MobileView> -->
        <!-- <DesktopView> -->
            <Modal @onClose="onClose">
                <div class="scroll-container">
                    <Photo
                        :image="image"
                    />
                </div>
            </Modal>
        <!-- </DesktopView> -->
    </div>
</template>

<script>
export default {
    name: 'ZoomedImage',
    props: {
        image: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClose() {
            this.$emit('onClose')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.zommed-image {
    ::v-deep {
        .image {
            position: relative;
        }
    }
}

//.scroll-container {
//    height: 100%;
//    width: 100%;
//    overflow: scroll;
//}

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
