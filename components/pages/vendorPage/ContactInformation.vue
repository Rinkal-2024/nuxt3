<template>
    <PageSection withoutVerticalMargins>
        <div class="venue-details">
            <div class="list-container">

                <div v-if="fullAddress" class="item-container location">
                    <div class="item">
                        <Label class="label">
                            Location
                        </Label>
                        <div class="item-node">
                            {{ fullAddress }}
                        </div>
                    </div>
                </div>

                <div v-if="phone" class="item-container">
                    <div class="item">
                        <Label class="label">
                            Phone number
                        </Label>
                        <LinkRaw
                            :href="`tel:${phoneWithoutDots}`"
                            class="link"
                            rel="nofollow"
                            target="_self"
                        >
                            <div class="item-node">
                                {{ phone }}
                            </div>
                        </LinkRaw>
                    </div>
                </div>

                <div class="item-container buttons">
                    <div class="buttons">
                        <LinkRaw
                            v-if="phone"
                            :href="`tel:${phoneWithoutDots}`"
                            class="link"
                            rel="nofollow"
                            target="_self"
                        >
                            <Button class="button" variant="outline">
                                Call
                            </Button>
                        </LinkRaw>
                        <Link
                            :to="requestInfoPath"
                            class="link"
                            force-no-amp
                            rel="nofollow"
                            target="_blank"
                        >
                            <Button class="button" variant="outline">
                                Request Info
                            </Button>
                        </Link>
                        <ExternalLink
                            :to="website"
                            class="link"
                            rel="noopener"
                            target="_blank"
                        >
                            <Button class="button visit-website">
                                Visit website
                            </Button>
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'ContactInformation',
    computed: {
        ...mapGetters('api/vendorPage', [
            'website',
            'phone',
            'fullAddress',
            'data'
        ]),
        phoneWithoutDots() {
            return this.phone.replace(/\./g, '-')
        },
        requestInfoPath() {
            return {
                name: 'biz-slug-id-request-info',
                params: {
                    id: this.data.id,
                    slug: this.data.slug
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.venue-details {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    text-align: left;
    padding: 1.5rem 0;
    border-top: $border-width solid $color-grey;
    border-bottom: $border-width solid $color-grey;
}

.item {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
}

.list-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
}

.item-container {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;

    & + & {
        margin-top: 1rem;
    }

    @include medium-and-large-screens {
        max-width: 50%;
        flex: 1 1 auto;
        height: 100%;
        align-items: center;
        justify-content: center;

        & + & {
            margin-top: 0;
            border-left: $border-width solid $color-grey;
        }
    }
}

.item-node {
    @include apply-font-and-size("paragraph-decorative", 3);
    color: $color-black;
    font-weight: 100;
    letter-spacing: 0.05rem;
    padding: 0.25rem 0;
    text-transform: uppercase;
}

.location {
    @include medium-and-large-screens {
        max-width: calc(30% + 2.75rem);
        padding-right: 1rem;
    }
}

.label {
    margin-top: 0;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.button {
    height: 100%;
    width: 100%;
}

.link {
    margin-left: 0.5rem;
    padding: 0;
    flex: 1 1 100%;

    margin-top: 0.25rem;
    @include medium-and-large-screens {
        flex: 1 1 auto;
        margin-top: 0;
    }
}

.request-info {
    margin-left: 0.5rem;
    flex: 1 1 100%;

    margin-top: 0.25rem;
    @include medium-and-large-screens {
        flex: 1 1 auto;
        margin-top: 0;
    }
}

</style>
