import {basePath} from "~/constants/basePath";
import {stripAmpFromUrl} from "~/utils/seo";

export const state = () => ({
    meta: null,
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
    })
}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },
}

export const actions = {
    async hydrate({dispatch, commit, getters}, {meta}) {

        commit('SET_META', meta[0] ?? null)

        // Elements' hydration

    }
}
