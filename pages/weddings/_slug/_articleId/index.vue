<template>
    <article>
            <WeddingArticleHeading/>
            <WeddingArticleBody/>
            <WeddingArticleFooter/>
    </article>
</template>

<script>
import {createParamsString, getMetaUri, requestData} from '~/utils/api'
import LazyHydrate from "vue-lazy-hydration";
import {getImageSrcSet, getImageSizes} from "~/utils/imgSrcSet";

export default {
    name: 'weddings-article',
    amp: 'hybrid',
    ampLayout: 'amp',
    components: {LazyHydrate},
    async asyncData({$http, store, route, req, redirect}) {
        const {articleId} = route.params

        const params = {
            fields: '*,colors(*),-images_preview,wedding_city(id,display_name)',
            sections: ['colors']
        }

        if (route.query?.preview_secret) {
            params.preview_secret = route.query.preview_secret
        }

        let paramsParsed = createParamsString(params)

        try {
            const [meta, data] = await requestData(
                $http,
                getMetaUri(req, route),
                `weddings/${articleId}/${paramsParsed}`
            )

            await store.dispatch('api/weddingsArticle/hydrate', {
                meta,
                data
            })
        } catch (e) {
            //console.log(e)
            redirect(301, '/not-found/')
        }
    },
    head() {
        const mainImage = this.$store.getters['api/weddingsArticle/landscapeGalleryImages'][0]?.image;
        const head = this.$store.getters['api/weddingsArticle/head']
        if (mainImage) {
            const mainImageLink = {
                 rel: 'preload',
                 fetchpriority: 'high',
                 as: 'image',
                 imagesrcset: getImageSrcSet(mainImage),
                 imagesizes: getImageSizes(100)
            }
            head.link = head.link ? [mainImageLink, ...head.link] : [mainImageLink]
        }
        return head
    }
}
</script>

<style scoped>

</style>
