import { defineStore } from 'pinia'

export const useLatestNewsStore = defineStore('latestNews', {
  state: () => ({
    data: [] as any[]
  }),

  getters: {
    categories: (state) => {
      const seen = new Set()
      const categories = state.data
        .map(article => article.subcategory.category)
        .filter(category => {
          if (seen.has(category.id)) return false
          seen.add(category.id)
          return true
        })
        .sort((a, b) => a.sort_order - b.sort_order)

      return categories
    },

    articles: (state): { id: number; articles: any[] }[] => {
      const result: { id: number; articles: any[] }[] = []

      const categories = new Set(
        state.data.map(article => article.subcategory.category.id)
      )

      categories.forEach(categoryId => {
        const categoryArticles = state.data
          .filter(article => article.subcategory.category.id === categoryId)
          .map(article => ({
            id: article.id,
            category: article.subcategory.category,
            title: article.title,
            subtitle: article.subtitle,
            description: article.description,
            image: article.main_image?.image,
            linkTo: `/news/${article.subcategory.category.slug}/${article.slug}/${article.id}`
          }))

        result.push({ id: categoryId, articles: categoryArticles })
      })

      return result
    }
  },

  actions: {
    hydrate(data: any[]) {
      this.data = data ?? []
    }
  }
})
