import { sortAlphabetically } from '~/utils/array'
import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,
    categories: state => sortAlphabetically(state.data?.sections['vendors-categories'], c => c.name),
    vendors: state => state.data?.items,
    totalPages: state => (Math.ceil(state.data.meta.total_count / 15)),
    landingPageTitle: state => state.data?.info?.title || 'Wedding Vendors',
    landingPageSubtitle: state => state.data?.info?.subtitle,
    landingPageIntroduction: state => state.data?.info?.description || 'Inside Weddings shares the trusted wedding professionals in our Editors Circle, plus a directory of local wedding vendors. Find wedding services in your area!',
    landingPageDescription: state => state.data?.info?.long_description,
}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },

    SET_DATA(state, data) {
        const newData = { ...data }
        Object.freeze(newData)
        state.data = newData
    }

}

export const actions = {
    async hydrate({ dispatch, commit, getters }, { meta, data }) {

        commit('SET_META', meta[0] ?? null)

        commit('SET_DATA', data ?? null)

        // Elements' hydration

    },

    addVendors({commit, state}, vendors) {
        const data =  {...state.data}
        data.items = [...data.items, ...vendors]
        commit('SET_DATA', data)
    }

}
