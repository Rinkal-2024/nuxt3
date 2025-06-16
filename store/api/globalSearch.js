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
    galleries: state => state.data?.galleries ?? [],
    news: state => (state.data?.news ?? []).map(article => ({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        description: article.description,
        image: article.main_image.image,
        linkTo: article.slug,
        subcategory: article.subcategory
    })),
    vendors: state => state.data?.vendors ?? [],
    weddings: state => state.data?.weddings ?? [],
    totalCount: state => state.data?.total_count ?? 0
}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },

    SET_DATA(state, data) {
        state.data = data
    },

    ADD_MORE_NEWS(state, news) {
        const newsIds = state.data.news.map(n => n.id)
        const filteredNews = news.filter(n => !newsIds.includes(n.id))

        if (filteredNews?.length) {
            state.data.news = [...state.data.news, ...filteredNews]
        }
    },

    ADD_MORE_VENDORS(state, vendors) {
        const vendorIds = state.data.vendors.map(v => v.id)
        const filteredVendors = vendors.filter(v => !vendorIds.includes(v.id))
        if (filteredVendors?.length) {
            state.data.vendors = [...state.data.vendors, ...filteredVendors]
        }
    },

    ADD_MORE_WEDDINGS(state, weddings) {
        const weddingIds = state.data.weddings.map(w => w.id)
        const filteredWeddings = weddings.filter(w => !weddingIds.includes(w.id))
        if (filteredWeddings?.length) {
            state.data.weddings = [...state.data.weddings, ...filteredWeddings]
        }
    },

    ADD_MORE_IMAGES(state, galleries) {
        const galleryIds = state.data.galleries.map(g => g.id)
        const filteredGalleries = galleries.filter(g => !galleryIds.includes(g.id))
        if (filteredGalleries?.length) {
            state.data.galleries = [...state.data.galleries, ...filteredGalleries]
        }
    },

}

export const actions = {
    async hydrate({dispatch, commit, getters}, {meta, data, category}) {

        if (category) {
            data = {
                [category]: data.items,
                total_count: data.meta.total_count
            }
        }

        commit('SET_META', meta[0] ?? null)

        commit('SET_DATA', data ?? null)

        // Elements' hydration

    }
}
