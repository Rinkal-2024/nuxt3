<template>
    <PageSection
        :description="categoryIntroduction"
        :description-as-html="categoryIntroductionIsHtml"
        :subtitle="subtitle"
        :title="title"
        class="listing-section"
        fullWidth
        subtitleTag="h2"
        titleTag="h1"
        without-top-body-margin
    >
        <VendorCarousel/>
        <div id="news-list">
            <div v-for="(item, index) in items" class="news-list__item-container" v-bind:key=index>
                <PageLayoutMargin>
                    <div class="news-list__item">
                        <LazyNewsCard
                            :key="item.id"
                            :lazy-photo="index!==0 && !$isAMP"
                            :news="item"
                        />
                    </div>
                </PageLayoutMargin>
                <PageSectionSeparator />
            </div>
        </div>  
        <div>
            <div v-waypoint="{ active: true, callback: autoLoadMoreContent, intersectionOptions }"/>
            <div v-if="withLoadMoreButton" class="button-wrapper">
                <template v-if="!$isAMP">
                    <Button id="news-load-more" >Load more</Button>
                    <div id="news-loading" class="hidden"><LoadingIndicator/></div>
                </template>
                <template v-else>
                    <div class="amp-pagination">
                        <Link v-if="page > 1" :to="prevAMPPage">
                            Previous page
                        </Link>
                        <Link v-if="page < totalPages" :to="nextAMPPage">
                            Next page
                        </Link>
                    </div>
                </template>
            </div>
            <!--            <div>-->
            <!--                <Pagination-->
            <!--                    :total-pages="totalPages"-->
            <!--                    @pageChanged="pageChanged"-->
            <!--                />-->
            <!--            </div>-->
            <AccordionText
                v-show="categoryDescription"
                :html="categoryDescription"
                low-profile
            />
        </div>
    </PageSection>
</template>

<script>
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
Vue.use(VueWaypoint)
import {NEWS_CATEGORIES} from '~/constants/newsCategories'
import LazyHydrate from "vue-lazy-hydration";
import {mapGetters} from "vuex";

const defaultDescription = `Inside Weddings shares the latest wedding news, from planning and design ideas for your ceremony and reception, to celebrity weddings, bridal fashion and wedding jewelry inspiration, expert advice from top wedding professionals around the globe, travel ideas for destination weddings and honeymoons, and more!

<h2>Wedding Planning & Advice - FAQ</h2>

<h3>How do you plan a wedding?</h3>
Once you transition from being a pair in love to being engaged to your future spouse, it will soon be time to start wedding planning! Inside Weddings offers hundreds of articles to help you plan and design your wedding day throughout the planning process – from wedding etiquette and invitations to ceremony traditions and reception decoration ideas, plus so much more.

We also share relationship advice, expert tips from top wedding professionals around the world, and insider inspiration from celebrity weddings. You'll also find wedding fashion and wedding jewelry ideas, wedding beauty tips and popular products we know brides, bridesmaids, and mothers of the bride and groom will always love, honeymoon travel inspiration and destination wedding location ideas, plus wedding registry ideas for your dream wish list. Inside Weddings has everything you need to get inspiration and plan your wedding day.

<h3>What advice do you give to newlyweds? </h3>
Inside Weddings shares advice for brides and grooms, as well as newlyweds, on important topics to keep them happy and on the same page for everything from wedding planning, to finance and money advice and wedding budget tips, to relationship advice for friends, partners, family members, and more.

You'll find advice from our writers and our network of wedding professionals across the country and globe, as well as marriage and family therapist experts. Read articles that will guide brides and grooms as they become married as spouse and spouse, husband and wife, and so on – learning to accept one another, make their marriage a priority, and hold the key to setting your marriage in motion.

From setting a wedding date, to managing life and spending time together leading up to the wedding day, to marriage itself,  discover tips for couples in many stages of relationships on a variety of topics – mostly wedding planning – in articles by wedding experts with tips and insider advice from couples and newlyweds.

<h3>What is the best marriage advice?</h3>
The best advice varies from couple to couple, as every pair has different feelings, levels of interest, respect, and love, argument styles, situations, and more. Whatever your relationship style, the brides and grooms featured in Inside Weddings share their wedding-planning and strong marriage advice for couples and newlyweds to remember and keep going throughout their lives, and we also share articles with wedding news, etiquette tips, celebrity weddings, and more wedding advice and news!
`

