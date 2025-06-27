<template>
    <div class="main-navigation-container">
        <nav class="main-navigation">
            <NuxtLink
                v-for="pageLink in pageLinks"
                :key="pageLink.name"
                :to="pageLink.to"
                class="link">
                {{ pageLink.name }}
            </NuxtLink>
        </nav>
    </div>
</template>

<script>
import pageLinks from '~/constants/pageLinks'
// import { mapGetters } from 'vuex'

export default {
    name: 'TheMainNavigation',
    data: () => ({
        pageLinks
    }),
    // computed: {
    //     ...mapGetters('global/config', ['isMobile'])
    // }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.main-navigation-container {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
}

.main-navigation {
    display: flex;
    justify-content: space-between;
    flex: 1 1;

    @include small-and-medium-screens {
        flex-direction: column;
    }
}

.link {
    @include apply-zero-padding-and-margin-for-first-and-last-child;
    white-space: nowrap;
    padding: 0 0.25rem;

    @include small-and-medium-screens {
        @include apply-font-and-size("link-decorative", 3);
        text-transform: capitalize !important;
        padding: .4rem 0;
        font-family: Didot LT Std, sans-serif !important;
        font-size: 1rem !important;
        line-height: 1.5rem !important;
    }
}

</style>
