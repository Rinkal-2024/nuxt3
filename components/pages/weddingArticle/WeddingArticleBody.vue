<template>
    <PageLayoutMargin class="page-layout-margin">
        <div class="body wedding-article-body">
            <aside class="resources desktop">
                <WeddingResources/>
            </aside>
            <div class="article-body">
                <div class="html html-body">
                    <HtmlView :html="html" class="html-view" insert-ads></HtmlView>
                </div>
            </div>
            <aside class="highlights desktop">
                <WeddingHighlights alignRight/>
            </aside>
        </div>
        <PageSection class="photo-gallery-section">
             <div id="photo-gallery" class="photo-gallery-ref"/>
            <PhotoLibrary :images="images" strict-width/>
        </PageSection>
        <PageSection class="wedding-videos without-top-body-margin" title="Videos" v-if="videos.length > 0">
            <div class="video-container">
                <CardStyle6
                    v-for="video in videos"
                    :key="video.id"
                    :video="video"
                />
            </div>
        </PageSection>      
    </PageLayoutMargin>
</template>

<script>
export default {
    name: 'WeddingArticleBody',
    data: () => ({
    }),
    computed: {
        html() {
            return this.$store.getters['api/weddingsArticle/bodyHTML']
        },
        images() {
            return this.$store.getters['api/weddingsArticle/galleryImages']
        },
        videos() {
            return this.$store.getters['api/weddingsArticle/galleryVideos']
        }
    },
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.body {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.resources,
.highlights {
    width: 100%;
    margin-top: 1rem;

    @include medium-and-large-screens {
        display: flex;
        align-content: space-between;
        flex-direction: column;
        width: 15rem;
        min-width: 10rem;
        margin-right: 1.5rem;
        margin-top: 0;
    }
}

.highlights {
    @include medium-and-large-screens {
        margin-right: 0;
        margin-left: 1.5rem;
    }
}

.html {
    @include medium-and-large-screens {
        flex: 1 1;
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
    ::v-deep .rich-text p {
        font-size: 1.19rem;
        line-height: 2.13rem;
        padding-left: $mobile-page-layout-horizontal-margin;
        padding-right: $mobile-page-layout-horizontal-margin;
        color: #222;
        -webkit-font-smoothing: antialiased;
        @include medium-and-large-screens {
            padding-left: 0;
            padding-right: 0;
            font-size: 0.95rem !important;
            line-height: 1.7rem;
        }
    }
}

.photo-gallery-section {
    position: relative;
    ::v-deep .page-layout-margin{
        padding:0;
    }


    .photo-gallery-ref { // This element ensures that scrolling stops somewhere above the gallery
        width: 0;
        height: 0;
        position: absolute;
        top: -10rem;
    }
}

.article-body{
    max-width: 33rem;
    @include small-and-medium-screens {
    margin: 0 auto;
       padding: 0 1rem;
    }
}

.video-container {
    text-align: center;
}

.wedding-videos {
 ::v-deep {
        .title {
            @include apply-font-and-size("heading", 9);
            font-weight: 100;
        }
    }
}

</style>
