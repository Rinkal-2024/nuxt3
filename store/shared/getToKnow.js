import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGetToKnowStore = defineStore('getToKnow', () => {
  const data = ref([])

  const items = computed(() => {
    if (!Array.isArray(data.value)) return []

    return data.value.map(item => ({
      key: item.id,
      image: item.main_image?.image || '',
      title: item.title || '',
      category: item.categories?.[0]?.name || '',
      categorySlug: item.categories?.[0]?.slug || '',
      description: item.description
        ? item.description.substring(0, 127) + '...'
        : '',
      link: item.slug || ''
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
