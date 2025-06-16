import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'
import { parseHtmlArray } from "~/utils/html";

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,

    colors: state => state.data?.sections?.colors,
    categories: state => {
        return state.data?.sections['galleries-categories'].map(category => ({
            ...category,
            label: category.name,
            value: category.slug
        }))
    },
    images: state => state.data?.items,
    totalPages: state => (Math.ceil(state.data.meta.total_count / 36)),
    categoryIntroduction: state => state.data.items?.length && state.data.items[0].category?.introduction,
    categoryDescription: state => {
        if(state.data.items?.length) {
            return parseHtmlArray(state.data.items[0].category?.description)
        }
        return null
    },
    landingPageTitle: state => state.data?.info?.title || 'Wedding Photos',
    landingPageSubtitle: state => state.data?.info?.subtitle || 'Browse Pictures and Images by Popular Themes',
    landingPageIntroduction: state => state.data?.info?.description || 'In this wedding photo gallery, you will find images that can inspire your own wedding. You can also sort the photos by categories and your wedding colors!',
    landingPageDescription: state => state.data?.info?.long_description || null,
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
    addImages({state, commit}, images) {
        const data =  {...state.data}
        data.items = [...data.items, ...images]
        commit('SET_DATA', data)

    }
}
