import { defineStore } from 'pinia'

export const useNewsletterStore = defineStore('newsletter', {
  state: () => ({
    data: 'TEST DATA',
  }),
  getters: {
    magazineCover: (state) => state.data && state.data[0]?.image,
    currentData: (state) => state.data,
  },
  actions: {
    async hydrate(payload) {
      this.data = payload.data ?? { error: 'not found' }
    },
  },
})
