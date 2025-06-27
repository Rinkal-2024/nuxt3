// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import { sortAlphabetically } from '~/utils/array'
// import { generateMeta } from '~/utils/seo'

// // Import other stores if needed
// import { useHomeNewsCarouselStore } from '../home/newsCarousel'
// import { useHomeLatestNewsStore } from '../home/latestNews'
// import { useHomeWeddingsCarouselStore } from '../home/weddingsCarousel'
// import { useHomeHoneymoonsWidgetStore } from '../home/honeymoonsWidget'
// import { useHomeNewRealWeddingsStore } from '../home/newRealWeddings'
// import { useHomeWeddingInspirationStore } from '../home/weddingInspiration'
// import { useHomeLocationsWeLoveStore } from '../home/locationsWeLove'
// // import { useSharedGetToKnowStore } from '../home/latestNews'

// export const useApiHomeStore = defineStore('apiHome', () => {
//   // state
//   const meta = ref(null)
//    const data = ref({
//     home: {
//       newsCarousel: [],
//       latestNews: [],
//       weddingsCarousel: [],
//       honeymoonWidget: [],
//       newWeddings: [],
//       weddingInspiration: [],
//       locationWidget: [],
//       vendorWidget: []
//     }
//   })

//   // getters
//   const head = computed(() => generateMeta(meta.value))
//   const vendorTypes = computed(() => {
//     if (!data.value?.vendor_categories) return []
//     return sortAlphabetically(data.value.vendor_categories, c => c.name)
//   })
//   const structuredData = computed(() => ({
//     '@context': 'https://schema.org',
//     '@type': 'WebSite',
//     'url': 'https://donew.insideweddings.com',
//     'potentialAction': {
//       '@type': 'SearchAction',
//       'target': 'https://donew.insideweddings.com/global_search/?query={search_term_string}',
//       'query-input': 'required name=search_term_string'
//     }
//   }))

//   // hydrate action
//   async function hydrate({ meta: metaData, data: dataItems }) {
//     meta.value = metaData?.[0] ?? null
//     data.value = dataItems?.items?.[0] ?? null

//     // Make sure to hydrate the home data if necessary
//     if (data.value) {
//       data.value.home = data.value.home || {}
//     }

//     // Dispatch hydrate on child stores
//     useHomeNewsCarouselStore().hydrate(data.value?.home?.newsCarousel)
//     useHomeLatestNewsStore().hydrate(data.value?.latest_news)
//     useHomeWeddingsCarouselStore().hydrate(data.value?.weddings_carousel)
//     useHomeHoneymoonsWidgetStore().hydrate(data.value?.honeymoon_widget)
//     useHomeNewRealWeddingsStore().hydrate(data.value?.new_weddings)
//     useHomeWeddingInspirationStore().hydrate(data.value?.gallery_categories)
//     useHomeLocationsWeLoveStore().hydrate(data.value?.location_widget)
//     // useSharedGetToKnowStore().hydrate(data.value?.vendor_widget)
//   }

//   return {
//     meta,
//     data,
//     head,
//     vendorTypes,
//     structuredData,
//     hydrate
//   }
// })
// import { defineStore } from 'pinia'
// import { generateMeta } from '~/utils/seo'
// import { useHomeNewsCarouselStore } from '../home/newsCarousel'

// export const useApiHomeStore = defineStore('apiHome', {
//   state: () => ({
//     meta: null as any,
//     data: null as any
//   }),
//   getters: {
//     head: state => generateMeta(state.meta),
//     structuredData: () => ({
//       '@context': 'https://schema.org',
//       '@type': 'WebSite',
//       'url': 'https://donew.insideweddings.com',
//       'potentialAction': {
//         '@type': 'SearchAction',
//         'target': 'https://donew.insideweddings.com/global_search/?query={search_term_string}',
//         'query-input': 'required name=search_term_string'
//       }
//     })
//   },
//   actions: {
//     async hydrate({ meta, data }: { meta: any, data: any }) {
//       this.meta = meta
//       this.data = data?.items?.[0] ?? {}

//       // Now hydrate sub-stores
//       useHomeNewsCarouselStore().hydrate(this.data.news_carousel)
//       // Other stores would be hydrated similarly...
//     }
//   }
// })
import { defineStore } from 'pinia'
import { generateMeta } from '~/utils/seo'
import { useHomeNewsCarouselStore } from '../home/newsCarousel'

export const useApiHomeStore = defineStore('apiHome', {
  state: () => ({
    meta: null as any,
    data: null as any
  }),
  getters: {
    head: state => generateMeta(state.meta),
    structuredData: () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': 'https://donew.insideweddings.com',
     'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://donew.insideweddings.com/global_search/?query={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    })
  },
  actions: {
    async hydrate({ meta, data }: { meta: any, data: any }) {
      this.meta = meta?.[0] ?? null
      const record = data?.items?.[0] ?? {}
      this.data = record

      // Hydrate all sub-stores exactly like in your Vuex version:
      useHomeNewsCarouselStore().hydrate(record.news_carousel)
      // ...hydrate other stores similarly
    }
  }
})
