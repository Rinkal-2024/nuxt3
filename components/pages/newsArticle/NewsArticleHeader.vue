<template>
    <header>
        <NewsArticleHeaderGallery v-if="isGallery" />
        <NewsArticleHeaderImage />
    </header>
</template>

<script>
export default {
    name: 'NewsArticleHeader',
    computed: {
        isGallery() {
            return this.$store.getters['api/newsArticle/isGallery']
        }
    }
}
</script>

<style scoped>

</style>
