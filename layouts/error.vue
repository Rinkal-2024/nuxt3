<template>
    <UnexpectedErrorFallback :heading="errorData.heading"
                             :message="errorData.message"
                             :display-suggestions="errorData.displaySuggestions"
    />
</template>

<script>
import ERROR_MESSAGES from '~/constants/errorMessages'
import {requestData, createParamsString, getMetaUri} from "~/utils/api";

export default {
    name: "error",
    props: ['error'],
    computed: {
        errorData() {
            return ERROR_MESSAGES[this.error.statusCode] || ERROR_MESSAGES.DEFAULT
        }
    },
    serverPrefetch() {
        return this.fetchData()
    },
    head() {
        return this.$store.getters['api/not-found/head']
    },
    methods: {
        async fetchData () {
            const limit = 3

            const params = {
                fields: 'title,subtitle,description,slug,main_image,subcategory(*,category(*))',
                limit,
                offset: 0,
                order: '-first_published_at',
                sections: ['vendors-widget', 'extra-news-widget']
            }

            const paramsParsed = createParamsString(params)

            const [data] = await requestData(
                this.$http,
                `news/${paramsParsed}`
            )

            await this.$store.dispatch('api/not-found/hydrate', {
                data
            })
        }
    }
}
</script>

<style scoped>

</style>
