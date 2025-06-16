import { fetch } from 'ofetch' // works natively in Nuxt 3

const TTL = 60 * 60 * 1000 // 1 hour in ms

let redirects: Record<string, string> = {}
let redirectsEtag: string | null = null
let lastFetchDate: Date | null = null

async function fetchRedirectFile() {
  const url = `https://${process.env.REDIRECTS_BUCKET_NAME}.s3.us-west-2.amazonaws.com/${process.env.REDIRECTS_FILE_NAME}`
  const headers: Record<string, string> = {}

  if (redirectsEtag) {
    headers['If-None-Match'] = redirectsEtag
  }

  const response = await fetch(url, { headers })

  if (response && response.status !== 304) {
    const data = await response.json().catch(() => ({}))
    redirects = data || {} // fallback in case of an empty file
    redirectsEtag = response.headers.get('etag')
  }

  lastFetchDate = new Date()
}

async function revalidateRedirectFile() {
  if (!lastFetchDate || (Date.now() - lastFetchDate.getTime() > TTL)) {
    await fetchRedirectFile()
  }
}

// Initial load on server start
 fetchRedirectFile()

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname

  const redirectTo = redirects[url]

  if (redirectTo) {
    return sendRedirect(event, redirectTo, 301)
  }

  // Revalidate in background (non-blocking)
  revalidateRedirectFile().catch(console.error)
})
