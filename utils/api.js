import { isIterableObject } from '~/utils/object'
import { camelCaseToSnakeCase } from '~/utils/string'
import { useRuntimeConfig } from '#app'

/**
 * Convert camelCase keys to snake_case query string
 * @param {Object} params
 * @param {Boolean} prependWithQuestionMark
 * @return {string}
 */
export const createParamsString = function (params = {}, prependWithQuestionMark = true) {
  const computed = Object.keys(params).reduce((paramsString, currentParamName) => {
    const parsedName = camelCaseToSnakeCase(currentParamName)
    const value = params[currentParamName]
    const attachParam = val => (paramsString += `${parsedName}=${val}&`)

    if (Array.isArray(value)) {
      value.forEach(val => val && attachParam(val))
    } else if (isIterableObject(value)) {
      Object.values(value).forEach(val => val && attachParam(val))
    } else {
      attachParam(value)
    }

    return paramsString
  }, prependWithQuestionMark ? '?' : '')

  return encodeURI(computed.slice(0, -1))
}

/**
 * Fetch multiple endpoints in parallel
 * @param {string[]} endpoints
 * @returns {Promise<any[]>}
 */
export const requestData = async function (...endpoints) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  console.debug('Requesting data from API:', baseUrl ,endpoints)
  return await Promise.all(
    endpoints.map(endpoint => $fetch(`${baseUrl}${endpoint}`))
  )
}

/**
 * Get SEO meta API URI for a given route
 * @param req
 * @param route
 * @returns {string}
 */
export const getMetaUri = function (req, route) {
  let url = req ? req._parsedUrl.pathname : route.path

  if (!url.endsWith('/')) {
    url += '/'
  }

  // Normalize AMP paths
  url = url.replace('/amp/', '/')

  return `seo_meta_data/?path=${url}`
}

/**
 * Maps an array of API items to select input options
 * @param {[]} items
 * @returns {[]}
 */
export const mapOptionsFromApiItems = function (items) {
  return items.map(item => ({
    label: item.name,
    value: item.id,
  }))
}

/**
 * POST form data to an API endpoint
 * @param {string} endpoint - relative to base API URL
 * @param {Object} formData - data to send
 * @returns {Promise<any>}
 */
export const postFormData = async function (endpoint, formData) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))?.split('=')[1]

  const headers = {
    'Content-Type': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
  }

  return await $fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    body: formData,
    headers,
  })
}
