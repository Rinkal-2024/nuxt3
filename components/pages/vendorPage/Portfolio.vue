<template>
    <div>
        <PageSection v-if="images.length" class="page-section vendor-portfolio" title="Portfolio"
                     without-top-body-margin>
            <PhotoLibrary
                :images="images"
                id="photo-library"
                amp-no-ads
                strict-width
            />
            <div v-if="withShowMoreButton && !$isAMP && !hideShowMoreButton" class="button-wrapper">
                <Button id="vendor-gallery-load-more" >Load more</Button>
                <div id="gallery-loading" class="hidden"><LoadingIndicator/></div>
            </div>
        </PageSection>
    </div>
</template>

<script>
export default {
    name: 'Portfolio',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        withShowMoreButton: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        images() {
            return this.$store.getters['api/vendorPage/portfolio']
        },
        hideShowMoreButton() {
            return this.images.length < 12;
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.page-section {
    margin-top: 1rem;
    @include medium-and-large-screens {
        margin-top: 2rem;
    }

    ::v-deep {
        .title {
            @include apply-font-and-size("heading", 9);
            font-weight: 100;
        }
    }
}

</style>
