import { groupBy } from '~/utils/array'
import {basePath} from "~/constants/basePath";
import { generateMeta } from '~/utils/seo'

export const state = () => ({
    meta: null,
    data: null
})

export const getters = {
    head: state => generateMeta(state.meta),
    data: state => state.data,
    colors: state => state.data?.colors,

    galleryImages: state => state.data?.images,
    landscapeGalleryImages: state => state.data?.images.filter(image => image.image.original.height <= image.image.original.width).slice(0, 10),

    galleryVideos: state => state.data?.videos,

    articleTitle: state => state.data?.title,
    articleSubtitle: state => state.data?.subtitle,

    articleAuthor: state => state.data?.byline,

    bodyHTML: state => state.data?.body,

    highlights: state => ([
        {
            label: 'Season',
            value: state.data.season_type_display,
            linkTo: `/weddings/search/category/season_type/${state.data.season_type}`,
        },
        {
            label: 'Setting / View',
            value: state.data.views_display,
            linkTo: `/weddings/search/category/views/${state.data.views}`,
        },
        {
            label: 'Style',
            value: state.data.style_type_display,
            linkTo: `/weddings/search/category/style_type/${state.data.style_type}`,
        },
        {
            label: 'Event type',
            value: state.data.event_type_display,
            linkTo: `/weddings/search/category/event_type/${state.data.event_type}`,
        },
        {
            label: 'Location',
            value: state.data.location_type_display,
            linkTo: `/weddings/search/category/location_type/${state.data.location_type}`,
        }
    ]),

    next: state => {
        if (!state.data.next) {
            return null
        }

        return {
            ...state.data.next,
            image: state.data.next.main_image.image,
            linkTo: {
                name: 'weddings-slug-articleId',
                params: {
                    slug: state.data.next.slug,
                    articleId: state.data.next.id
                }
            },
            label: 'NEXT WEDDING'
        }
    },
    previous: state => {
        if (!state.data.previous) {
            return null
        }

        return {
            ...state.data.previous,
            image: state.data.previous.main_image.image,
            linkTo: {
                name: 'weddings-slug-articleId',
                params: {
                    slug: state.data.previous.slug,
                    articleId: state.data.previous.id
                }
            },
            label: 'PREVIOUS WEDDING'
        }
    },

    viewAllPhotosLink: state => ({
        name: 'weddings-slug-articleId-images-gallery',
        params: {
            slug: state.data.slug,
            articleId: state.data.id
        }
    }),

    moreWeddings: state => ([
        ...state.data.more_weddings.map(wedding => ({
            ...wedding,
            image: wedding.main_image.image,
            linkTo: {
                name: 'weddings-slug-articleId',
                params: {
                    slug: wedding.slug,
                    articleId: wedding.id
                }
            }
        }))
    ]),

    relatedVendors: state => {
        const topLevelVendors = state.data.vendors.filter(v => {
            return state.data.resources?.find(r => r.vendor?.id === v.id).vendor?.membership?.account_type === 'TOP_LEVEL'
        })
        return [
            ...topLevelVendors.map(vendor => ({
                ...vendor,
                image: vendor.main_image.image,
                location: vendor.city.display_name
            }))
        ]
    },

    showRelatedVendors: (state, getters) => getters.relatedVendors.length > 0,

    resources: state => {
        const grouped = groupBy(state.data.resources, x => x.category.name)

        return Object.keys(grouped).sort().map(label => {
            return {
                label,
                items: grouped[label]
            }
        })
    }

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
    async hydrate({ dispatch, commit, getters }, { meta, data }) {

        commit('SET_META', meta[0] ?? null)

        commit('SET_DATA', data ?? null)

        // Elements' hydration

        //dispatch('home/locationsWeLove/hydrate', getters.sections['venues-only-widget'], { root: true })
        //
        //dispatch('shared/getToKnow/hydrate', getters.sections['vendors-only-widget'], { root: true })

    }
}
