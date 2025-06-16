<template>
    <div>
        <TheHeader/>
        <div
            :class="{'--with-news-categories-menu': isNewsListPage }"
            class="body">
            <Nuxt/>
        </div>
        <NewsletterSignup v-if="showNewsletterSignup" is-footer
                              subtitle="Get inspiring wedding ideas and planning tips from Inside Weddings via email."
                              title="Free Membership!"/>
        <TheFooter/>
        <AdUnitFixed ad-slot-name="stickyFooter"/>
    </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import {processAdsOnPage} from '~/utils/adapex'
import {isNewsListPage} from "~/utils/header";
import {reloadAds} from "~/utils/ads";
import {mapGetters} from "vuex";

const NEWSLETTER_ROUTES = [
    '/news',
    '/weddings',
    '/inspiration',
    '/vendor',
    '/biz',
    '/global_search'
]

export default {
    components: {
        LazyHydrate
    },
    data: () => ({
        isSignedUp: true
    }),
    beforeMount() {
        this.updateWindowSize()
        this.watchWindowSize()
        this.updateScrollingPosition()
        this.watchScrollingPosition()
    },
    mounted() {
        // if (this.isMobile) {
        //     setTimeout(reloadAds, 1000)
        // }
        if (!document.cookie.includes('NewsletterSubscribed')) {
            this.isSignedUp = false
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateWindowSize)
        window.removeEventListener('scroll', this.updateScrollingPosition)
    },
    computed: {
        ...mapGetters('global/config', [
            'currentOffsetTop',
        ]),
        isNewsListPage() {
            return isNewsListPage(this.$route)
        },
        showNewsletterSignup() {
            return this.currentRouteHasNewsletterSignup
        },
        currentRouteHasNewsletterSignup() {
            if (this.$route.path === '/') {
                return true
            }
            return NEWSLETTER_ROUTES.some(r => this.$route.path.startsWith(r))
        }
    },
    watch: {
        $route() {
            this.$nextTick(processAdsOnPage)
        },
    },
    methods: {
        updateWindowSize() {
            this.$store.dispatch('global/config/windowSizeChanged', window.innerWidth)
        },
        watchWindowSize() {
            window.addEventListener('resize', this.updateWindowSize, {passive: true})
        },
        updateScrollingPosition() {
            this.$store.dispatch('global/config/scrollingPositionChanged', window.scrollY)
        },
        watchScrollingPosition() {
            window.addEventListener('scroll', this.updateScrollingPosition, {passive: true})
        }
    }
}
</script>

<style lang="scss" scoped>
$news-categories-offset: 57px;
$desktop-top-offset: 165px;
$mobile-top-offset: 3rem;

.body {

    margin-top: $mobile-top-offset;    
    min-height: 100vh; 

    @include medium-and-large-screens {       
        margin-top: $desktop-top-offset;

        &.--with-news-categories-menu {
            margin-top: $desktop-top-offset + $news-categories-offset
        }
    }
}
</style>
