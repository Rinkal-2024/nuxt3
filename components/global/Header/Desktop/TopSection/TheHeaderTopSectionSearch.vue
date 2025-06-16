<template>
    <form id="global-search-form" class="global-search-form">
        <SearchInputWithButton
            v-model="query"
        />
    </form>
</template>

<script>
export default {
    name: 'TheHeaderTopSectionSearch',
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
        }
    }
}
</script>

<style scoped lang="scss">
.global-search-form {
    flex: 1 1;
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    position: relative;
}
</style>
