import { defineStore } from 'pinia'
import { generateMeta } from '~/utils/seo'
import { parseHtmlArray } from '~/utils/html'
import { shuffleArray } from '~/utils/array'

export const useNewsStore = defineStore('news', {
  state: () => ({
    meta: null as any | null,
    data: null as any | null,
  }),

  getters: {
    head(state) {
      return generateMeta(state.meta)
    },
    data(state) {
      return state.data
    },

    items(state) {
      return state.data?.items || []
    },

    weddingTipsFromTheProsItems(state) {
      return state.data?.sections?.['extra-news-widget']?.map((item: any) => ({
        ...item,
        image: item.main_image.image,
        linkTo: item.slug
      })) || []
    },

    getMoreAdviceFromItems(state) {
      return state.data?.sections?.['vendors-widget']?.map((item: any) => ({
        ...item,
        image: item.main_image.image,
        slug: item.slug,
        linkTo: item.slug,
        category: item.categories?.[0]?.name,
        categorySlug: item.categories?.[0]?.slug,
        description: item.description?.substring(0, 127) + '...',
      })) || []
    },

    totalPages(state) {
      if (!state.data?.meta?.total_count) return 0
      return Math.ceil(state.data.meta.total_count / 10)
    },

    introduction(state) {
      return state.meta?.introduction || ''
    },

    description(state) {
      return state.meta?.description || ''
    },

    vendors(state) {
      return shuffleArray(state.data?.vendors?.items || []).slice(0, 6)
    },

    categoryTitle(state) {
      return state.data?.categoryTitle || ''
    },

    landingPageTitle(state) {
      return state.data?.info?.title || ''
    },

    landingPageSubtitle(state) {
      return state.data?.info?.subtitle || ''
    },

    landingPageIntroduction(state) {
      const desc = state.data?.info?.description
      return desc && desc.length > 0 ? desc : null
    },

    landingPageDescription(state) {
      const longDesc = state.data?.info?.long_description
      return longDesc && longDesc.length > 0 ? parseHtmlArray(longDesc) : null
    },

    categoryIntroduction(state) {
      if (state.data?.items?.length) {
        const intro = state.data.items[0].subcategory.category.introduction
        return intro.length > 0 ? intro : null
      }
      return null
    },

    categoryDescription(state) {
      if (state.data?.items?.length) {
        return parseHtmlArray(state.data.items[0].subcategory.category.description)
      }
      return null
    },

    subcategoryIntroduction(state) {
      if (state.data?.items?.length) {
        const intro = state.data.items[0].subcategory.introduction
        return intro.length > 0 ? intro : null
      }
      return null
    },

    subcategoryDescription(state) {
      if (state.data?.items?.length) {
        return parseHtmlArray(state.data.items[0].subcategory.description)
      }
      return null
    },

    categoryPageTitle(state) {
      if (state.data?.items?.length) {
        return state.data.items[0].subcategory?.category?.page_title ?? null
      }
      return null
    },

    subcategoryPageTitle(state) {
      if (state.data?.items?.length) {
        return state.data.items[0].subcategory?.page_title ?? null
      }
      return null
    }
  },

  actions: {
    hydrate(payload: { meta: any[], data: any }) {
      this.meta = payload.meta?.[0] ?? null
      // Freeze the data object to keep immutability
      this.data = Object.freeze({ ...payload.data })
    },

    addMoreNews(payload: { data: any }) {
      if (!this.data) return
      const newData = { ...this.data }
      newData.items = [...newData.items, ...payload.data.items]
      this.data = Object.freeze(newData)
    }
  }
})
