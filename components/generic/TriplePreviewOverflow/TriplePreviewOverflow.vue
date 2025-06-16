<template>
    <Cards class="cards triple-preview-overflow">
        <slot/>
    </Cards>
</template>

<script>
export default {
    name: 'TriplePreviewSectionOverflow'
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.cards {
    @include medium-and-large-screens {
        margin-top: 1rem;
    }
}

::v-deep .card {
    margin-top: 1rem;

    &:hover {
        .content {
            top: -1rem;
        }
    }
}

</style>