export default {
    name: 'NewsWeddingNews',
    components: {
        LazyHydrate
    },
    props: {
        withLoadMoreButton: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        page: {
            type: [Number, String],
            default: 1,
        }
    },
    data: () => ({
        defaultSubtitle: 'Inside Weddings shares the latest wedding news, from planning and design ideas for your ceremony and reception, to celebrity weddings, travel ideas, and more!',
        intersectionOptions: {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0, 1]
        },
        throttleLock: false,
        autoLoadingLimit: 3,
        autoLoadingCounter: 0
    }),
    computed: {
        ...mapGetters('api/news', ['totalPages']),
        category() {
            return this.$route.params?.category
        },
        categoryKey() {
            if (this.category) {
                let categoryKey = this.category?.replace('-', '_').toUpperCase()

                if (categoryKey === 'PLANNING_DESIGN') {
                    categoryKey = 'PLANNING_AND_DESIGN'
                }
                return categoryKey
            }
            return null
        },
        subCategory() {
            return this.$route.params?.subcategory
        },
        subtitle() {
            return this.$store.getters['api/news/landingPageSubtitle'] || 'Expert wedding planning tips & inspiration'
        },
        title() {
            if (this.$route.name === 'news' && this.$store.getters['api/news/landingPageTitle']) {
                return this.$store.getters['api/news/landingPageTitle']
            }

            if (this.$route.name === 'news-category') {
                const categoryPageTitle = this.$store.getters['api/news/categoryPageTitle']
                if (categoryPageTitle) {
                    return categoryPageTitle
                }
            }

            if (this.$route.name === 'news-category-subcategory') {
                const subcategoryPageTitle = this.$store.getters['api/news/subcategoryPageTitle']
                if (subcategoryPageTitle) {
                    return subcategoryPageTitle
                }
            }

            const categoryTitle = this.$store.getters['api/news/categoryTitle']

            if (categoryTitle) {
                return categoryTitle
            }

            if (this.categoryKey && !this.subcategory) {
                const newsCategoryTitle = NEWS_CATEGORIES[this.categoryKey]?.title
                if (newsCategoryTitle) {
                    return newsCategoryTitle
                }
            }

            return 'Wedding Advice & News'
        },
        items() {
            return this.$store.getters['api/news/items']
        },
        totalPages() {
            return this.$store.getters['api/news/totalPages']
        },
        categoryIntroduction() {
            let introduction;

            if (this.$route.name === 'news') {
                introduction = this.$store.getters['api/news/landingPageIntroduction']
            } else if (this.$route.name === 'news-category') {
                introduction = this.$store.getters['api/news/categoryIntroduction']
            } else if (this.$route.name === 'news-category-subcategory') {
                introduction = this.$store.getters['api/news/subcategoryIntroduction']
            } else {
                introduction = this.$store.getters['api/news/introduction']
            }

            if (!introduction) {
                const categoryKey = this.categoryKey

                if (this.category && this.subCategory) {
                    return NEWS_CATEGORIES
                        [categoryKey]
                        ?.subCategories
                        .find(x => x.subcategorySlug === this.subCategory)
                        ?.introduction || ''
                } else if (this.category) {
                    return NEWS_CATEGORIES
                        [categoryKey]
                        ?.introduction || ''
                }

            }

            return introduction || this.defaultSubtitle
        },
        categoryIntroductionIsHtml() {
            return Array.isArray(this.categoryIntroduction)
        },
        categoryDescription() {
            if (this.$route.name === 'news') {
                return this.$store.getters['api/news/landingPageDescription'] || defaultDescription
            }
            if (this.$route.name === 'news-category') {
                return this.$store.getters['api/news/categoryDescription']
            } else if (this.$route.name === 'news-category-subcategory') {
                return this.$store.getters['api/news/subcategoryDescription']
            }
            return this.defaultSubtitle

        },
        currentRoutePath() {
            return this.$route.path;
        },
        prevAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: parseInt(this.page) - 1
                }
            }
        },
        nextAMPPage() {
            return {
                path: this.currentRoutePath,
                query: {
                    page: parseInt(this.page) + 1
                }
            }
        }
    },
    methods: {
        pageChanged() {
            this.$nuxt.refresh()
        },
        autoLoadMoreContent({going}) {
            if (going !== this.$waypointMap.GOING_IN || this.autoLoadingCounter > 2) {
                return
            }

            this.autoLoadingCounter += 1
            this.loadMoreContent()
        },
        loadMoreContent() {

            if (this.loading || this.throttleLock) {
                return
            }

            this.throttleLock = true
            setTimeout(() => {
                this.throttleLock = false
            }, 1000)

            this.$emit('loadMore')
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";


#news-list {

    ::v-deep {
        .news-list__item {

            &:last-child {
                padding-bottom: 0;
            }

            & + & {
                padding-top: 2rem;
                border-top: $border-width solid $color-grey;
            }

        }
    }

    .news-list__item-container {
        margin-top: 3rem;
    }

}

//.description {
//    white-space: initial;
//    width: 66%;
//    margin: 1rem auto 0 !important;
//    text-align: center;
//
//    ::v-deep p {
//        @include apply-font-and-size("paragraph", 6);
//        line-height: 1.1rem;
//        font-size: 0.75rem;
//        text-align: justify;
//    }
//
//    ::v-deep button {
//        color: $color-black;
//    }
//}

</style>
