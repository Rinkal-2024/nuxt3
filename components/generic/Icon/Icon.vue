<template>
    <img
            :src="src"
            :alt="alt"
            :width="width"
            :height="height"
            loading="lazy"
            noloading
    />
</template>

<script>
import icons from '~/assets/icons'
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => {
                return typeof icons[value] !== 'undefined'
            }
        },
        isLight: {
            type: Boolean,
            default: false
        },
        width: {
            type: String|Number,
            default: '25px'
        },
        height: {
            type: String|Number,
            default: '25px'
        }
    },
    computed: {
        parsedName() {
            return this.name + (this.isLight ? 'Light' : '')
        },
        src() {
            return icons[this.parsedName]
        },
        alt() {
            return `${this.name} icon`
        }
    }
}
</script>

<style scoped>

</style>
