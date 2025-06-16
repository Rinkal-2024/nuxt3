<template>
    <div class="title">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "Title"
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.title {
    @include apply-font-and-size("heading", 1);
    font-style: normal;
    font-weight: normal;
    margin: 3rem 0 0 0;
    text-align: center;
    width: 100%;

    @include medium-and-large-screens {
        text-align: left;
    }
}

</style>
