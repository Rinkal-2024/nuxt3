<template>
    <PageSection
        withoutVerticalMargins
    >
        <Photo v-if="image" class="image" :image="image" appearance="static" no-pin/>
    </PageSection>

</template>

<script>
export default {
    name: "ImageSection",
    props: {
        image: {
            type: Object,
            default: () => {}
        },
        aspectRatio: {
            type: Number,
            default: 1
        },
    },

}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.image {
    width: 100%;
    img {
        position: relative;
    }
}

</style>
