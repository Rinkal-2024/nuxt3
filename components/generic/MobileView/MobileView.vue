<template>
    <div v-show="isMobile">
        <slot />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MobileView',
    computed: {
        ...mapGetters('global/config', [
            'isMobile'
        ])
    }
}
</script>

<style scoped>

</style>
