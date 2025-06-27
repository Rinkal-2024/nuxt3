import IMAGE_SIZES from '~/constants/imageSizes'

/**
 * Generates an image srcset string from an image object
 * @param image - Image object with .original.url
 * @param height - Optional height override
 * @returns Srcset string
 */
export function getImageSrcSet(image: { original: { url: string } }, height = 0): string {
  if (!image?.original?.url) return ''
  
  return getImageSrcSetFromUrl(image.original.url, height)
}

/**
 * Generates image srcset directly from a raw image URL
 * @param url - Raw image URL
 * @param height - Optional height
 * @returns Srcset string
 */
export function getImageSrcSetFromUrl(url: string, height = 0): string {
  if (!url) return ''

  const path = url
    .replace('media-staging', 'media2')
    .replace('https://media2.insideweddings.com/', '')
    .replace('https://d1zpvjny0s6omk.cloudfront.net/media/', '')

  const fnc = height ? '' : 'fit-in/'
  const result = Object.entries(IMAGE_SIZES)
    .map(([_, width]) =>
      `https://icdn2.insideweddings.com/${fnc}${width}x${height}/filters:quality(60)/filters:no_upscale()/filters:strip_icc()/${path} ${width}w`
    )
    .join(', ')

  return result
}

/**
 * Generates responsive `sizes` attribute string for an image
 * @param imageWidthPercentage - Width of the image in vw (default: 100)
 * @param prefix - Optional prefix for sizes
 * @returns Sizes attribute string
 */
export function getImageSizes(imageWidthPercentage = 100, prefix = ''): string {
  const dprMid = Math.round(0.6666 * imageWidthPercentage)
  const dprHigh = Math.round(0.5 * imageWidthPercentage)

  return `${prefix}(-webkit-min-device-pixel-ratio: 1.5) ${dprMid}vw,
    (min-resolution: 144dpi) ${dprMid}vw,
    (min-resolution: 1.5dppx) ${dprMid}vw,
    (-webkit-min-device-pixel-ratio: 3) ${dprHigh}vw,
    (min-resolution: 288dpi) ${dprHigh}vw,
    (min-resolution: 3dppx) ${dprHigh}vw,
    ${imageWidthPercentage}vw`
}
