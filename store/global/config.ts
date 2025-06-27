import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: (): {
    isMobile: boolean,
    currentOffsetTop: number,
    isScrollingUp: boolean,
    windowWidth: number,
    colorIdSelected: number | null,
    isNewsletterModalOpen: boolean,
    isGoogleBot: boolean,
    isAmpRedirected: boolean,
  } => ({
    isMobile: true,
    currentOffsetTop: 0,
    isScrollingUp: false,
    windowWidth: 1200,
    colorIdSelected: null,
    isNewsletterModalOpen: false,
    isGoogleBot: false,
    isAmpRedirected: false,
  }),

  getters: {
    isDesktop: (state) => !state.isMobile,
  },

  actions: {
    windowSizeChanged(windowSize: number) {
      this.windowWidth = windowSize
      this.isMobile = windowSize < 1024
    },
    scrollingPositionChanged(offsetTop: number) {
      const isScrollingUp = this.currentOffsetTop > offsetTop
      if (isScrollingUp !== this.isScrollingUp) {
        this.isScrollingUp = isScrollingUp
      }
      this.currentOffsetTop = offsetTop
    },
    updateColorIdSelected(colorId: number | null) {
      this.colorIdSelected = colorId
    },
    openNewsletterModal() {
      document.cookie = 'NewsletterSubscribed=true'
      setTimeout(() => {
        this.isNewsletterModalOpen = true
      }, 0)
    },
    closeNewsletterModal() {
      this.isNewsletterModalOpen = false
    },
    setAmpRedirected() {
      this.isAmpRedirected = true
    },
  },
})


// export const state = () => ({
//     isMobile: true,
//     currentOffsetTop: 0,
//     isScrollingUp: false,
//     windowWidth: 1200,
//     colorIdSelected: null,
//     isNewsletterModalOpen: false,
//     isGoogleBot: false,
//     isAmpRedirected: false,
// })

// export const getters = {
//     isMobile: state => state.isMobile,
//     isGoogleBot: state => state.isGoogleBot,
//     currentOffsetTop: state => state.currentOffsetTop,
//     isScrollingUp: state => state.isScrollingUp,
//     windowWidth: state => state.windowWidth,
//     colorIdSelected: state => state.colorIdSelected,
//     isNewsletterModalOpen: state => state.isNewsletterModalOpen,
//     isAmpRedirected: state => state.isAmpRedirected
// }

// export const mutations = {
//     CHANGE_IS_GOOGLE_BOT(state, isGoogleBot) {
//         state.isGoogleBot = isGoogleBot
//     },
//     CHANGE_IS_MOBILE(state, isMobile) {
//         state.isMobile = isMobile
//     },
//     CHANGE_CURRENT_OFFSET_TOP(state, currentOffsetTop) {
//         state.currentOffsetTop = currentOffsetTop
//     },
//     CHANGE_IS_SCROLLING_UP(state, isScrollingUp) {
//         state.isScrollingUp = isScrollingUp
//     },
//     CHANGE_WINDOW_WIDTH(state, windowWidth) {
//         state.windowWidth = windowWidth
//     },
//     CHANGE_COLOR_ID_SELECTED(state, colorId) {
//         state.colorIdSelected = colorId
//     },
//     CHANGE_IS_NEWSLETTER_MODAL_OPEN(state, isNewsletterModalOpen) {
//         state.isNewsletterModalOpen = isNewsletterModalOpen
//     },
//     CLOSE_NEWSLETTER_MODAL(state) {
//         state.isNewsletterModalOpen = false
//     },
//     SET_AMP_REDIRECTED(state) {
//         state.isAmpRedirected = true
//     }
// }

// export const actions = {
//     windowSizeChanged({commit}, windowSize) {
//         commit('CHANGE_WINDOW_WIDTH', windowSize)
//         commit('CHANGE_IS_MOBILE', windowSize < 1024)
//     },
//     scrollingPositionChanged({commit, state}, offsetTop) {

//         const isScrollingUp = state.currentOffsetTop > offsetTop

//         if (isScrollingUp !== state.isScrollingUp) {
//             commit('CHANGE_IS_SCROLLING_UP', isScrollingUp)
//         }

//         commit('CHANGE_CURRENT_OFFSET_TOP', offsetTop)

//     },
//     updateColorIdSelected({commit}, colorId) {
//         commit('CHANGE_COLOR_ID_SELECTED', colorId)
//     },
//     openNewsletterModal({commit}) { // Action with 0ms timeout to bypass handler errors. Trust me.
//         document.cookie = 'NewsletterSubscribed=true'
//         setTimeout(() => {
//             commit('CHANGE_IS_NEWSLETTER_MODAL_OPEN', true)
//         }, 0)
//     }
// }
