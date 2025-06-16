<template>
    <ul class="list">
        <!-- <DesktopView> -->
            <li class="list-item no-margin">IN:</li>
        <!-- </DesktopView> -->
        <li class="list-item">
            <Link
                exact
                class="link"
                :class="{'active-link': !categoryParam}"
                :to="getCategoryLink()"
                @click.native="onFilter"
            >
                All
            </Link>
        </li>
        <li class="list-item">
            <Link
                exact
                class="link"
                :class="{'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.WEDDINGS}"
                :to="getCategoryLink('weddings')"
                @click.native="onFilter"
            >
                Real weddings
            </Link>
        </li>
        <li class="list-item">
            <Link
                exact
                class="link"
                :class="{'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.NEWS}"
                :to="getCategoryLink('news')"
                @click.native="onFilter"
            >
                News
            </Link>
        </li>
        <li class="list-item">
            <Link
                exact
                class="link"
                :class="{'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.VENDORS}"
                :to="getCategoryLink('vendors')"
                @click.native="onFilter"
            >
                Venues & Vendors
            </Link>
        </li>
        <li class="list-item">
            <Link
                exact
                class="link"
                :class="{'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.GALLERIES}"
                :to="getCategoryLink('galleries')"
                @click.native="onFilter"
            >
                Photo Galleries
            </Link>
        </li>
        <li class="list-item total-count" v-if="totalCount">
            {{ totalCount }} Results
        </li>
    </ul>

</template>

<script>
import GLOBAL_SEARCH_PAGE_CATEGORIES from '~/constants/globalSearchPageCategories'

export default {
    name: "GlobalSearchNavigation",
    data: () => ({
        GLOBAL_SEARCH_PAGE_CATEGORIES
    }),
    props: {
        totalCount: {
            type: Number,
            default: 0
        }
    },
    computed: {
        categoryParam() {
            return this.$route.query.category
        }
    },
    methods: {
        getCategoryLink(category) {
            const currentQuery = this.$route.query
            const linkObj = {
                name: 'global_search',
                query: {...currentQuery}
            }
            if(category) {
                linkObj.query.category = category
            } else {
                delete linkObj.query.category
            }
            return linkObj
        },
        onFilter() {
            this.$emit('filter')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.list {
    display: flex;
    list-style: none;
    flex: 1 1 100%;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;
    @include medium-and-large-screens {
        justify-content: flex-start;
    }
}

.list-item {
    @include apply-font-and-size("label", 13);
    letter-spacing: 0.1rem;
    font-weight: 100;
    text-transform: uppercase;

    margin: 1.5rem 0 0 0.75rem;
    @include medium-and-large-screens {
            margin-left: 2rem;
        }
    &.no-margin {
        margin-left: 0;
    }
}

.link {
    @include apply-font-and-size("link", 13);
}

.total-count {
    display: flex;
    justify-content: center;
    text-align: center;
    flex: 1 1 100%;
    text-transform: uppercase;

    @include medium-and-large-screens {
        justify-content: flex-end;
        flex: 1 1 auto;
    }
}

.active-link {
    text-decoration: underline;
    pointer-events: none;
}

</style>
