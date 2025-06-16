<template>
    <PageLayoutMargin class="vendor-page-header">
        <!-- <MobileView>
            <BackToLink :linkTo="{ name: 'vendor' }">Back to directory</BackToLink>
        </MobileView> -->
        <div class="header">
            <div class="content">
                <h1 class="name">
                    {{ name }}
                </h1>
                <p v-if="briefSummary" class="brief-summary">
                    {{ briefSummary }}
                </p>
            </div>
            <div class="bar">
                <!-- <DesktopView> -->
                    <BackToLink
                        :linkTo="{ name: 'vendor' }"
                        class="back-to-link"
                    >
                        Back to directory
                    </BackToLink>
                <!-- </DesktopView> -->
                <VendorSocialLinks :items="socials" :website="website"/>
            </div>
            <VenueDetails v-if="isVenue"/>
        </div>
    </PageLayoutMargin>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'VendorPageHeader',
    computed: {
        ...mapGetters('api/vendorPage', [
            'website',
            'name',
            'briefSummary',
            'isVenue',
            'socials'
        ])
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.header {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 100%;
    text-align: center;
}

.content {
    display: flex;
    max-width: 32rem;
    flex: 1 1 100%;
    flex-direction: column;
}

.name {
    @include apply-font-and-size("heading", 1);
}

.name-link {
    color: black;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
}

.brief-summary {
    margin: 1rem 0 1rem 0;
    @include apply-font-and-size("heading", 3);
    font-weight: 100;
    font-style: italic;
}

.bar {
    display: flex;
    position: relative;
    width: 100%;
    align-items: center;
    margin-bottom: 1rem;

    @include medium-and-large-screens {
        margin-top: 1rem;

        .back-to-link {
            display: flex;
            padding: 0;
            width: 20rem;
            position: absolute;
            bottom: 6px;
        }
    }
}

</style>
