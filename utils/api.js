import { isIterableObject } from '~/utils/object'
import { camelCaseToSnakeCase } from '~/utils/string'
/**
 *
 * @param {Object} params
 * @param {Boolean} prependWithQuestionMark
 * @return {string}
 */
export const createParamsString = function (params = {}, prependWithQuestionMark = true) {
    const computed = Object.keys(params).reduce((paramsString, currentParamName) => {

        const parsedCurrentParamName = camelCaseToSnakeCase(currentParamName)
        const currentParamValue = params[currentParamName]
        const attachParam = value => (paramsString += `${parsedCurrentParamName}=${value}&`)

        if (Array.isArray(currentParamValue)) {
            currentParamValue.every(value => value && attachParam(value))
        } else if (isIterableObject(currentParamValue)) {
            Object.keys(currentParamValue).every(key => currentParamValue[key] && attachParam(currentParamValue[key]))
        } else {
            attachParam(currentParamValue)
        }

        return paramsString
    }, prependWithQuestionMark ? '?' : '')

    return encodeURI(computed.substring(0, computed.length - 1))
}

/**
 *
 * @param $http
 * @param {string} uri
 * @return {Promise<any[]>}
 */
export const requestData = async function ($http, ...uri) {

    return await Promise.all(
        [...uri].map(uri => $http.$get(uri))
    )
}

/**
 *
 * @param req
 * @param route
 * @return {string}
 */
export const getMetaUri = function (req, route) {
    let url = req ? req._parsedUrl.pathname : route.path

    if (!url.endsWith('/')) {
        url += '/'
    }

    // Strip /amp/ from url to ensure same metadata between regular and AMP versions
    url = url.replace('/amp/', '/')

    return `seo_meta_data/?path=${url}`
}

/**
 *
 * @param {[]} items
 * @return {[]}
 */
export const mapOptionsFromApiItems = function (items) {
    return items.map(item => ({label: item.name, value: item.id}))
}

export const postFormData = async function ($http, url, formData) {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    const headers = {
        'X-CSRFToken': csrfToken
    }

    return await $http.post(url, formData, {headers})
}
