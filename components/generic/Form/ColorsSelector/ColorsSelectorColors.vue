<template>
    <div
        :class="{ '--circular': isCircular }"
        class="colors-container"
    >
        <template v-for="color in colors">
            <ColorsSelectorColor
                :key="color.id"
                v-if="!$isAMP"
                :color="color"
                :isSelected="!!selectedColors.find(x => x === color.id)"
                @click="emitClickEvent"
            />
            <Link :key="color.id" v-else :to="getColorLink(color)" without-styles>
                <div
                    :class="{selected: !!selectedColors.find(x => x === color.id)}"
                    :style="{ backgroundColor: color.color }"
                    class="color"
                    @click="emitClickEvent"
                >
                    {{ color.name }}
                </div>
            </Link>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ColorsSelectorColors',
    props: {
        colors: {
            type: Array,
            default: () => []
        },
        isCircular: {
            type: Boolean,
            default: false
        },
        selectedColors: {
            type: Array,
            default: () => []
        },
        ampBasePath: {
            type: String,
            default: '/weddings/search/color'
        }
    },
    methods: {
        emitClickEvent(colorId) {
            this.$emit('click', colorId)
        },
        getColorLink(color) {
            return `${this.ampBasePath}/${color.id}`
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";



</style>
