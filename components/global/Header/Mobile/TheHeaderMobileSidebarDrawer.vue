<template>
    <div
        class="sidebar__drawer"
        :class="{ 'open': open }"
    >
        <div class="drawer__inner-container">
            <span class="drawer__title">Navigation</span>
            <MainNavigation />
            <span class="drawer__title">News categories</span>
            <NewsCategoriesNavigation />
            <span class="drawer__title"></span>
            <div class="main-navigation-container">
                <nav class="main-navigation">
                    <Link
                        :to="{ name: 'about' }"
                        class="link"
                    >
                        About
                    </Link>
                    <Link
                        :to="{ name: 'advertise' }"
                        class="link"
                    >
                        Advertise
                    </Link>
                    <Link
                        :to="{ name: 'contact' }"
                        class="link"
                    >
                        Contact
                    </Link>
                    <LinkRaw
                        href="https://simplecirc.com/subscribe/inside-weddings"
                        class="link"
                    >
                        Subscribe to Magazine
                    </LinkRaw>
                    <span
                        class="link subscribe"
                    >
                        Subscribe to Newsletter
                    </span>
                    <Link
                        :to="{ name: 'wedding-submit' }"
                        class="link"
                    >
                        Submit a Wedding
                    </Link>
                    <Link
                        :to="{ name: 'work-with-us' }"
                        class="link"
                    >
                        Are You a Business?
                    </Link>
                    <span
                        class="link support"
                    >
                        Support
                    </span>
                </nav>
            </div>
            <SocialLinks />
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheHeaderMobileSidebarDrawer',
    props: {
        open: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.sidebar__drawer {
    z-index: $drawer-z-index;
    background-color: $color-darker-white;

    box-sizing: content-box;
    position: fixed;
    display: block;
    width: 300px;
    max-width: 300px;
    height: 100%;
    top: 0;
    left: -330px;
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    transition: left .4s;

    &.open {
        left: 0;
    }
}

.drawer__inner-container {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1rem 20px 1rem 0.75rem;
}

.sidebar__drawer .drawer__title {
    @include apply-font-and-size("heading", 3);
    text-transform: uppercase;
    font-weight: bold;
}

.drawer__title {
    padding-top: 1rem;
    display: block;
}

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

    &:hover {
        text-decoration: underline;
    }

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
