<template>
    <PageSection title-tag="h1" :title="title" class="terms">
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
            `flat_pages/terms-of-use/${paramsParsed}`,
        )

        await store.dispatch('api/termsOfUse/hydrate', {
            meta,
            data,
        })

    },
    head() {
        return this.$store.getters['api/termsOfUse/head']
    },
    computed: {
        ...mapGetters('api/termsOfUse', ['body', 'title'])
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.terms {
    ::v-deep .section {
        @include small-and-medium-screens {
            margin-top: 5rem;
        }
    }
}
</style>
