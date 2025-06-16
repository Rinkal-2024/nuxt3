import {basePath} from "~/constants/basePath";
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
                href: stripAmpFromUrl(basePath + state?.meta?.path)
            }
        ]
    }),
    data: state => state.data,

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
    }
}
