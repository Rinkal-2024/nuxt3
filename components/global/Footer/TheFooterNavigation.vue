<template>
    <nav class="footer-navigation">
        <!-- <NuxtLink to="/about/">About</NuxtLink>
        <NuxtLink rel="nofollow" to="/advertise/">Advertise</NuxtLink>
        <NuxtLink to="/contact/">Contact</NuxtLink>
        <NuxtLink rel="nofollow" to="/wedding/submit/">Submit a Wedding</NuxtLink>
        <NuxtLink rel="nofollow" to="/work-with-us/">Are You a Business?</NuxtLink>
        <span class="link support">Support</span> -->
    </nav>
</template>

<script>
export default {
    name: 'TheFooterNavigation',
    methods: {
        openNewsletterPopup () {
            this.$store.dispatch('global/config/openNewsletterModal')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";


.footer-navigation {
    display: flex;
    margin: 1rem 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .link {
        font-weight: 100;
        color: $color-white;
        text-decoration: none;
        cursor: pointer;
        @include apply-font-and-size("link", 4);
        line-height: 2.25rem;

        @include medium-and-large-screens {
            @include apply-font-and-size("link", 7);
        }
        text-transform: uppercase;
        &:hover {
            text-decoration: underline;
        }
    }

    > a {
        @include apply-font-and-size("link", 4);
        color: $color-white;
        letter-spacing: 0.05rem;
        white-space: nowrap;
        line-height: 2.25rem;
        @include medium-and-large-screens {
            @include apply-font-and-size("link", 7);
        }
    }

    @include medium-and-large-screens {
        margin: 0;
        flex-direction: row;
        > *:not(:last-child) {
            border-right: 1px solid $color-dark-grey;
        }

        > * {
            padding: 0 0.5rem;
        }
    }
}
</style>
