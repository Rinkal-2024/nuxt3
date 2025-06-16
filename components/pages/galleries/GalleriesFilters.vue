<template>
    <PageSection
        :title="title"
        without-vertical-margins
        class="search-section"
    >
        <GalleriesFiltersForm
            :colors="colors"
            :initialValue="initialValue"
        />
        <!-- <MobileView>
            <PageSectionSeparator/>
        </MobileView> -->
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'GalleriesFilters',
    props: {
        initialValue: {}
    },
    computed: {
        ...mapGetters('global/config', [
            'isMobile'
        ]),
        ...mapGetters('api/galleries', [
            'colors',
            'categories',
            'images',
            'totalPages'
        ]),
        isFullWidth: function () {
            return this.isMobile
        },
        title: function () {
            return this.isMobile ? 'Find Inspiration' : ''
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.search-section {
    display: flex;
    flex-direction: column;

    @include medium-and-large-screens {
        margin-top: 0;
        display: flex;
        flex-direction: row;
    }
}

</style>
