import { groupBy } from '~/utils/array'
import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,
    image: state => state.meta?.image || state.data.items[0].image,
    colors: state => state.data.items[0].colors,
    category: state => state.data.items[0].category,
    description: state => state.data.items[0].description,
    vendors: state => {
        const grouped = groupBy(state.data.items[0].vendors, x => x.categories[0].name)

        return Object.keys(grouped).map(label => {
            return {
                label: label.toUpperCase(),
                items: grouped[label]
            }
        })
    },
    originalPostRoute: state => {
        const photo = state.data.items[0]
        if(photo.original_post.type === 'weddings.WeddingPage') {
            return {
                name: 'weddings-slug-articleId',
                params: {
                    slug: photo.original_post.slug,
                    articleId: photo.original_post.id,
                }
            }
        } else if (photo.original_post.type === 'news.NewsPage') {
            return {
                name: 'news-category-news-newsId',
                params: {
                    category: photo.original_post.subcategory?.category.slug,
                    news: photo.original_post.slug,
                    newsId: photo.original_post.id
                }
            }
        } else if (photo.original_post.type === 'vendors.VendorPage') {
            return {
                name: 'biz-slug-id',
                params: {
                    slug: photo.original_post.slug,
                    id: photo.original_post.id
                }
            }
        }
    },
    title: state => state.data.items[0].image.title
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

    }
}
