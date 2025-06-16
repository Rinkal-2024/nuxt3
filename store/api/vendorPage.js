import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,

    images: state => state.data.images,
    landscapeGalleryImages: state => state.data.images.filter(image => image.image.original.height <= image.image.original.width).slice(0, 10),
    videos: state => state.data.videos,

    website: state => state.data.website,
    name: state => state.data.name,
    briefSummary: state => state.data.brief_summary,
    isVenue: state => state.data.is_venue,
    socials: state => state.data.social_medias,
    venuePlaces: state => state.data.venues,
    phone: state => state.data.phone,
    category: state => state.data.category,
    fullAddress: state => {
        const address = state.data.address
        return `${address.address1 ? address.address1 + ', ' : ''}${
            address.city
                ? `${address.city}, ${address.region}, ${address.country}${
                    address.zipCode ? `, ${address.zipCode}` : ''
                }`
                : ''
        }`
    },
    portfolio: state => state.data.portfolio,
    description: state => state.data.description,
    relatedWeddings: state => state.data.weddings.map(wedding => ({
        ...wedding,
        image: wedding.main_image.image,
        category: wedding.event_type_display
    })),
    structuredData: state => (
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": state.data.name, //vendor name
            "image": state.data.images[0]?.image.original.url || '', // URL of one picture from vendors gallery
            "@id": state.data.website,  // vendor website
            "url": state.data.website, // vendor website
            "telephone": state.data.phone, // vendor telephone
            "address": {
                "@type": "PostalAddress",
                "streetAddress": state.data.address.address1 || '',
                "addressLocality": state.data.address.city || '',
                "addressRegion": state.data.address.region || '',
                "postalCode": state.data.address.zipCode || '',
                "addressCountry": state.data.address.country || ''
            }
        }
    ),
    sideDescription: state => state.data.side_description,
    news: state => state.data.news,
    venueDetails: state => ([
        {label: 'Category', value: state.data.event_type_display.join(' & ')},
        {label: 'Location type', value: state.data.location_type_display},
        {label: 'Capacity range', value: state.data.capacity_range_display[0]},
        {label: 'Setting / View', value: state.data.view_display},
        {label: 'Alcohol & Beverages', value: state.data.alcohol_and_beverages?'Provided':'Not provided'},
    ])
}

export const mutations = {

    SET_META(state, meta) {
        state.meta = meta
    },

    SET_DATA(state, data) {
        const newData = { ...data }
        Object.freeze(newData)
        state.data = newData
    }

}

export const actions = {
    async hydrate({ dispatch, commit, getters }, { meta, data, portfolio, category }) {

        commit('SET_META', meta[0] ?? null)

        data.portfolio = portfolio.items

        data.category = category

        commit('SET_DATA', data ?? null)

        // Elements' hydration

    },

    async addPortfolioPhotos({commit, state}, photos) {
        const data =  {...state.data}
        data.portfolio = [...data.portfolio, ...photos]
        commit('SET_DATA', data)
    }
}
