// store/home/locationsWeLove.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeLocationsWeLoveStore = defineStore('homeLocationsWeLove', () => {
  // state
  const data = ref([])

  // getters
  const items = computed(() => {
    if (!data.value) return []

    return data.value.map(item => ({
      key: item.id,
      image: item.main_image.image,
      title: item.title,
      category: item.categories[0]?.name,
      categorySlug: item.categories[0]?.slug,
      description: item.description?.substring(0, 127) + '...',
      link: item.slug
    }))
  })

  // actions
  function hydrate(newData) {
    data.value = newData ?? []
  }

  return {
    data,
    items,
    hydrate
  }
})
