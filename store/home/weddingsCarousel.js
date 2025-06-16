export const state = () => ({
    data: []
})

export const getters = {
    items: state => {
        return state.data
            .map(item => ({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                image: item.main_image.image,
                linkTo: item.slug
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
