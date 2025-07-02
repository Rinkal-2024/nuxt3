import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeWeddingInspirationStore = defineStore('homeWeddingInspiration', () => {
  const data = ref([])

  const items = computed(() => {
    return data.value.map(item => ({
      id: item.id,
      title: item.name,
      image: item.image,
      linkTo: item.slug
    }))
  })

  function hydrate(newData) {
    data.value = newData ?? []
  }

  return {
    data,
    items,
    hydrate
  }
})
