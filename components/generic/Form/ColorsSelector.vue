<template>
    <div class="colors-selector">
        <div class="title">
            BY COLOR
        </div>

        <ColorsSelectorColors
            :base-path="basePath"
            :colors="colors"
            :isCircular="isCircular"
            :selectedColors="selectedColors"
            @click="toggleColor"
        />
    </div>
</template>

<script>
export default {
    name: 'ColorsSelector',
    props: {
        colors: {
            type: Array,
            default: () => []
        },
        isCircular: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: '/weddings/search/color'
        }
    },
    mounted() {
        this.restoreSelectionFromQuery()
    },
    data: () => ({
        selectedColors: []
    }),
    watch: {
        selectedColors(selectedColors) {
            this.$emit('colorsSelectionChanged', selectedColors)
        }
    },
    methods: {
        restoreSelectionFromQuery() {
            let selection = (
                this.$route.query.colors ||
                this.$store.getters['global/config/colorIdSelected'] ||
                this.$route.params?.colorId ||
                []
            )

            if (!Array.isArray(selection)) {
                selection = [selection]
            }

            this.selectedColors = selection
                .map(x => parseInt(x))
                .filter(x => !isNaN(x))
        },
        toggleColor(colorId) {
            const isSelectedIndex = this.selectedColors.findIndex(x => x === colorId)

            if (isSelectedIndex < 0) {
                this.selectedColors.push(colorId)
            } else {
                this.selectedColors.splice(isSelectedIndex, 1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.colors-selector {
    display: flex;
    justify-items: center;
    flex-direction: column;
    flex-wrap: nowrap !important;

    @include medium-and-large-screens {
        flex-direction: row;
        align-items: center;
    }

    ::v-deep .color {
        margin: 1rem 0;
        flex: 0 1 auto;
        height: 1.5rem;
        width: 5rem;

        @include medium-and-large-screens {
            margin: 0;
            height: 1rem;
            width: 1.5rem;
        }
    }

    ::v-deep .colors {
        flex: 1 1 100%;
        margin-top: 1rem;
        flex-direction: column;

        @include medium-and-large-screens {
            flex-direction: row;
            flex: 0 0 auto;
            margin-top: 0;
        }
    }

    @include medium-and-large-screens {
        margin: 0 1rem 0 0;
    }

    .title {
        @include apply-font-and-size("label", 7);
        font-weight: 100;
        white-space: nowrap;
        margin-right: 0.5rem;
        letter-spacing: 0.05rem;

        @include medium-and-large-screens {
            display: flex;
        }
    }
}

</style>
