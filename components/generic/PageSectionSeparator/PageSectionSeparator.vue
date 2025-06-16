<template>
    <PageLayoutMargin>
        <div class="page-section-separator">
            <Separator/>
        </div>
    </PageLayoutMargin>
</template>

<script>
export default {
    name: 'PageSectionSeparator'
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.page-section-separator {
    margin: 2rem 0 0 0;

    @include medium-and-large-screens {
        margin: 3rem 0 0 0;
    }
}

</style>
