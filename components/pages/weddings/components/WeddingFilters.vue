<template>
    <PageSection
        :fullWidth="isFullWidth"
        :title="title"
        :without-vertical-margins="!$isAMP"
        class="search-section"
        titleTag="h1"
    >
        <!-- <WeddingFiltersFormMobile
            v-if="isMobile"
        />
        <div v-else> -->
            <WeddingFiltersForm/>
            <!--            <ActiveFilters />-->
        <!-- </div> -->
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'WeddingFilters',
    props: {
        initialValue: {}
    },
    computed: {
        ...mapGetters('global/config', [
            'isMobile'
        ]),
        ...mapGetters('api/weddings', [
            'colors'
        ]),
        isFullWidth: function () {
            return this.isMobile
        },
        title: function () {
            return this.isMobile ? 'Find Weddings' : ''
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.search-section {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;

    @include medium-and-large-screens {
        margin-top: 0;
        display: flex;
        flex-direction: row;
    }
}

</style>
