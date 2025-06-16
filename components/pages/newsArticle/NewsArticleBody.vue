<template>
    <PageLayoutMargin>
        <div class="body">
            <aside class="aside">
                <VendorAdvertisement
                    v-if="vendors.length > 0"
                    :vendors="vendors"
                />
                <NewsletterSignup v-if="displayNewsletterSignup"
                                  id="news-"
                                  no-photo/>
                <AdUnit class="desktop" ad-slot-name="newsArticleSideSticky" minHeight="600" sticky/>
            </aside>
            <div v-if="!loadAds" class="html">
                <HtmlView
                    :html="body"
                    class="html-view"
                />
            </div>
            <div v-if="loadAds" class="html">
                <AdUnitMultiple :ad-slot-names="['newsArticleParagraph1','newsArticleParagraph1a']" minHeight="300" />
                <template v-for="(paragraph, index) in splitBody">
                    <HtmlView
                        :key="index"
                        :html="paragraph"
                        class="html-view"
                    />
                    <template v-if="index===3">
                            <AdUnitMultiple :key="index" :ad-slot-names="['newsArticleParagraph1','newsArticleParagraph1a']" minHeight="300" />
                    </template>
                    <template v-if="index===6">
                            <AdUnitMultiple :key="index" :ad-slot-names="['newsArticleParagraph2','newsArticleParagraph2a']" minHeight="300" />
                    </template>
                    <template v-if="index===9">
                            <AdUnitMultiple  :key="index" :ad-slot-names="['newsArticleParagraph3','newsArticleParagraph3a']" minHeight="300" />
                    </template>
                    <template v-if="index===12">
                            <AdUnitMultiple  :key="index" :ad-slot-names="['newsArticleParagraph4','newsArticleParagraph4a']" minHeight="300"/>
                    </template>
                    <template v-if="index===15">
                            <AdUnitMultiple  :key="index" :ad-slot-names="['newsArticleParagraph5','newsArticleParagraph5a']" minHeight="300"/>
                    </template>
                </template>
                <template v-if="hasMailGate">
                        <NewsArticleMailGate @signup="hideMailGate"/>
                </template>
                <AdUnit ad-slot-name="newsArticleBodyEnd" minHeight="300" />
            </div>
        </div>
    </PageLayoutMargin>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'NewsArticleBody',
    computed: {
        ...mapGetters('api/newsArticle', [
            'body',
            'vendors',
            'displayNewsletterSignup',
            'hasMailGate',
            'mailGateBody'
        ]),
        isMobile() {
            return this.$store.getters["global/config/isMobile"]
        },
        splitBody() {
            // Splits HTML body into paragraphs to insert ads between them
            const body = this.hasMailGate && this.displayMailGate ? this.mailGateBody : this.body

            return this.splitByParagraphs(body)
        }
    },
    data: () => ({
        loadAds: true,
        displayMailGate: false
    }),
    mounted() {
        this.loadAds = true
        if (!document.cookie.includes('NewsletterSubscribed')) {
            this.displayMailGate = true
        }
    },
    methods: {
        hideMailGate() {
            this.displayMailGate = false
        },
        splitByParagraphs(body) {
            let splitBody = body.split('</p>')
            splitBody = splitBody.map((par, index) => {
                if (index < splitBody.length - 1) {
                    return par + '</p>'
                }
                return par
            })
            return splitBody
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.body {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 1rem;
    background-color: $color-darker-white;

    @include medium-and-large-screens {
        flex-direction: row;
        margin-top: 2rem;
        background-color: $color-white;
    }
}

.aside {
    width: 100%;
    margin-top: 1rem;

    @include medium-and-large-screens {
        width: 15rem;
        min-width: 15rem;
        margin-right: 5rem;
        margin-top: 0;
    }
}

.page-layout-margin {
    padding: 0;
    @include medium-and-large-screens {
        padding-left: $page-layout-horizontal-margin;
        padding-right: $page-layout-horizontal-margin;
    }
}

.html-view {
    ::v-deep {
        p, .rich-text p, a, li {
            font-size: 1.19rem;
            line-height: 2.13rem;
            padding-left: $mobile-page-layout-horizontal-margin;
            padding-right: $mobile-page-layout-horizontal-margin;
            color: #222;
            -webkit-font-smoothing: antialiased;
            @include medium-and-large-screens {
                padding-left: 0 !important;
                padding-right: 0 !important;
                font-size: 0.95rem !important;
                line-height: 1.7rem;
            }
        }

        a {
            padding-left: 0 !important;
            padding-right: 0 !important
        }

        h3 {
            font-size: 20px !important;
        }

        h2, h3, h4, h5 {
            @include medium-and-large-screens {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
        }
    }
}

</style>
