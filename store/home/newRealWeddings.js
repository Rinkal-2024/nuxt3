export const state = () => ({
    data: []
})

export const getters = {
    items: state => {
        return state.data
            .map(article => ({
                id: article.id,
                title: article.title,
                subtitle: article.subtitle,
                category: article.event_type_display,
                image: article.main_image.image,
                linkTo: article.slug
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
