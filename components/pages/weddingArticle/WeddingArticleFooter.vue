<template>
    <footer>
        <RelatedVendors v-if="showRelatedVendors"/>
         <div class="desktop">
            <PageLayoutMargin>
                <PrevOrNextPost
                    :backToLink="{ name: 'weddings' }"
                    :next="next"
                    :previous="previous"
                    backToListLabel="See All Real Weddings"
                />
            </PageLayoutMargin>
        </div>
        <MoreWeddings/>
        <div class="mobile">
            <PrevOrNextPost
                :backToLink="{ name: 'weddings' }"
                :next="next"
                :previous="previous"
                backToListLabel="See All Real Weddings"
                style="margin-top: 1rem"
            />
        </div>
    </footer>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'WeddingArticleFooter',
    computed: {
        ...mapGetters('api/weddingsArticle', [
            'previous',
            'next',
            'showRelatedVendors'
        ]),
        ...mapGetters('global/config', [
            'isMobile'
        ])
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.pagination {
    @include medium-and-large-screens {
        margin-bottom: -60px;
    }
}

</style>
