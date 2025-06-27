// store/home/newRealWeddings.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeNewRealWeddingsStore = defineStore('homeNewRealWeddings', () => {
  // state
  const data = ref([])

  // getters
  const items = computed(() => {
    if (!data.value) return []

    return data.value.map(article => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      category: article.event_type_display,
      image: article.main_image.image,
      linkTo: article.slug
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
