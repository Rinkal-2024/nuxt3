import {basePath} from '~/constants/basePath'

const generateMetaTitle = title => {
    return [
        {
            hid: 'titleOg',
            property: 'og:title',
            content: title
        },
        {
            hid: 'titleTwitter',
            name: 'twitter:title',
            content: title
        }
    ]
}
const generateMetaDescription = description => {
    return [
        {
            hid: 'description',
            name: 'description',
            content: description
        },
        {
            hid: 'descriptionOg',
            property: 'og:description',
            content: description
        },
        {
            hid: 'descriptionTwitter',
            name: 'twitter:description',
            content: description
        }
    ]
}
const generateMetaImage = image => {
    return [
        {
            hid: 'imageOg',
            property: 'og:image',
            content: image?.medium?.url
        },
        {
            hid: 'imageTwitter',
            name: 'twitter:image',
            content: image?.medium?.url
        },
        {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            content: image?.alt
        }
    ]
}
const generateMetaUrl = url => {
    return [
        {
            hid: 'urlOg',
            property: 'og:url',
            content: url
        },
        {
            hid: 'urlTwitter',
            name: 'twitter:url',
            content: url
        }
    ]
}

const generateMeta = metaData => {
    const title = metaData?.title
    const link = [
        {
            rel: 'canonical',
            href: stripAmpFromUrl(basePath + metaData?.path)
        }
    ]
    let meta = []

    if (title) {
        meta = [
            ...meta,
            ...generateMetaTitle(metaData.title)
        ]
    }

    if (metaData?.description) {
        meta = [
            ...meta,
            ...generateMetaDescription(metaData.description)
        ]
    }

    if (metaData?.image) {
        meta = [
            ...meta,
            ...generateMetaImage(metaData.image)
        ]
    }

    meta = [
        ...meta,
        {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            hid: 'og:site_name',
            property: 'og:site_name',
            content: 'Inside Weddings.com'
        }
    ]

    return {
        title,
        meta,
        link,
    }
}

const stripAmpFromUrl = url => {
    return url.replace(/\/amp\//gim, '/')
}

export {generateMeta, stripAmpFromUrl}
