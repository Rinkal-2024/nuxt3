import { generateMeta } from '~/utils/seo'
import { parseHtmlArray } from "~/utils/html";
import {shuffleArray} from '~/utils/array'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,

    items: state => state.data.items,
    weddingTipsFromTheProsItems: state => state.data.sections['extra-news-widget'].map(item => ({
        ...item,
        image: item.main_image.image,
        linkTo: item.slug
    })),
    getMoreAdviceFromItems: state => state.data.sections['vendors-widget'].map(item => ({
        ...item,
        image: item.main_image.image,
        slug: item.slug,
        linkTo: item.slug,
        category: item.categories[0]?.name,
        categorySlug: item.categories[0]?.slug,
        description: item.description.substring(0, 127) + '...',
    })),
    totalPages: state => (Math.ceil(state.data.meta.total_count / 10)),
    introduction: state => state.meta?.introduction || '',
    description: state => state.meta?.description || '',
    vendors: state => shuffleArray(state.data?.vendors?.items)?.slice(0, 6),
    categoryTitle: state => state.data?.categoryTitle,
    landingPageTitle: state => state.data?.info?.title,
    landingPageSubtitle: state => state.data?.info?.subtitle,
    landingPageIntroduction: state => {
        return state.data.info?.description?.length > 0 ? state.data.info?.description : null
    },
    landingPageDescription: state => {
        return state.data.info?.long_description?.length > 0 ? parseHtmlArray(state.data.info?.long_description) : null
    },
    categoryIntroduction: state => {
        if(state.data?.items?.length) {
            const itemIntroduction = state.data.items[0].subcategory.category.introduction
            return itemIntroduction.length > 0 ? itemIntroduction : null
        }
    },
    categoryDescription: state => state.data?.items?.length && parseHtmlArray(state.data.items[0].subcategory.category.description),
    subcategoryIntroduction: state => {
        if(state.data?.items?.length) {
            const itemIntroduction = state.data.items[0].subcategory.introduction
            return itemIntroduction.length > 0 ? itemIntroduction : null
        }
    },
    subcategoryDescription: state => state.data?.items?.length && parseHtmlArray(state.data.items[0].subcategory.description),
    categoryPageTitle: state => {
        if(state.data?.items?.length) {
            return state.data.items[0].subcategory?.category?.page_title ?? null
        }
    },
    subcategoryPageTitle: state => {
        if(state.data?.items?.length) {
            return state.data.items[0].subcategory?.page_title ?? null
        }
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
    },
    ADD_MORE_NEWS(state, news) {
        const newData = {...state.data}
        newData.items = [...newData.items, ...news]
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
    async addMoreNews({ commit }, { data }) {
        commit('ADD_MORE_NEWS', data.items)
    }
}
