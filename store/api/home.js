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
    vendorTypes: state => sortAlphabetically(state.data.vendor_categories, c => c.name),
    structuredData: state => ({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': 'https://donew.insideweddings.com',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://donew.insideweddings.com/global_search/?query={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    })
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

        commit('SET_DATA', data?.items[0] ?? null)

        // Elements' hydration

        dispatch('home/newsCarousel/hydrate', getters.data.news_carousel, { root: true })

        dispatch('home/latestNews/hydrate', getters.data.latest_news, { root: true })

        dispatch('home/weddingsCarousel/hydrate', getters.data.weddings_carousel, { root: true })

        dispatch('home/honeymoonsWidget/hydrate', getters.data.honeymoon_widget, { root: true })

        dispatch('home/newRealWeddings/hydrate', getters.data.new_weddings, { root: true })

        dispatch('home/weddingInspiration/hydrate', getters.data.gallery_categories, { root: true })

        dispatch('home/locationsWeLove/hydrate', getters.data.location_widget, { root: true })

        dispatch('shared/getToKnow/hydrate', getters.data.vendor_widget, { root: true })

    }
}
