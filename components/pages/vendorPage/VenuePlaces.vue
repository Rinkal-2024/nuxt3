<template>
    <PageSection v-show="venuePlaces.length > 0" withoutVerticalMargins>
        <div class="venue-places">
            <div class="headings">
                <h2 class="title">List of Venues</h2>
                <p class="description">{{ sideDescription }}</p>
            </div>
            <div class="places">
                <div
                    v-for="item in venuePlaces"
                    class="place"
                >
                    <div class="place-item">
                        <div class="image-container">
                            <Photo :image="item.image" class="image" appearance="static"/>
                        </div>
                        <div class="place-title">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </div>

    </PageSection>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'VenuePlaces',
    computed: {
        ...mapGetters('api/vendorPage', ['venuePlaces', 'sideDescription'])
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.venue-places {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    @include medium-and-large-screens {
        margin-top: 2rem;
        flex-direction: row;
    }
}

.headings {
    flex: 1 1 100%;
    text-align: left;

    @include medium-and-large-screens {
        flex: 1 1 calc(30% + 4rem);
        padding-right: 4rem;
        border-right: $border-width solid $color-grey;
    }

    .title {
        @include apply-font-and-size("heading", 9);
        font-style: normal;
        text-align: left;
        @include medium-and-large-screens {
            @include apply-font-and-size("heading", 3);
        }
    }

    .description {
        @include apply-font-and-size("paragraph-decorative", 3);
        font-weight: 100;
        font-style: italic;

        margin-top: 1rem;

        & + .description {
            margin-top: 0.5rem;
        }

        @include medium-and-large-screens {
            @include apply-font-and-size("paragraph-decorative", 4);
            margin-top: 2rem;
            & + .description {
                margin-top: 1.5rem;
            }
        }
    }
}

.places {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;
    justify-content: flex-start;
    margin-bottom: 3rem;

    @include medium-and-large-screens {
        flex: 1 1 calc(70% - 4rem);
        margin-left: 3.75rem;
    }
}

.place {
    display: flex;
    flex: 1 1 100%;
    margin-top: 1rem;
    min-width: 10rem;

    @include medium-and-large-screens {
        flex: 1 1 50%;
    }
}

.place-item {
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    padding-right: 1rem;
}

.place-title {
    flex: 0 1 8rem;
    margin-left: 0.5rem;
    @include apply-font-and-size("heading", 3);

    @include medium-and-large-screens {
        margin-left: 2rem;
    }
}

.image-container {
    display: flex;
}

.image {
    height: 5rem;
    width: 7.5rem;
}


</style>
