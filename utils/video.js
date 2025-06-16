// This regex does not work on safari and blows up the whole page
// const youtubeRegexp = /(?<=embed\/).*(?=\/)/

/**
 *
 * @param url {string}
 * @returns id {string}
 */
function getVideoIdFromURL(url) {
    return url
        .split('embed/')[1]
        .split('/')[0]
}

export { getVideoIdFromURL }
