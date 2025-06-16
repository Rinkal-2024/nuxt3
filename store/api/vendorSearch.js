import {basePath} from '~/constants/basePath'
import {sortAlphabetically} from '~/utils/array'
import {stripAmpFromUrl} from "~/utils/seo";

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => ({
        title: state?.meta?.title,
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: state?.meta?.description
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: state?.meta?.keywords
            }
        ],
        link: [
            {
                rel: 'canonical',
                href: stripAmpFromUrl(basePath + state.meta.canonical)
            }
        ]
    }),
    data: state => state.data,

    vendors: state => state.data?.items,
    totalPages: state => (Math.ceil(state.data.meta.total_count / 15)),
    vendorTypes: state => sortAlphabetically(state.data?.sections['vendors-categories'], c => c.name)
}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },

    SET_DATA(state, data) {
        const newData = {...data}
        Object.freeze(newData)
        state.data = newData
    }

}

export const actions = {
    async hydrate({dispatch, commit, getters}, {meta, data}) {

        commit('SET_META', meta[0] ?? null)

        commit('SET_DATA', data ?? null)

        // Elements' hydration

    },

    addVendors({commit, state}, vendors) {
        const data = {...state.data}
        data.items = [...data.items, ...vendors]
        commit('SET_DATA', data)
    }

}
