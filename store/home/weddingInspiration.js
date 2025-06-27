// store/home/weddingInspiration.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeWeddingInspirationStore = defineStore('homeWeddingInspiration', () => {
  // state
  const data = ref([])

  // getters
  const items = computed(() => {
    return data.value.map(item => ({
      id: item.id,
      title: item.name,
      image: item.image,
      linkTo: item.slug
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
