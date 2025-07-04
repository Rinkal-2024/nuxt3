import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeHoneymoonsWidgetStore = defineStore('homeHoneymoonsWidget', () => {
  const data = ref([])

  const items = computed(() => {
    return data.value.map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      image: item.main_image?.image || '',
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
