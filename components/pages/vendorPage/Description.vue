<template>
    <div>
        <PageSectionSeparator />
        <PageSection class="section" without-vertical-margins>
            <p class="description">
                {{ description }}
            </p>
        </PageSection>
    </div>
</template>

<script>
export default {
    name: 'Description',
    computed: {
        description() {
            return this.$store.getters['api/vendorPage/description']
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.section {
    margin-top: 0;

    ::v-deep {
        .title {
            @include apply-font-and-size("heading", 9);
            font-weight: 100;
        }
    }
}

.description {
    white-space: pre-line;
    @include apply-font-and-size("paragraph", 15);

    @include medium-and-large-screens {
        padding: 0 5.75rem;
    }
}

</style>
