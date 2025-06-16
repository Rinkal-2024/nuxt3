export const state = () => ({
    data: 'TEST DATA'
})

export const getters = {
    magazineCover: state => state.data && state.data[0]?.image,
    currentData: state => state.data
}

export const mutations = {
    SET_DATA(state, data) {
        state.data = data
    }
}

export const actions = {
    async hydrate({ commit }, { data }) {
        commit('SET_DATA', data ?? {error: 'not found'})
    }
}
