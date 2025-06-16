<template>
    <div>
        <PageLayoutMargin>
            <BackToLink :linkTo="backToLink" />
        </PageLayoutMargin>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'NewsArticleHeaderGallery',
    computed: {
        ...mapGetters('api/newsArticle', [
            'backToLink',
            'category',
            'images',
            'title',
            'subtitle',
            'description',
            'subcategoryLinkTo',
            'subcategory',
            'byline'
        ])
    }
}
</script>

<style scoped>

</style>
