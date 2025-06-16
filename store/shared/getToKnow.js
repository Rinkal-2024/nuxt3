export const state = () => ({
    data: []
})

export const getters = {
    items: state => {
        if (typeof state.data === 'undefined') {
            return []
        }

        return state.data
            .map(item => ({
                key: item.id,
                image: item.main_image.image,
                title: item.title,
                category: item.categories[0]?.name,
                categorySlug: item.categories[0].slug,
                description: item.description.substring(0, 127) + '...',
                link: item.slug
            }))
    }
}

export const mutations = {

    SET_DATA (state, data) {
        state.data = data
    }

}

export const actions = {

    hydrate({ commit }, data) {
        commit('SET_DATA', data)
    }

}
