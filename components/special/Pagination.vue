<template>
    <div v-if="totalPages > 1" class="wrapper">
        <Button
            v-if="!isLastPage && withLoadMoreButton"
            class="load-more-btn"
            @click="loadMore"
        >
            Load more
        </Button>
        <ul class="pagination">
            <li
                v-show="!isFirstPage"
                @click="loadPreviousPage"
                class="page"
            >
                <span>{{ '<' }}</span>
            </li>
            <li
                v-for="page in pages"
                :key="page"
                class="page"
            >
                <div
                    v-if="page === '...'"
                    class="dots"
                >
                    ...
                </div>
                <span
                    v-else
                    @click="loadPage(page)"
                    class="link"
                    :class="{ 'active': page === currentPage }"
                >
                    {{ page }}
                </span>
            </li>
            <li
                v-show="!isLastPage"
                @click="loadNextPage"
                class="page"
            >
                <span>{{ '>' }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { insertParam, paginationGenerator, removeURLParameter } from '~/utils/pagination'

export default {
    name: 'Pagination',
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        withLoadMoreButton: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.rerenderPages()
    },
    data: () => ({
        pages: []
    }),
    computed: {
        isFirstPage() {
            return this.currentPage === 1
        },
        isLastPage() {
            return this.currentPage === this.totalPages
        },
        currentPage() {
            if (process.server) {
                return 1
            }

            const page = new URLSearchParams(document.location.search.substring(1)).get('page')

            // default page does not use page parameter in the url
            return page ? parseInt(page) : 1
        }
    },
    watch: {
        currentPage() {
            this.rerenderPages()
        }
    },
    methods: {
        loadMore() {
            this.loadNextPage()
        },
        loadPreviousPage() {
            this.loadPage(--this.currentPage)
        },
        loadNextPage() {
            this.loadPage(++this.currentPage)
        },
        loadPage(page) {
            if (page === this.currentPage) {
                return
            }

            this.changeQueryString(page)
            this.$emit('pageChanged', page)
        },
        rerenderPages() {
            this.pages = paginationGenerator(this.currentPage, this.totalPages)
        },
        changeQueryString(page) {
            insertParam('page', page)
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.load-more-btn {
    display: flex;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
}

.wrapper {
    margin: 2rem auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.pagination {
    display: flex;
    flex: 1 1 100%;
    margin: 1rem auto 0 auto;
    justify-content: center;
    align-items: baseline;
    font-weight: 100;
    list-style: none;
    flex-wrap: wrap;
    padding: 0;
    color: $color-darker-grey;
}

.page {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0;

    .link {
        color: $color-darker-grey;
        text-transform: uppercase;
        padding: 1.25rem 0.85rem;
        text-align: center;
        @include apply-font-and-size("label", 4);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 5);
        }
    }

    .dots {
        @include apply-font-and-size("label", 6);
    }

    .active {
        color: $color-black;
        font-weight: bold;
    }
}

span {
    font-weight: 100;
    color: $color-black;
    text-decoration: none;
    cursor: pointer;

    &:hover:not(.active) {
        text-decoration: underline;
    }

    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}

</style>
