<template>
    <PrevOrNextPost
        backToListLabel="Wedding news"
        :backToLink="{ name: 'news' }"
        :previous="previous"
        :next="next"
    />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'NewsArticlePrevOrNextPost',
    computed: {
        ...mapGetters('api/newsArticle', [
            'previous',
            'next'
        ])
    }
}
</script>

<style scoped lang="scss">




</style>
