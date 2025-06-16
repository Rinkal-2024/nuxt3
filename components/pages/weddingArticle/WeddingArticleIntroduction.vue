<template>
    <div class="wedding-introduction">
        <div v-if="hasSubtitle" class="couple">
            {{ couple }}
        </div>

        <h2 v-else class="couple">
            {{ couple }}
        </h2>

        <Label
            v-if="photographedBy"
        >
            Photographed by:&nbsp;
            <LinkRaw
                v-if="photographerWebsite"
                :href="photographerWebsite"
                class="photographer-website"
                rel="noopener nofollow"
                withoutStyles
            >
                {{ photographedBy }}
            </LinkRaw>
            <template v-else>
                {{ photographedBy }}
            </template>
        </Label>
        <Label v-if="weddingCity">
            Location: {{ weddingCity }}
        </Label>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'WeddingArticleIntroduction',
    computed: {
        ...mapGetters('api/weddingsArticle', [
            'data'
        ]),
        brideName() {
            return `${this.data.bride_first_name} ${this.data.bride_last_name}`.trim()
        },
        groomName() {
            return `${this.data.groom_first_name} ${this.data.groom_last_name}`.trim()
        },
        couple() {
            if(this.brideName && this.groomName) {
                return `${this.brideName} and ${this.groomName}`
            }
            return ''
        },
        hasSubtitle() {
            return this.data.subtitle
        },
        photographedBy() {
            return this.data.photographed_by
        },
        photographerWebsite() {
            return this.data.photographer_website
        },
        weddingCity() {
            return this.data?.wedding_city?.display_name
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.wedding-introduction {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1;
    margin-top: 1.75rem;

    @include medium-and-large-screens {
        align-items: flex-start;
    }

    .couple {
        @include apply-font-and-size("heading", 9);
        font-style: italic;
        font-weight: normal;
        margin: 0;

        @include medium-and-large-screens {
            @include apply-font-and-size("heading", 2);
        }
    }

    .photographer-website {
        color: $color-darker-grey;
    }
}

</style>
