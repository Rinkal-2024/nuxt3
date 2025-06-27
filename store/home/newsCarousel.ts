import { defineStore } from 'pinia'

export const useHomeNewsCarouselStore = defineStore('homeNewsCarousel', {
  state: () => ({
    data: [] as any[]
  }),
  getters: {
    items: (state) => state.data.map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      image: item.main_image?.image,
      linkTo: `/news/${item.subcategory.category.slug}/${item.slug}/${item.id}`
    }))
  },
  actions: {
    hydrate(data: any[]) {
      this.data = data ?? []
    }
  }
})
