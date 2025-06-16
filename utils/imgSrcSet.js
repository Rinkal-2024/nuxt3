import IMAGE_SIZES from "~/constants/imageSizes";

/**
 * Generates image Src Set based on images sizes
 * @param {Object} image
 * @param {Integer} height
 * @return {String} relatedVendorCategory
 */
function getImageSrcSet(image, height = 0) {
    return getImageSrcSetFromUrl(image.original.url, height);
}

function getImageSrcSetFromUrl(url, height = 0) {

    const path = url.replace('media-staging', 'media2').replace('https://media2.insideweddings.com/','').replace('https://d1zpvjny0s6omk.cloudfront.net/media/','')
    var result = '';
    var fnc = 'fit-in/'
    if(height) {
        fnc = ''
    }
    for (const [key, value] of Object.entries(IMAGE_SIZES)) {
        result += `https://icdn2.insideweddings.com/${fnc}${value}x${height}/filters:quality(60)/filters:no_upscale()/filters:strip_icc()/${path} ${value}w, `
    }
    return result.replace(/,\s*$/, "")
}

function getImageSizes(imageWidthPercentage = 100, prefix = '') {
    const dprMid = Math.round(0.6666 * imageWidthPercentage);
    const dprHigh = Math.round(0.5 * imageWidthPercentage); 
    return `${prefix}(-webkit-min-device-pixel-ratio: 1.5) ${dprMid}vw,(min-resolution: 144dpi) ${dprMid}vw,(min-resolution: 1.5dppx) ${dprMid}vw,(-webkit-min-device-pixel-ratio: 3) ${dprHigh}vw,(min-resolution: 288dpi) ${dprHigh}vw,(min-resolution: 3dppx) ${dprHigh}vw, ${imageWidthPercentage}vw`
}

export { getImageSrcSet, getImageSrcSetFromUrl, getImageSizes }
