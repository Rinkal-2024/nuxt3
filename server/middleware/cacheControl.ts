// cacheControl.js
export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname

  const cacheForStaticAssets = /\.(jpg|jpeg|gif|css|png|js|ico|svg|mjs)$/i

  if (cacheForStaticAssets.test(url)) {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000')
  } else {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=60, stale-while-revalidate=15768000')
  }
})

  