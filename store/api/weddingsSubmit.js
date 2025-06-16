import {mapOptionsFromApiItems} from "~/utils/api";
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
    countries: state => {
        if (state.data.countries.items.length) {
            return mapOptionsFromApiItems(state.data.countries.items)
        }
        return []
    },
    vendorCategories: state => {
        if (state.data.items.length) {
            return mapOptionsFromApiItems(state.data.items)
        }
        return []
    }
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
    async hydrate({dispatch, commit, getters}, {meta, data, countries}) {

        commit('SET_META', meta[0] ?? null)

        data.countries = countries
        commit('SET_DATA', data ?? null)

        // Elements' hydration

    }
}
