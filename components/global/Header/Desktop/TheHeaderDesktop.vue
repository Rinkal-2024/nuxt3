<template>
    <PageLayoutMargin>
        <div class="container__contents--desktop">
            <div class="contents__top-section">
                <TheHeaderTopSectionLogo class="top-section__logo" />
                <div class="top-section__navigation">
                    <TheHeaderTopSectionSearch class="navigation__global-search" />
                    <TheHeaderTopSectionNav class="navigation__links" />
                </div>
            </div>
            <div class="contents__bottom-section">
                <MainNavigation class="bottom-section__navigation" />
                <SocialLinks class="bottom-section__social-links" />
            </div>
            <div v-if="isNewsListPage" class="contents__news-categories-section">
                <TheHeaderNewsCategoriesNavigation />
            </div>
        </div>
    </PageLayoutMargin>
</template>

<script>
import { isNewsListPage } from "~/utils/header";

export default {
    name: 'TheHeaderDesktop',
    computed: {
        isNewsListPage() {
            return isNewsListPage(this.$route)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.website-header__container {
    max-width: 1440px;
    padding: 0 3rem;
    margin: 0 auto;
    width: 100%;
}

.container__contents--desktop {

    .contents__top-section {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
    }

    .top-section__logo {
        display: flex;
        flex: 1 1 35%;
        align-items: center;
        margin-right: 2rem;
        justify-content: flex-start;
        background-color: transparent;

        img {
            max-width: 23rem;
            width: 100%;
        }
    }

    .top-section__navigation {
        display: flex;
        flex: 1 1 50%;
        align-items: center;
        justify-content: space-between;
        margin: .5rem 0;
    }

    .contents__bottom-section {
        @include apply-header-section;
    }

    .bottom-section__social-links {

    }

    .bottom-section__social-links {
        margin-left: 2rem;
        padding-left: 2rem;
        border-left: $border-width solid $color-grey;
    }

    .contents__news-categories-section {
        @include apply-header-section;
        border-top: none;
        background: #fff;
    }
}
</style>
