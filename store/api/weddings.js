import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: {
        title: '',
        description: '',
        keywords: '',
        path: '/weddings/',
        image: ''
    },
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,
    items: state => state.data?.items?.map(item => {
        return {
            id: item.id,
            title: item.title,
            linkTo: {
                name: 'weddings-slug-articleId',
                params: {
                    slug: item.slug,
                    articleId: item.id
                }
            },
            category: item?.wedding_city?.display_name,
            images: item?.images_preview.map(image => image.image)
        }
    }),
    sections: state => state.data?.sections,
    colors: state => state.data?.sections?.colors,
    totalPages: state => (Math.ceil(state.data.meta.total_count / 11)),
    landingPageTitle: state => state.data?.info?.title || 'Weddings - Ideas & Inspiration',
    landingPageSubtitle: state => state.data?.info?.subtitle || 'The latest inspiring wedding events on insideweddings.com',
    landingPageIntroduction: state => state.data?.info?.description,
    landingPageDescription: state => state.data?.info?.long_description

}

export const mutations = {

    SET_META(state, meta) {
        state.meta.title = meta?.title || state.meta?.title || ''
        state.meta.description = meta?.description || state.meta?.description || ''
        state.meta.keywords = meta?.keywords || state.meta?.keywords || ''
        state.meta.path = meta?.path || state.meta?.path || ''
        state.meta.image = meta?.image || state.meta?.image || ''
    },

    SET_DATA(state, data) {
        const newData = { ...data }
        Object.freeze(newData)
        state.data = newData
    }

}

export const actions = {
    async hydrate({ dispatch, commit, getters }, { meta, data }) {

        commit('SET_META', meta[0] ?? meta ?? null)

        if (data) {
            commit('SET_DATA', data ?? null)

            dispatch('home/locationsWeLove/hydrate', getters.sections['venues-only-widget'], { root: true })

            dispatch('shared/getToKnow/hydrate', getters.sections['vendors-only-widget'], { root: true })
        }
    },

    addMoreWeddings ({commit, state}, weddings) {
        const data =  {...state.data}
        data.items = [...data.items, ...weddings]
        commit('SET_DATA', data)
    }
}
