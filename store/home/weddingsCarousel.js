import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeddingsCarouselStore = defineStore('homeWeddingsCarousel', () => {
  const data = ref([])

  const items = computed(() =>
    data.value.map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      image: item.main_image.image,
      linkTo: item.slug
    }))
  )

  function hydrate(newData) {
    data.value = newData ?? []
  }

  return {
    data,
    items,
    hydrate
  }
})
