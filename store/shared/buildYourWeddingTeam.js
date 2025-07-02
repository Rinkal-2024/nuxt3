import { defineStore } from 'pinia'

export const useBuildYourWeddingTeamStore = defineStore('buildYourWeddingTeam', {
  state: () => ({
    data: []
  }),

  getters: {
    vendorCategories: (state) => state.data
  },

  actions: {
    hydrate(data) {
      this.data = data ?? []
    }
  }
})