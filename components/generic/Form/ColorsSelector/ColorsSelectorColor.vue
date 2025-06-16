<template>
    <div
        :class="{ '--bright': isBright, '--selected': isSelected }"
        :style="{ backgroundColor: color.color }"
        class="color"
        :data-id="color.id"
        @click="emitClickEvent"
        :title="color.name"
    >
    </div>
</template>

<script>
import detectBrightColorMixin from '~/mixins/detectBrightColorMixin'

export default {
    name: 'ColorsSelectorColor',
    props: {
        isSelected: {
            type: Boolean,
            default: false
        },
        color: {
            type: Object,
            required: true,
            validator: color => ['color', 'id', 'name'].every(property => color.hasOwnProperty(property))
        }
    },
    computed: {
        isBright() {
            return this.detectBrightColor(this.color.color)
        }
    },
    methods: {
        emitClickEvent() {
            this.$emit('click', this.color.id)
        }
    },
    mixins: [
        detectBrightColorMixin
    ]
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

</style>
