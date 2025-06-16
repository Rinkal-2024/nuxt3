<template>
    <div class="input-group">
        <Input
            id="global-search-input"
            placeholder="SEARCH"
            class="input-group__search-input"
            v-model="searchQuery"
        />
        <Button
            variant="transparent"
            class="input-group__search-btn"
            type="submit"
            @click="search"
        >
            <Icon
                name="search"
                class="input-group__search-icon"
            />
        </Button>
    </div>
</template>

<script>
export default {
    name: 'SearchInputWithButton',
    props: ['value'],
    data: () => ({
        searchQuery: null
    }),
    watch: {
        searchQuery(query) {
            this.$emit('input', query)
        }
    },
    methods: {
        search() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.input-group {
    display: flex;
    flex-wrap: nowrap;
    flex-basis: calc(50% - 0.45rem);
}

.input-group__search-input {
    height: calc(2rem - #{($input-border-size * 2)}) !important;
    padding-right: 2rem !important;
    max-width: 100%;
    flex-grow: 0;
}

.input-group__search-btn {
    width: 0.8rem;
    margin-left: -28px !important;
    border: none !important;
    padding: 0 !important;

    &:focus {
        outline: none;
    }

    .input-group__search-icon {
        width: 0.8rem;
    }
}
</style>
