<template>
    <PageSection class="page-section get-in-touch">
        <h2 class="heading">
            Get in Touch with
            <br/>
            <LinkRaw
                :href="website"
                rel="noopener"
                target="_blank"
                withoutStyles
            >
                {{ name }}
            </LinkRaw>
        </h2>
        <div class="buttons">
            <div class="item">
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
            </div>

            <div class="item">
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
            </div>

            <div class="item">
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
    </PageSection>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'GetInTouch',
    computed: {
        ...mapGetters('api/vendorPage', [
            'website',
            'phone',
            'fullAddress',
            'name',
            'data'
        ]),
        ...mapGetters('global/config', [
            'isMobile'
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

.page-section {
    margin-top: 1rem;
    @include medium-and-large-screens {
        margin-top: 2rem;
    }
}

.heading {
    @include apply-font-and-size("heading", 1);
    text-align: center;
}

.heading-link {
    color: black;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
}

.section-children {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttons {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    width: 100%;
    @include medium-and-large-screens {
        margin-top: 1.5rem;
        flex-direction: row;
        flex: 1;
        width: auto;
        justify-content: center;
    }

    .item {
        margin-top: 0.25rem;
        display: flex;
        justify-content: center;
        @include medium-and-large-screens {
            margin-top: 0;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }
    }
}

.website,
.phone,
.request-info {
    @include medium-and-large-screens {
        margin: 0 0.5rem;
    }
}

.website,
.phone,
.link,
.request-info,
.button {
    width: 100%;
    @include medium-and-large-screens {
        width: 8rem;
    }
}

</style>
