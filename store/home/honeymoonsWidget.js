// store/home/honeymoonsWidget.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHomeHoneymoonsWidgetStore = defineStore('homeHoneymoonsWidget', () => {
  const data = ref({})

  // You can add getters here, e.g.:
  // const someGetter = computed(() => ...)

  function hydrate(newData) {
    data.value = newData
  }

  return {
    data,
    hydrate
  }
})
