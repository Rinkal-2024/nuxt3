<template>
    <div>
        <PageLayoutMargin>
            <BackToLink :linkTo="linkToArticle">
                Back to Wedding
            </BackToLink>
        </PageLayoutMargin>
        <PageSection
            :title="title"
            class="page-section"
        >
            <PhotoLibrary
                :images="images"
                :columnWidth="300"
                :gap="4"
                strict-width
            />
        </PageSection>
    </div>
</template>

<script>
import { getMetaUri, requestData, createParamsString } from '~/utils/api'

export default {
    name: 'weddings-article',
    computed: {
        data() {
            return this.$store.getters['api/weddingsArticle/data']
        },
        title() {
            return `${this.data.title} Image Gallery`
        },
        images() {
            return this.$store.getters['api/weddingsArticle/galleryImages']
        },
        linkToArticle() {
            return {
                name: 'weddings-slug-articleId',
                params: {
                    slug: this.data.slug,
                    articleId: this.data.id
                }
            }
        }
    },
    async asyncData ({ $http, store, route, req }) {
        const { slug, articleId } = route.params

        const params = {
            fields: '*,colors(*),-images_preview,wedding_city(id,display_name)',
            sections: ['colors']
        }

        let paramsParsed = createParamsString(params)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `weddings/${articleId}/${paramsParsed}`
        )

        await store.dispatch('api/weddingsArticle/hydrate', {
            meta,
            data
        })

    },
    head() {
        return this.$store.getters['api/weddingsArticle/head']
    }
}
</script>

<style scoped lang="scss">

.page-section {
    ::v-deep {
        .title {
            margin-bottom: 2rem !important;
            margin-top: -1rem !important;
        }
    }
}

</style>
