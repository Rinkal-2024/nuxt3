<template>
    <form
        id="mobile-search"
    >
        <Input
            id="mobile-search-input"
            v-model="query"
            ref="searchInput"
            placeholder="SEARCH"
            class="mobile-search__input"
        />
        <Button id="mobile-search-submit" class="mobile-search__btn" type="submit">SUBMIT</Button>
    </form>
</template>

<script>
export default {
    name: 'TheHeaderMobileSearch',
    data: () => ({
       query: ''
    }),
    methods: {
        async search() {
            const currentRouteName = this.$route.name

            await this.$router.push({
                name: 'global_search',
                query: {
                    query: this.query
                }
            })

            if (currentRouteName === 'global_search') {
                setTimeout(() => {
                    this.$nuxt.refresh()
                }, 0)
            }
            this.$emit('hide')
        },
        focusInput() {
            this.$refs.searchInput.$el.focus()
        }
    }
}
</script>

<style scoped lang="scss">

#mobile-search {
    margin: 0.5rem 0 1rem 0;
    flex: 1 1 100%;
    display: flex;
}

.mobile-search__input, .mobile-search__btn {
    height: calc(2rem - 2px) !important;
}

.mobile-search__btn {
    margin-left: 0.25rem;
    padding: 0 .5rem;
}

</style>
