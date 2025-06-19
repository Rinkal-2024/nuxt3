<template>
    <PageSection title-tag="h1" :title="title" class="privacy-policy">
        <div class="html">
            <HtmlView :html="body"/>
        </div>
    </PageSection>
</template>

<script>
import {createParamsString, getMetaUri, requestData} from "~/utils/api";
import {mapGetters} from "vuex";

export default {
    name: "index",
    async asyncData({req, $http, store, route}) {
        const params = {
            fields: '*',
        }
        const paramsParsed = createParamsString(params)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `flat_pages/privacy-policy/${paramsParsed}`,
        )

        await store.dispatch('api/privacyPolicy/hydrate', {
            meta,
            data,
        })

    },
    head() {
        return this.$store.getters['api/privacyPolicy/head']
    },
    computed: {
        ...mapGetters('api/privacyPolicy', ['body', 'title'])
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.privacy-policy {
    ::v-deep .section {
        justify-content: flex-start;
        @include small-and-medium-screens {
            margin-top: 5rem;
        }
    }
}
</style>
