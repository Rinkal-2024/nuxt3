<template>
    <nav class="nav">
        <div class="support-and-subscribe">
            <span class="link support">Support</span>
            <a href="https://www.simplecirc.com/subscribe/inside-weddings" class="link" target="_blank"><span class="link">Subscribe</span></a>
        </div>
        <div class="support-and-subscribe">
            <a href="https://www.simplecirc.com/shop/inside-weddings" class="link" target="_blank"><span class="link order_iw_cl">ORDER IW</span></a>
            <Link to="/advertise"><span class="link">ADVERTISE</span></Link>  
        </div>
        <!-- <div class="support-and-subscribe">
            <span class="link support">Support</span>
            <span class="link subscribe">Subscribe</span>  
        </div>
        <div class="level">
            <Link to="/work-with-us">Are you a business?</Link>
        </div> -->
    </nav>
</template>

<script>
import { mailchimpNewsletterPopup } from '~/plugins/mailchimpNewsletterPopup'

export default {
    name: 'TheHeaderTopSectionNav',
    methods: {
        openNewsletterPopup () {
            this.$store.dispatch('global/config/openNewsletterModal')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.separator {
    @include apply-font-and-size("link", 6);
}

.nav {
    line-height: 0;
}

.link {
    font-weight: 100;
    color: $color-black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}

.support-and-subscribe {
    display: flex;

    .support {
        margin-right: 0;

        &:after {
            display: inline-block;
            padding: 0 0.2rem;
            content: "|";
        }
    }

    .order_iw_cl {
        margin-right: 0;

        &:after {
            display: inline-block;
            padding: 0 0.2rem;
            content: "|";
        }
    }


}
</style>
