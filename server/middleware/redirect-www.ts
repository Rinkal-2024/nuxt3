export default defineEventHandler((event) => {
  const host = getRequestHeader(event, 'host')
  const url = getRequestURL(event)
  const env = process.env.APP_ENV
  const forceDomain = 'donew.insideweddings.com'

  if (env === 'production' && host !== forceDomain) {
    return sendRedirect(event, `https://${forceDomain}${url.pathname}`, 301)
  }
})
