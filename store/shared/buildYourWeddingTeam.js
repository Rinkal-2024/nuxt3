export const state = () => ({
    data: []
})

export const getters = {
    vendorCategories: state => {
        return state.data
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
