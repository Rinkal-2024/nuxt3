<template>
    <section class="section">
        <Link
            v-if="title && linkTo"
            :to="linkTo"
        >
            <component :is="titleTag" class="title">{{ title }}</component>
        </Link>

        <component :is="titleTag" v-else-if="title" class="title">{{ title }}</component>

        <component :is="subtitleTag" class="subtitle" v-if="subtitle">{{subtitle}}</component>

        <template v-if="description">
            <HtmlView class="description" v-if="descriptionAsHtml" :html="parsedDescriptionHtml" />
            <p v-else class="description">{{ description }}</p>
        </template>

        <div class="body">
            <slot />
        </div>
    </section>
</template>

<script>
import { parseHtmlArray } from "~/utils/html";

export default {
    name: 'PageSectionBody',
    props: {
        title: {
            type: String|Boolean,
            default: false
        },
        subtitle: {
            type: String|Boolean,
            default: false
        },
        description: {
            type: String|Boolean,
            default: false
        },
        linkTo: {
            type: String|Boolean,
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
        descriptionAsHtml: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        parsedDescriptionHtml() {
            if(Array.isArray(this.description)) {
                return parseHtmlArray(this.description)
            }
            return this.description
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.section {
    margin: 2rem 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include medium-and-large-screens {
        margin: 3rem 0 0 0;
    }

    @include small-and-medium-screens {
        .body {
            margin-top: 30px;
        }
    }

    &.topBorder {
        &::before {
            content: "";
            position: relative;
            top: 1.5rem;
            width: 100%;
            height: 1px;
            background-color: $color-light-grey;
        }
    }

    .title {
        @include apply-font-and-size("heading", 2);
        font-style: normal;
        //text-transform: capitalize;
        text-align: center;
        font-weight: 100;
        //padding-bottom: 1rem;
        @include medium-and-large-screens {
            @include apply-font-and-size("heading", 1);
        }
    }

    .subtitle {
        margin: 0.5rem 0 0 0;
        @include apply-font-and-size("heading", 3);
        font-weight: 100;
        font-style: italic;
        text-align: center;
        white-space: pre-line;
        ::v-deep p {
            @include apply-font-and-size("heading", 3);
        }
    }

    .description {
        display: block;
        margin: 1rem 0 0 0;
        @include medium-and-large-screens {
            margin: 1rem 20% 0;
            @include apply-font-and-size("heading", 4);
        }
    }

    .description, .description ::v-deep p {
        @include apply-font-and-size("heading", 4);
        //font-size: 0.9rem;
        font-weight: 100;
        text-align: center;

        //@include medium-and-large-screens {
        //    @include apply-font-and-size("heading", 4);
        //}
    }

    .description ::v-deep p:first-child {
        margin-top: 0;
    }

    .body {
        width: 100%;
        padding-top: 2rem;
    }

    .withoutVerticalMargins {
        margin-top: 0;
        margin-bottom: 0;

        .body {
            margin-top: 0;
        }
    }
}

</style>
