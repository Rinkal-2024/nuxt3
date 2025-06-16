<template>
    <PageSection
        :title="title"
        :subtitle="subtitle"
        class="with-background"
        withoutTopBodyMargin
    >
        <slot />
    </PageSection>
</template>

<script>
export default {
    name: 'VendorSearchSection',
    props: {
        title: {
            type: String,
            default: 'Vendor search'
        },
        subtitle: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

</style>
