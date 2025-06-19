// stores/config.ts
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    isMobile: false,
    currentOffsetTop: 0,
    isScrollingUp: false
  }),
  actions: {
    setIsMobile(value: boolean) {
      this.isMobile = value
    },
    setOffsetTop(value: number) {
      this.currentOffsetTop = value
    },
    setScrollingUp(value: boolean) {
      this.isScrollingUp = value
    }
  }
})

export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})


