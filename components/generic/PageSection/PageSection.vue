<template>
    <div
        :class="{
            'with-background': withBackground,
            'without-vertical-margins': withoutVerticalMargins,
            'without-top-body-margin': withoutTopBodyMargin
        }"
        class="page-section"
    >
        <PageLayoutMargin v-if="!fullWidth">
            <PageSectionBody
                :description="description"
                :description-as-html="descriptionAsHtml"
                :linkTo="linkTo"
                :subtitle="subtitle"
                :subtitleTag="subtitleTag"
                :title="title"
                :titleTag="titleTag"
            >
                <slot/>
            </PageSectionBody>
        </PageLayoutMargin>

        <PageSectionBody
            v-else
            :description="description"
            :description-as-html="descriptionAsHtml"
            :linkTo="linkTo"
            :subtitle="subtitle"
            :subtitleTag="subtitleTag"
            :title="title"
            :titleTag="titleTag"
        >
            <slot/>
        </PageSectionBody>
    </div>
</template>

<script>
export default {
    name: 'PageSection',
    props: {
        title: {
            type: String | Boolean,
            default: false
        },
        subtitle: {
            type: String | Boolean,
            default: false
        },
        description: {
            type: String | Boolean,
            default: false
        },
        linkTo: {
            type: String | Boolean,
            default: false
        },
        withBackground: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        withoutVerticalMargins: {
            type: Boolean,
            default: false
        },
        titleTag: {
            type: String,
            default: 'h2'
        },
        subtitleTag: {
            type: String,
            default: 'h3'
        },
        withoutTopBodyMargin: {
            type: Boolean,
            default: false
        },
        descriptionAsHtml: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.with-background {
    background-color: $color-white;
    padding: 2rem 0;
    margin: 2rem 0 0 0;

    @include medium-and-large-screens {
        background-color: $color-darker-white;
        margin: 3rem 0 0 0;
    }

    ::v-deep .section {
        margin-top: 0;
    }
}

.without-vertical-margins {
    margin-top: 0;
    margin-bottom: 0;

    ::v-deep {
        .body {
            margin-top: 0;
        }

        .section {
            margin-top: 0;
            margin-bottom: 0;

            .body {
                padding-top: 0;
            }
        }
    }
}

.without-top-body-margin {
    ::v-deep {
        .body {
            padding-top: 0 !important;
            margin-top: 10px !important;
        }
    }
}
</style>
