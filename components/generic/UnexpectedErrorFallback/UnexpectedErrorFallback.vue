<template>
    <div class="unexpected-error-fallback">
        <div class="unexpected-error-fallback__overlay" :class="{'full-height': !displaySuggestions}">
            <div class="unexpected-error-fallback__text">
                <div class="unexpected-error-fallback__text--left">{{ heading }}</div>
                <div class="unexpected-error-fallback__text--right">{{ message }}</div>
            </div>
        </div>
        <PageLayoutMargin v-if="displaySuggestions">
            <PageSection class="unexpected-error-fallback__tips">
                <ExtraNews :news="items"/>
            </PageSection>
        </PageLayoutMargin>
    </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "UnexpectedErrorFallback",
    props: {
        heading: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        displaySuggestions: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('api/not-found', ['items'])
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.unexpected-error-fallback {
    width: 100%;
    min-height: 100%;

    &__overlay {
        width: 100%;
        min-height: 100%;
        flex-direction: row;
        flex-flow: row wrap;
        background-color: $color-black;

        .unexpected-error-fallback__text {
            display: flex;
            height: 40vh;
            padding-top: 5vh;
            flex-wrap: wrap;
            color: $color-white;
            width: 100%;
            @include medium-and-large-screens {
                padding-top: 15vh;
                align-items: flex-start;
                height: 80vh;
            }
        }

        .unexpected-error-fallback__text--left {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1 1 100%;
            text-align: center;
            @include apply-font-and-size("heading", 2);

            @include medium-and-large-screens {
                text-align: left;
                flex: 1 1 50%;
                @include apply-font-and-size("heading", 1);
            }
        }

        .unexpected-error-fallback__text--right {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex: 1 1 100%;
            padding-bottom: 30px;
            @include apply-font-and-size("paragraph", 3);

            @include medium-and-large-screens {
                text-align: left;
                flex: 1 1 50%;
                padding-bottom: 0;

                @include apply-font-and-size("paragraph", 9);
            }
        }

        &.full-height{
            .unexpected-error-fallback__text{
                padding-top: unset;
            }
            .unexpected-error-fallback__text--left, .unexpected-error-fallback__text--right{
                //height: 100%;
                @include medium-and-large-screens {
                    height: 100%;
                }
            }
        }
    }

    .unexpected-error-fallback__tips {
        margin-top: -10vh;
        @include medium-and-large-screens {
            margin-top: -50vh;
        }
    }
}

</style>
