<template>
    <PageSection
        title="Choose Your Package"
        withoutVerticalMargins
        class="section"
    >
        <div class="packages">
        <Package
            v-for="membership in memberships"
            :membership="membership"
            :key="membership.id"
            :alternative-colour-version="isAlternativeColourVersion(membership)"
        />
        </div>
    </PageSection>

</template>

<script>
import VENDOR_ACCOUNT_TYPES from '~/constants/vendorAccountTypes'
export default {
    name: "Packages",
    props: {
        memberships: {
            type: Array,
            required: true
        }
    },
    methods: {
        isAlternativeColourVersion(membership){
            return membership.account_type === VENDOR_ACCOUNT_TYPES.MEDIUM_LEVEL
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.section .packages {
    margin-top: 1rem;
    @include medium-and-large-screens {
        margin-top: 2rem;
    }
}

.title {
    @include apply-font-and-size("label", 6);
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: 100;
}

.packages {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;

    @include medium-and-large-screens {
        flex-direction: row;
    }
}

</style>
