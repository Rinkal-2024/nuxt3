<template>
    <Button @click="$emit('toggle')" variant="transparent" class="search-toggle">
        <Icon name="search" class="search-toggle__icon"></Icon>
    </Button>
</template>

<script>
export default {
    name: 'TheHeaderMobileSearchToggle'
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.search-toggle {
    @include button-as-normal-text;
    padding: 0 !important;
}

.search-toggle__icon {
    display: flex;
    justify-content: flex-end;
}

</style>
